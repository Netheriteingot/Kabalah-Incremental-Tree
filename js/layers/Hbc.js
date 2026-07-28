// Backward Clock challenge layer.
// A self-contained crafting minigame that only exists while the Hkm-bk1
// challenge is active. Recipe data + helpers live in js/data/CraftingData.js.

// Tunable constants live on the layer (tmp.Hbc.HBC_SLOT_COUNT, etc.) so they
// can be read through the temp system. See addLayer("Hbc", ...) below.

// NOTE: these two have side effects, so they must live OUTSIDE the layer.
// Anything defined as a layer property is treated as a computed value and gets
// called every tick while tmp is rebuilt, which would reset the state forever.

// (Re)initialize all minigame state. Called from the challenge's onEnter.
function hbcInit() {
    // Reset per-run state: reassign whole fresh, fully-keyed maps (Vue 2 tracks
    // reassignment of an existing property and makes the new object reactive).
    player.Hbc.resources = hbcFreshResourceMap()
    player.Hbc.gainedThisRun = hbcFreshFlagMap(HBC_ALL_RESOURCE_IDS)  // gainedEver persists
    // Guarantee the persistent maps exist and are fully populated (saves
    // predating these fields, or a challenge that started before they were
    // added, leave them undefined/partial -> both production and the Recipes
    // tab would otherwise break, and missing keys can't be made reactive).
    hbcEnsureMaps()
    if (player.Hbc.recipePage === undefined) player.Hbc.recipePage = 0
    player.Hbc.challengeTime = 0
    player.Hbc.rerollTime = 0
    let slotCount = tmp.Hbc.HBC_SLOT_COUNT
    let slots = []
    for (let i = 0; i < slotCount; i++)
        slots.push({ recipe: rollHbcRecipe(), active: false, progress: 0 })
    // Guarantee at least one affordable starter recipe among the initial slots
    // (single currency input, cost < 2 of that currency), unless one already
    // rolled naturally.
    if (slotCount > 0 && !slots.some(function (s) { return hbcIsStarterRecipe(s.recipe) })) {
        let idx = Math.floor(Math.random() * slotCount)
        slots[idx] = { recipe: rollHbcStarterRecipe(), active: false, progress: 0 }
    }
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
        // Every key is present up front. Vue 2 can only track keys that exist
        // when it converts an object to reactive, so pre-populating here (and,
        // for old saves, via fixData filling the missing keys from these
        // defaults) lets plain direct assignment stay reactive later.
        return {
            unlocked: true,
            points: new Decimal(0),
            resources: hbcFreshResourceMap(),      // crafted resource id -> plain-number amount
            gainedThisRun: hbcFreshFlagMap(HBC_ALL_RESOURCE_IDS),  // resource id -> gained this challenge
            gainedEver: hbcFreshFlagMap(HBC_ALL_RESOURCE_IDS),     // resource id -> gained in any challenge
            seenRecipes: hbcFreshFlagMap(HBC_ALL_RECIPE_IDS),      // recipe id -> completed in any challenge
            recipePage: 0,          // current page in the Recipes tab
            slots: [],              // [{ recipe, active, progress }, ...]
            challengeTime: 0,       // seconds since entering the challenge
            rerollTime: 0,          // seconds since the last slot re-roll
        }
    },
    symbol() { return "Hbc" },
    color: "grey",                       // Same color scheme as the Hkm layer.
    resource: "backward clock",
    row: 1,
    displayRow: 1,
    position: 3,
    type: "none",
    tooltip() { return "Backward Clock" },
    layerShown() { return player.Hkm.activeChallenge == 'Hkm-bk1' },

    // Base spawn weight per rarity, common -> celestial. Change this to tune
    // which recipes can roll as the game progresses. Read via
    // tmp.Hbc.HbcRarityWeights (the temp system evaluates this each tick).
    HbcRarityWeights() {
        return [4, 3, 2, 1, 0, 0, 0, 0.01]
    },

    // Tunable constants, softcoded so they are read through the temp system.
    // Reference them as tmp.Hbc.HBC_SLOT_COUNT (no trailing () needed).
    HBC_SLOT_COUNT() { return 3 },          // number of recipe slots (one per bar)
    HBC_CHALLENGE_LENGTH() { return 600 },  // seconds before the challenge auto-exits (10 min)
    HBC_REROLL_INTERVAL() { return 60 },    // seconds between slot re-rolls
    HBC_PAGES_PER_GROUP() { return 5 },     // "big page" = a group of this many small pages

    // Crafting engine: timers, re-rolls, and running the active recipes.
    update(diff) {
        if (player.Hkm.activeChallenge != 'Hkm-bk1') return
        if (!player.Hbc.slots || !player.Hbc.slots.length) return
        diff = Math.max(0, diff)

        // Challenge timer -> auto-exit at the time limit.
        player.Hbc.challengeTime += diff
        if (player.Hbc.challengeTime >= tmp.Hbc.HBC_CHALLENGE_LENGTH) {
            startChallenge('Hkm', 'Hkm-bk1')   // toggles the active challenge off
            return
        }

        // Periodic re-roll of non-active slots.
        player.Hbc.rerollTime += diff
        let rerollInterval = tmp.Hbc.HBC_REROLL_INTERVAL
        while (player.Hbc.rerollTime >= rerollInterval) {
            player.Hbc.rerollTime -= rerollInterval
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
                    let left = Math.max(0, tmp.Hbc.HBC_CHALLENGE_LENGTH - (player.Hbc.challengeTime || 0))
                    let clocks = Math.floor(player.Hbc.resources['backward_clock'] || 0)
                    return "<h3>Rebuild the Backward Clock before time runs out.</h3>"
                        + "<h3>Time left: " + formatTime(left) + " &nbsp;|&nbsp; Backward Clocks built: " + clocks + "</h3>"
                }],
                'blank',
                ['clickable', 0],
                'blank',
                ['clickable', 1],
                'blank',
                ['clickable', 2],
            ],
            unlocked() { return true },
        },
        "Resources": {
            content: [
                ['display-text', function () { return hbcResourcesDisplay() }],
            ],
            unlocked() { return true },
        },
        "Recipes": {
            content: [
                ['display-text', function () { return hbcRecipesDisplay() }],
            ],
            unlocked() { return true },
        },
        "Quit": {
            content: [
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
            style() {
                // Cycle through the rarity colors. When the challenge can be
                // completed (a Backward Clock exists) the button glows the full
                // rarity color; otherwise it's muted toward the Hokma (grey)
                // color scheme (30% rarity + 70% grey).
                let completeable = (player.Hbc.resources['backward_clock'] || 0) >= 1
                let rarityColor = hbcRarityCycleColor(8)
                let bg = completeable ? rarityColor : hbcMixColor("#808080", rarityColor, 0.3)
                return {
                    'height': '150px', 'width': '300px', 'border-radius': '5px', 'font-size': '13px',
                    'background-color': bg, 'color': 'black', 'border-color': rarityColor, 'margin-left': '5px'
                }
            },
            unlocked() { return true },
        },
    },

    bars: {},
})

