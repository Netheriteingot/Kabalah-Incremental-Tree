// Backward Clock challenge layer.
// A self-contained crafting minigame that only exists while the Hkm-bk1
// challenge is active. Recipe data + helpers live in js/data/CraftingData.js.

var HBC_SLOT_COUNT = 3           // number of recipe slots (one per bar)
var HBC_CHALLENGE_LENGTH = 600   // seconds before the challenge auto-exits (10 min)
var HBC_REROLL_INTERVAL = 60     // seconds between slot re-rolls

// NOTE: these two have side effects, so they must live OUTSIDE the layer.
// Anything defined as a layer property is treated as a computed value and gets
// called every tick while tmp is rebuilt, which would reset the state forever.

// (Re)initialize all minigame state. Called from the challenge's onEnter.
function hbcInit() {
    player.Hbc.resources = {}
    player.Hbc.challengeTime = 0
    player.Hbc.rerollTime = 0
    let slots = []
    for (let i = 0; i < HBC_SLOT_COUNT; i++)
        slots.push({ recipe: rollHbcRecipe(), active: false, progress: 0 })
    player.Hbc.slots = slots
}

// Re-roll every slot that is NOT currently active (activated recipes are kept).
function hbcRerollSlots() {
    for (let slot of player.Hbc.slots) {
        if (slot.active) continue
        slot.recipe = rollHbcRecipe()
        slot.progress = 0
    }
}

addLayer("Hbc", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            resources: {},          // crafted resource id -> plain-number amount
            slots: [],              // [{ recipe, active, progress }, ...]
            challengeTime: 0,       // seconds since entering the challenge
            rerollTime: 0,          // seconds since the last slot re-roll
        }
    },
    symbol() { return "♀" },
    color: "grey",                       // Same color scheme as the Hkm layer.
    resource: "backward clock",
    row: 1,
    displayRow: 1,
    position: 3,
    type: "none",
    tooltip() { return "Backward Clock" },
    layerShown() { return player.Hkm.activeChallenge == 'Hkm-bk1' },

    // Crafting engine: timers, re-rolls, and running the active recipes.
    update(diff) {
        if (player.Hkm.activeChallenge != 'Hkm-bk1') return
        if (!player.Hbc.slots || !player.Hbc.slots.length) return
        diff = Math.max(0, diff)

        // Challenge timer -> auto-exit at the time limit.
        player.Hbc.challengeTime += diff
        if (player.Hbc.challengeTime >= HBC_CHALLENGE_LENGTH) {
            startChallenge('Hkm', 'Hkm-bk1')   // toggles the active challenge off
            return
        }

        // Periodic re-roll of non-active slots.
        player.Hbc.rerollTime += diff
        while (player.Hbc.rerollTime >= HBC_REROLL_INTERVAL) {
            player.Hbc.rerollTime -= HBC_REROLL_INTERVAL
            hbcRerollSlots()
        }

        // Run each active recipe. Recipes run repeatedly; a recipe stalls (but
        // stays active) whenever its inputs cannot be paid, and resumes the
        // instant they can. A per-slot iteration cap keeps very fast recipes
        // under a large diff from locking the loop.
        for (let slot of player.Hbc.slots) {
            if (!slot.active) continue
            let recipe = HBC_RECIPE_BY_ID[slot.recipe]
            if (!recipe) continue
            let cycle = Math.max(0.05, recipe.time)
            let remaining = diff
            let guard = 0
            while (remaining > 0 && guard++ < 100000) {
                // Not mid-cycle: try to start one by paying inputs.
                if (slot.progress <= 0) {
                    if (!hbcRecipeAfford(recipe)) break   // stalled; stay active
                    hbcRecipeConsume(recipe)
                }
                let need = cycle - slot.progress
                if (remaining >= need) {
                    remaining -= need
                    hbcRecipeProduce(recipe)
                    slot.progress = 0                     // ready for the next cycle
                } else {
                    slot.progress += remaining
                    remaining = 0
                }
            }
        }
    },

    tabFormat: {
        "Bars": {
            content: [
                ['display-text', function () {
                    let left = Math.max(0, HBC_CHALLENGE_LENGTH - (player.Hbc.challengeTime || 0))
                    let clocks = Math.floor(player.Hbc.resources['backward_clock'] || 0)
                    return "<h3>Rebuild the Backward Clock before time runs out.</h3>"
                        + "<h3>Time left: " + formatTime(left) + " &nbsp;|&nbsp; Backward Clocks built: " + clocks + "</h3>"
                }],
                'blank',
                ['row', [['clickable', 0], ['clickable', 1], ['clickable', 2]]],
                'blank',
                ['row', [['bar', 0], ['bar', 1], ['bar', 2]]],
                'blank',
                ['clickable', 'quit'],
            ],
            unlocked() { return true },
        },
    },

    clickables: {
        rows: 1,
        cols: 3,
        // --- Quit button ---
        'quit': {
            title() { return "Quit" },
            display() { return "Exit the Backward Clock challenge." },
            canClick() { return true },
            onClick() { startChallenge('Hkm', 'Hkm-bk1') },
            style() { return { 'width': '200px', 'min-height': '40px', 'background-color': '#888888', 'color': 'black' } },
            unlocked() { return true },
        },
    },

    bars: {},
})