// --- Recipe slot clickables (one per slot) -------------------------------
// Clicking toggles the slot's active state. Activated recipes are never
// re-rolled and run continuously in update().
// This runs at load time (tmp doesn't exist yet), so read the count straight
// off the layer function rather than through tmp.Hbc.
for (let i = 0; i < layers.Hbc.HBC_SLOT_COUNT(); i++) {
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
                let prog = slot.progress / Math.max(0.05, recipe.time)
                let progText = format(slot.progress) + ' / ' + format(Math.max(0.05, recipe.time)) + ' s'
                return "<h3 style='color:" + color + "'>" + recipe.name + "</h3>"
                    + "<span style='font-size:11px;color:" + color + "'>[" + recipe.rarity + "]</span><br>"
                    + "<span style='font-size:12px'>In: " + hbcIngredientText(recipe.inputs) + "</span><br>"
                    + "<span style='font-size:12px'>Out: " + hbcIngredientText(recipe.outputs) + "</span><br>"
                    + "<span style='font-size:12px'>Cycle: " + format(recipe.time) + "s</span><br>"
                    + state + "<br>"
                    + "<div style='margin-top:8px;height:30px;width:100%;background:linear-gradient(to right, grey 0%, grey " + (prog * 100) + "%, #333 " + (prog * 100) + "%, #333 100%);border:2px solid grey;border-radius:3px;display:flex;align-items:center;justify-content:center;color:white;font-size:13px'>"
                    + progText + "</div>"
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
            height: 30,
            progress() {
                let slot = player.Hbc.slots[idx]
                if (!slot || !slot.recipe) return 0
                let recipe = HBC_RECIPE_BY_ID[slot.recipe]
                if (!recipe) return 0
                return slot.progress / Math.max(0.05, recipe.time)
            },
            display() {
                let slot = player.Hbc.slots[idx]
                if (!slot || !slot.recipe) return ""
                let recipe = HBC_RECIPE_BY_ID[slot.recipe]
                if (!recipe) return ""
                return format(slot.progress) + ' / ' + format(Math.max(0.05, recipe.time)) + ' s'
            },
            fillStyle() { return { 'background-color': 'grey' } },
            borderStyle() { return { 'border-color': 'grey' } },
            style() { return { 'color': 'white' } },
            unlocked() { return true },
        }
    })(i)
}