// --- Recipe slot clickables (one per slot) -------------------------------
// Clicking toggles the slot's active state. Activated recipes are never
// re-rolled and run continuously in update().
for (let i = 0; i < HBC_SLOT_COUNT; i++) {
    (function (idx) {
        layers.Hbc.clickables[idx] = {
            display() {
                let slot = player.Hbc.slots[idx]
                if (!slot || !slot.recipe) return "<h3>Empty slot</h3>"
                let recipe = HBC_RECIPE_BY_ID[slot.recipe]
                if (!recipe) return "<h3>Empty slot</h3>"
                let color = hbcRecipeColor(slot.recipe)
                let state = slot.active
                    ? (hbcRecipeAfford(recipe) ? "<span style='color:#7CFC00'>ACTIVE</span>"
                        : "<span style='color:salmon'>STALLED</span>")
                    : "<span style='color:#dddddd'>Inactive</span>"
                return "<h3 style='color:" + color + "'>" + recipe.name + "</h3>"
                    + "<span style='font-size:11px;color:" + color + "'>[" + recipe.rarity + "]</span><br>"
                    + "<span style='font-size:12px'>In: " + hbcIngredientText(recipe.inputs) + "</span><br>"
                    + "<span style='font-size:12px'>Out: " + hbcIngredientText(recipe.outputs) + "</span><br>"
                    + "<span style='font-size:12px'>Cycle: " + format(recipe.time) + "s</span><br>"
                    + state
            },
            canClick() {
                let slot = player.Hbc.slots[idx]
                return slot && !!slot.recipe
            },
            onClick() {
                let slot = player.Hbc.slots[idx]
                if (!slot || !slot.recipe) return
                slot.active = !slot.active
                if (!slot.active) slot.progress = 0   // reset a cancelled cycle
            },
            style() {
                let slot = player.Hbc.slots[idx]
                let color = slot && slot.recipe ? hbcRecipeColor(slot.recipe) : "#b1b1b1"
                return {
                    'width': '300px',
                    'min-height': '160px',
                    'border-radius': '5px',
                    'border-width': '4px',
                    'border-color': color,
                    'background-color': '#222222',
                    'color': 'white',
                    'font-size': '13px',
                }
            },
            unlocked() { return true },
        }

        layers.Hbc.bars[idx] = {
            direction: RIGHT,
            width: 300,
            height: 16,
            progress() {
                let slot = player.Hbc.slots[idx]
                if (!slot || !slot.recipe) return 0
                let recipe = HBC_RECIPE_BY_ID[slot.recipe]
                if (!recipe) return 0
                return slot.progress / Math.max(0.05, recipe.time)
            },
            display() { return "" },
            fillStyle() {
                let slot = player.Hbc.slots[idx]
                let color = slot && slot.recipe ? hbcRecipeColor(slot.recipe) : "#999999"
                return { 'background-color': color }
            },
            borderStyle() { return { 'border-color': '#ffffff' } },
            style() { return { 'color': 'white' } },
            unlocked() { return true },
        }
    })(i)
}
