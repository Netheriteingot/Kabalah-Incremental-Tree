// Backward Clock crafting dataset + helpers (generated from crafting_system.json).
// The `var CRAFTING_DATA = {...}` line below is generated; regenerate it from the JSON.
// Everything after that line (weights, lookups, helpers) is hand-maintained.

// --- Rarity ordering & spawn weights ------------------------------------
// Order matches the eight rarity tiers, common -> celestial.
// Base weight of each rarity when rolling a recipe slot. May be tuned as the
// game progresses (e.g. unlocking higher tiers by raising the trailing zeros).
var HBC_RARITY_ORDER = ["common", "unusual", "rare", "epic", "legendary", "mythic", "transcendent", "celestial"]
// Base spawn weight per rarity. This is now defined by the Hbc layer's
// HbcRarityWeights() function; call it via tmp.Hbc.HbcRarityWeights. This
// constant is only a fallback for when tmp isn't ready yet.
var HbcRarityWeightsDefault = [4, 3, 2, 1, 0, 0, 0, 0.01]

// Current rarity spawn weights (from the layer, with a safe fallback).
function hbcRarityWeights() {
    return (typeof tmp !== "undefined" && tmp.Hbc && tmp.Hbc.HbcRarityWeights)
        ? tmp.Hbc.HbcRarityWeights
        : HbcRarityWeightsDefault
}

// --- Derived lookups (built once at load) --------------------------------
var HBC_RECIPE_BY_ID = {}
var HBC_RESOURCE_BY_ID = {}
var HBC_RARITY_BY_NAME = {}
var HBC_RECIPES_BY_RARITY = {}          // rarity name -> array of recipes
var HBC_CURRENCY_IDS = {}               // id -> true for the 3 infinite currencies

CRAFTING_DATA.recipes.forEach(function (r) { HBC_RECIPE_BY_ID[r.id] = r })
CRAFTING_DATA.resources.forEach(function (r) { HBC_RESOURCE_BY_ID[r.id] = r })
CRAFTING_DATA.rarities.forEach(function (r) { HBC_RARITY_BY_NAME[r.name] = r })
CRAFTING_DATA.currencies.forEach(function (c) { HBC_CURRENCY_IDS[c.id] = true })
HBC_RARITY_ORDER.forEach(function (name) { HBC_RECIPES_BY_RARITY[name] = [] })
CRAFTING_DATA.recipes.forEach(function (r) {
    if (!HBC_RECIPES_BY_RARITY[r.rarity]) HBC_RECIPES_BY_RARITY[r.rarity] = []
    HBC_RECIPES_BY_RARITY[r.rarity].push(r)
})

// A resource's rarity = the lowest rarity tier of any recipe that produces it
// (its "discovery" tier). Built once at load. Falls back to "common".
var HBC_RESOURCE_RARITY = {}
CRAFTING_DATA.recipes.forEach(function (r) {
    let idx = HBC_RARITY_ORDER.indexOf(r.rarity)
    if (idx < 0) return
    r.outputs.forEach(function (o) {
        let cur = HBC_RESOURCE_RARITY[o.resource]
        if (cur === undefined || idx < HBC_RARITY_ORDER.indexOf(cur))
            HBC_RESOURCE_RARITY[o.resource] = r.rarity
    })
})

// Border color per resource type (physical / arcane / other).
var HBC_TYPE_BORDER = {
    physical: "#5dade2",   // blue
    arcane: "#af7ac5",     // purple
    other: "#f5b041",      // amber
}

// Recipes sorted strictly by rarity (common -> celestial) then name. Used by
// the Recipes tab so display order is stable and grouped by tier.
var HBC_SORTED_RECIPES = CRAFTING_DATA.recipes.slice().sort(function (a, b) {
    let ra = HBC_RARITY_ORDER.indexOf(a.rarity), rb = HBC_RARITY_ORDER.indexOf(b.rarity)
    if (ra != rb) return ra - rb
    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
})

// Crafted resources (excluding the 3 currencies and the clock) sorted by
// discovery rarity then name. Used by the Resources tab.
var HBC_SORTED_RESOURCES = CRAFTING_DATA.resources.filter(function (r) {
    return !HBC_CURRENCY_IDS[r.id] && r.id != "backward_clock"
}).sort(function (a, b) {
    let ra = HBC_RARITY_ORDER.indexOf(HBC_RESOURCE_RARITY[a.id])
    let rb = HBC_RARITY_ORDER.indexOf(HBC_RESOURCE_RARITY[b.id])
    if (ra != rb) return ra - rb
    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
})

// --- Currency access -----------------------------------------------------
// The three "infinite" currencies map onto existing game resources (Decimals):
//   kether_points -> player.Ktr.points
//   time_energy   -> player.Hkm.timeEnergy
//   hokma_points  -> player.Hkm.points
// All other (crafted) resources live as plain numbers in player.Hbc.resources.
function hbcCurrencyRef(id) {
    if (id == "kether_points") return { obj: player.Ktr, key: "points" }
    if (id == "time_energy") return { obj: player.Hkm, key: "timeEnergy" }
    if (id == "hokma_points") return { obj: player.Hkm, key: "points" }
    return null
}

// --- Currency cost scaling ----------------------------------------------
// Currency inputs are hugely inflated versus the nominal recipe amount. A
// recipe that nominally costs 1 unit of a currency actually costs `base`
// below, and every extra nominal unit multiplies that cost by the per-unit
// factor (given here as exponents of 10):
//   kether_points: 1e4025 base, x1e25 per extra unit
//   hokma_points:  1e222  base, x1e3  per extra unit
//   time_energy:   1e166  base, x10   per extra unit
var HBC_CURRENCY_COST = {
    kether_points: { base: 4025, per: 25 },
    hokma_points: { base: 222, per: 3 },
    time_energy: { base: 166, per: 1 },
}

// Scaled cost (Decimal) for a currency input of the given nominal amount.
function hbcCurrencyCost(id, amount) {
    let c = HBC_CURRENCY_COST[id]
    if (!c) return new Decimal(amount)
    return Decimal.pow(10, c.base + c.per * (amount - 1))
}

// Real cost (Decimal) of a single recipe input: scaled for currencies, plain
// otherwise.
function hbcInputCost(inp) {
    if (HBC_CURRENCY_IDS[inp.resource]) return hbcCurrencyCost(inp.resource, inp.amount)
    return new Decimal(inp.amount)
}

// How much of a resource the player currently has, as a Decimal (for comparison).
function hbcAmount(id) {
    if (HBC_CURRENCY_IDS[id]) {
        let ref = hbcCurrencyRef(id)
        return ref ? ref.obj[ref.key] : new Decimal(0)
    }
    return new Decimal(player.Hbc.resources[id] || 0)
}

function hbcAddAmount(id, amount) {
    if (HBC_CURRENCY_IDS[id]) {
        let ref = hbcCurrencyRef(id)
        if (ref) ref.obj[ref.key] = ref.obj[ref.key].add(amount).max(0)
        return
    }
    let cur = player.Hbc.resources[id] || 0
    // Key is guaranteed to exist (see hbcFreshResourceMap / hbcEnsureMaps), so
    // plain assignment is reactive — no Vue.set needed.
    player.Hbc.resources[id] = Math.max(0, cur + amount)
}

// A "starter" recipe has exactly one input, that input is a currency, and its
// nominal amount is below 2 (i.e. it costs only the currency's base price).
// At least one of the initial three slots is guaranteed to be one of these.
function hbcIsStarterRecipe(recipeId) {
    let r = HBC_RECIPE_BY_ID[recipeId]
    if (!r || r.inputs.length != 1) return false
    let inp = r.inputs[0]
    return HBC_CURRENCY_IDS[inp.resource] && inp.amount < 2
}

// All recipe ids that qualify as starters (built once at load).
var HBC_STARTER_RECIPES = CRAFTING_DATA.recipes
    .filter(function (r) { return hbcIsStarterRecipe(r.id) })
    .map(function (r) { return r.id })

// Roll a starter recipe uniformly (respecting the rarity spawn weights among
// starters). Falls back to a plain roll if none exist.
function rollHbcStarterRecipe() {
    if (!HBC_STARTER_RECIPES.length) return rollHbcRecipe()
    return HBC_STARTER_RECIPES[Math.floor(Math.random() * HBC_STARTER_RECIPES.length)]
}

// --- Recipe rolling ------------------------------------------------------
// Rarity-then-uniform: pick a rarity weighted by HbcRarityWeights (skipping
// tiers with no recipes), then pick uniformly among that rarity's recipes.
function rollHbcRecipe() {
    let weights = hbcRarityWeights()
    let total = 0
    let entries = []
    for (let i = 0; i < HBC_RARITY_ORDER.length; i++) {
        let name = HBC_RARITY_ORDER[i]
        let w = weights[i] || 0
        let pool = HBC_RECIPES_BY_RARITY[name]
        if (w > 0 && pool && pool.length) {
            total += w
            entries.push({ name: name, weight: w })
        }
    }
    if (total <= 0 || !entries.length) return null
    let roll = Math.random() * total
    let chosen = entries[entries.length - 1].name
    for (let e of entries) {
        roll -= e.weight
        if (roll < 0) { chosen = e.name; break }
    }
    let pool = HBC_RECIPES_BY_RARITY[chosen]
    return pool[Math.floor(Math.random() * pool.length)].id
}

// --- Afford / consume / produce -----------------------------------------
function hbcRecipeAfford(recipe) {
    if (!recipe) return false
    for (let inp of recipe.inputs)
        if (hbcAmount(inp.resource).lt(hbcInputCost(inp))) return false
    return true
}

function hbcRecipeConsume(recipe) {
    for (let inp of recipe.inputs) {
        if (HBC_CURRENCY_IDS[inp.resource]) {
            let ref = hbcCurrencyRef(inp.resource)
            if (ref) ref.obj[ref.key] = ref.obj[ref.key].sub(hbcInputCost(inp)).max(0)
        } else {
            hbcAddAmount(inp.resource, -inp.amount)
        }
    }
}

// --- Discovery-map construction -----------------------------------------
// Every crafted (non-currency) resource id, and every recipe id. Built once.
var HBC_ALL_RESOURCE_IDS = CRAFTING_DATA.resources
    .filter(function (r) { return !HBC_CURRENCY_IDS[r.id] })
    .map(function (r) { return r.id })
var HBC_ALL_RECIPE_IDS = CRAFTING_DATA.recipes.map(function (r) { return r.id })

// Fresh maps with EVERY key present up front. This is what makes plain direct
// assignment (map[id] = value) reactive under Vue 2: Vue can only track keys
// that already exist when it converts the object, so we never add keys later.
function hbcFreshResourceMap() {
    let m = {}
    HBC_ALL_RESOURCE_IDS.forEach(function (id) { m[id] = 0 })
    return m
}
function hbcFreshFlagMap(ids) {
    let m = {}
    ids.forEach(function (id) { m[id] = false })
    return m
}
// Copy the known values of `src` onto a fully-populated fresh map.
function hbcMergeFlags(fresh, src) {
    if (src) for (let k in src) if (src[k]) fresh[k] = true
    return fresh
}

// Ensure the discovery/seen maps exist AND contain every id. Saves (or an
// in-progress challenge) that predate these fields leave them undefined or
// only partially populated; a missing key can't be made reactive by direct
// assignment, so we rebuild+reassign the whole object (which Vue converts to a
// fully reactive object) whenever it's incomplete. Guarded so a complete map
// is left untouched. Cheap to call on every access path.
function hbcEnsureMaps() {
    if (!player.Hbc.resources || !hbcMapHasAll(player.Hbc.resources, HBC_ALL_RESOURCE_IDS)) {
        let m = hbcFreshResourceMap()
        if (player.Hbc.resources) for (let k in player.Hbc.resources) m[k] = player.Hbc.resources[k]
        player.Hbc.resources = m
    }
    if (!player.Hbc.gainedThisRun || !hbcMapHasAll(player.Hbc.gainedThisRun, HBC_ALL_RESOURCE_IDS))
        player.Hbc.gainedThisRun = hbcMergeFlags(hbcFreshFlagMap(HBC_ALL_RESOURCE_IDS), player.Hbc.gainedThisRun)
    if (!player.Hbc.gainedEver || !hbcMapHasAll(player.Hbc.gainedEver, HBC_ALL_RESOURCE_IDS))
        player.Hbc.gainedEver = hbcMergeFlags(hbcFreshFlagMap(HBC_ALL_RESOURCE_IDS), player.Hbc.gainedEver)
    if (!player.Hbc.seenRecipes || !hbcMapHasAll(player.Hbc.seenRecipes, HBC_ALL_RECIPE_IDS))
        player.Hbc.seenRecipes = hbcMergeFlags(hbcFreshFlagMap(HBC_ALL_RECIPE_IDS), player.Hbc.seenRecipes)
}

// True if `map` already has a key for every id in `ids`.
function hbcMapHasAll(map, ids) {
    for (let i = 0; i < ids.length; i++) if (!(ids[i] in map)) return false
    return true
}

function hbcRecipeProduce(recipe) {
    hbcEnsureMaps()
    for (let out of recipe.outputs) {
        hbcAddAmount(out.resource, out.amount)
        hbcMarkGained(out.resource)
    }
    // A recipe becomes "seen" once it has completed at least once (any run).
    if (recipe && !player.Hbc.seenRecipes[recipe.id]) player.Hbc.seenRecipes[recipe.id] = true
}

// --- Discovery tracking --------------------------------------------------
// player.Hbc.gainedThisRun / player.Hbc.gainedEver are maps of
// resourceId -> true. "This run" is cleared each time the challenge starts.
function hbcMarkGained(id) {
    if (HBC_CURRENCY_IDS[id]) return
    hbcEnsureMaps()
    if (!player.Hbc.gainedThisRun[id]) player.Hbc.gainedThisRun[id] = true
    if (!player.Hbc.gainedEver[id]) player.Hbc.gainedEver[id] = true
}

// Discovery state of a resource: 2 = gained this run, 1 = gained a former run
// only, 0 = never gained.
function hbcDiscoveryState(id) {
    if ((player.Hbc.resources[id] || 0) > 0 || player.Hbc.gainedThisRun[id]) return 2
    if (player.Hbc.gainedEver[id]) return 1
    return 0
}

// --- Color helpers (for the animated quit button) ------------------------
function hbcHexToRGB(hex) {
    hex = String(hex).replace("#", "")
    if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c }).join("")
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}
function hbcRGBToHex(a) {
    return "#" + a.map(function (x) {
        return Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")
    }).join("")
}
// Blend two hex colors: t is the weight of color b (0 -> a, 1 -> b).
function hbcMixColor(a, b, t) {
    let ca = hbcHexToRGB(a), cb = hbcHexToRGB(b)
    return hbcRGBToHex([0, 1, 2].map(function (i) { return ca[i] * (1 - t) + cb[i] * t }))
}
// A color that cycles smoothly through all rarity colors over `period` seconds.
function hbcRarityCycleColor(period) {
    let colors = CRAFTING_DATA.rarities.map(function (r) { return r.color })
    let n = colors.length
    if (!n) return "#ffffff"
    let f = (((Date.now() / 1000) / period) % 1 + 1) % 1 * n
    let i = Math.floor(f)
    return hbcMixColor(colors[i % n], colors[(i + 1) % n], f - i)
}

// Rarity color for a recipe id (falls back to white).
function hbcRecipeColor(recipeId) {
    let r = HBC_RECIPE_BY_ID[recipeId]
    if (!r) return "#ffffff"
    let rar = HBC_RARITY_BY_NAME[r.rarity]
    return rar ? rar.color : "#ffffff"
}

// Human-readable "a Foo + b Bar" for an input/output list.
function hbcIngredientText(list) {
    return list.map(function (x) {
        let res = HBC_RESOURCE_BY_ID[x.resource]
        let name = res ? res.name : x.resource
        let cur = CRAFTING_DATA.currencies.find(function (c) { return c.id == x.resource })
        if (cur) {
            name = cur.name
            // Currencies are shown at their real (scaled) cost.
            return format(hbcCurrencyCost(x.resource, x.amount)) + "× " + name
        }
        return x.amount + "× " + name
    }).join(", ")
}

// --- Resource display boxes ----------------------------------------------
// Rarity color for a resource id (via its discovery tier).
function hbcResourceRarityColor(id) {
    let rar = HBC_RARITY_BY_NAME[HBC_RESOURCE_RARITY[id]]
    return rar ? rar.color : "#cccccc"
}

// HTML for one currency box (kether points / time energy / hokma points).
// These use their own layer color schemes and are always shown.
function hbcCurrencyBox(id, mainColor) {
    let cur = CRAFTING_DATA.currencies.find(function (c) { return c.id == id })
    let name = cur ? cur.name : id
    let amt = hbcAmount(id)
    let bg = hbcMixColor("#000000", mainColor, 0.5)
    return "<div style='display:inline-flex;flex-direction:column;align-items:center;justify-content:center;"
        + "vertical-align:top;line-height:1.2;box-sizing:border-box;"
        + "width:120px;height:64px;margin:4px;border-radius:5px;color:white;font-size:12px;"
        + "border:3px solid " + mainColor + ";background-color:" + bg + "'>"
        + "<b>" + name + "</b><span>" + format(amt) + "</span></div>"
}

// HTML for one crafted-resource box (the 33). Applies the discovery-based
// main color (10% / 30% / 50% rarity into black) and type-based border.
function hbcResourceBox(id) {
    let res = HBC_RESOURCE_BY_ID[id]
    let name = res ? res.name : id
    let state = hbcDiscoveryState(id)
    let rarityColor = hbcResourceRarityColor(id)
    let border = HBC_TYPE_BORDER[res ? res.type : "other"] || "#888888"
    // Main color: 10% / 30% / 50% rarity mixed into black by discovery state.
    let mix = state == 2 ? 0.5 : (state == 1 ? 0.3 : 0.1)
    let bg = hbcMixColor("#000000", rarityColor, mix)
    let amt = player.Hbc.resources[id] || 0
    let inner = (state == 0)
        ? "???"
        : "<b>" + name + "</b><span>" + format(amt) + "</span>"
    return "<div style='display:inline-flex;flex-direction:column;align-items:center;justify-content:center;"
        + "vertical-align:top;line-height:1.2;box-sizing:border-box;"
        + "width:120px;height:64px;margin:4px;border-radius:5px;color:white;font-size:12px;"
        + "border:3px solid " + border + ";background-color:" + bg + "'>" + inner + "</div>"
}

// The Backward Clock box, which is always shown (never "???").
function hbcClockBox() {
    let res = HBC_RESOURCE_BY_ID["backward_clock"]
    let name = res ? res.name : "Backward Clock"
    let rarityColor = hbcResourceRarityColor("backward_clock")
    let bg = hbcMixColor("#000000", rarityColor, 0.5)
    let amt = player.Hbc.resources["backward_clock"] || 0
    return "<div style='display:inline-flex;flex-direction:column;align-items:center;justify-content:center;"
        + "vertical-align:top;line-height:1.2;box-sizing:border-box;"
        + "width:120px;height:64px;margin:4px;border-radius:5px;color:white;font-size:12px;"
        + "border:3px solid " + rarityColor + ";background-color:" + bg + "'>"
        + "<b>" + name + "</b><span>" + format(amt) + "</span></div>"
}

// Full HTML for the Resources tab.
function hbcResourcesDisplay() {
    hbcEnsureMaps()
    let out = ""
    // Row 1: the three currencies with their own color schemes.
    // kether -> white/gold-ish Ktr, time energy + hokma -> grey Hkm.
    out += "<div style='text-align:center'>"
    out += hbcCurrencyBox("kether_points", "#ffd700")
    out += hbcCurrencyBox("time_energy", "#aaaaaa")
    out += hbcCurrencyBox("hokma_points", "#888888")
    out += "</div>"

    // Spacing, then the 33 crafted resources (all except backward_clock),
    // sorted by rarity then name, in rows of 3 -> 11 rows.
    out += "<div style='height:24px'></div>"
    let crafted = HBC_SORTED_RESOURCES
    out += "<div style='text-align:center'>"
    for (let i = 0; i < crafted.length; i++) {
        out += hbcResourceBox(crafted[i].id)
        if ((i + 1) % 3 == 0) out += "<br>"
    }
    out += "</div>"

    // Spacing, then the backward clock alone (always shown).
    out += "<div style='height:24px'></div>"
    out += "<div style='text-align:center'>" + hbcClockBox() + "</div>"
    return out
}

// --- Recipe display boxes ------------------------------------------------
// Absolute layout: every box reserves room for the largest recipe in the game
// (4 inputs, 2 outputs), so the separator line sits at the same spot in every
// box regardless of the actual input/output counts.
var HBC_MAX_INPUTS = 4
var HBC_MAX_OUTPUTS = 2
var HBC_LINE_H = 18          // px per ingredient line

// Text for one ingredient line ("N× Name"), currencies at their scaled cost.
function hbcIngredientLine(x) {
    let res = HBC_RESOURCE_BY_ID[x.resource]
    let name = res ? res.name : x.resource
    let cur = CRAFTING_DATA.currencies.find(function (c) { return c.id == x.resource })
    if (cur) return format(hbcCurrencyCost(x.resource, x.amount)) + "× " + cur.name
    return x.amount + "× " + name
}

// A recipe is "seen" if it has ever been completed.
function hbcRecipeSeen(recipeId) {
    return !!player.Hbc.seenRecipes[recipeId]
}

// HTML for one recipe box.
function hbcRecipeBox(recipeId) {
    let recipe = HBC_RECIPE_BY_ID[recipeId]
    if (!recipe) return ""
    let seen = hbcRecipeSeen(recipeId)
    let rarityColor = hbcRecipeColor(recipeId)

    // Section background colors by seen state.
    let inMix = seen ? 0.5 : 0.25
    let outMix = seen ? 1.0 : 0.5
    let inBg = hbcMixColor("#000000", rarityColor, inMix)
    let outBg = hbcMixColor("#000000", rarityColor, outMix)

    // Input lines: one per input. If unseen, each input is a separate "???".
    let inLines = recipe.inputs.map(function (inp) {
        return "<div style='height:" + HBC_LINE_H + "px'>" + (seen ? hbcIngredientLine(inp) : "???") + "</div>"
    }).join("")

    // Output lines: each output shown faithfully only if that resource has ever
    // been gained; otherwise "???".
    let outLines = recipe.outputs.map(function (out) {
        let known = player.Hbc.gainedEver[out.resource] || HBC_CURRENCY_IDS[out.resource]
        return "<div style='height:" + HBC_LINE_H + "px'>" + (known ? hbcIngredientLine(out) : "???") + "</div>"
    }).join("")

    // Fixed section heights (absolute layout for the largest recipe). Inputs
    // and outputs are vertically centered within their sections.
    let inSectionH = HBC_MAX_INPUTS * HBC_LINE_H
    let outSectionH = HBC_MAX_OUTPUTS * HBC_LINE_H

    return "<div style='display:inline-block;vertical-align:top;box-sizing:border-box;width:190px;margin:5px;"
        + "border:2px solid " + rarityColor + ";border-radius:5px;overflow:hidden;color:white;font-size:12px'>"
        // Input section (vertically centered), colored at inMix.
        + "<div style='background-color:" + inBg + ";height:" + inSectionH + "px;padding:2px 4px;box-sizing:border-box;"
        + "display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center'>"
        + inLines
        + "</div>"
        // Separator line.
        + "<div style='height:2px;background-color:white'></div>"
        // Output section (vertically centered), colored at outMix.
        + "<div style='background-color:" + outBg + ";height:" + outSectionH + "px;padding:2px 4px;box-sizing:border-box;"
        + "display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center'>"
        + outLines
        + "</div>"
        + "</div>"
}

// Number of recipe pages (6 recipes per page).
var HBC_RECIPES_PER_PAGE = 6
// HBC_PAGES_PER_GROUP ("big page" = a group of this many small pages) is
// softcoded on the Hbc layer; read it via tmp.Hbc.HBC_PAGES_PER_GROUP.
function hbcRecipePageCount() {
    return Math.ceil(CRAFTING_DATA.recipes.length / HBC_RECIPES_PER_PAGE)
}
// The big page (0-indexed group) that the current page falls in.
function hbcRecipeBigPage() {
    return Math.floor((player.Hbc.recipePage || 0) / tmp.Hbc.HBC_PAGES_PER_GROUP)
}
function hbcRecipeBigPageCount() {
    return Math.ceil(hbcRecipePageCount() / tmp.Hbc.HBC_PAGES_PER_GROUP)
}

// Click handlers for the recipe pager (called from inline onclick).
function hbcGotoRecipePage(p) {
    player.Hbc.recipePage = Math.max(0, Math.min(hbcRecipePageCount() - 1, p))
}
function hbcRecipeShiftGroup(dir) {
    let g = Math.max(0, Math.min(hbcRecipeBigPageCount() - 1, hbcRecipeBigPage() + dir))
    hbcGotoRecipePage(g * tmp.Hbc.HBC_PAGES_PER_GROUP)
}

// The pager row, built from the same .tabButton class, size and color scheme
// as the Hokma story modal buttons (layers.js hokmaStory). Layer color is grey
// (the Hkm scheme); the active page button is filled with that scheme.
function hbcRecipePagerHTML() {
    let scheme = layers.Hbc.color   // "grey" — same as the Hkm modal color
    let cur = Math.max(0, Math.min(hbcRecipePageCount() - 1, player.Hbc.recipePage || 0))
    let big = hbcRecipeBigPage()
    // All buttons share a fixed width so page-number buttons don't grow with
    // the digit count. `hidden` keeps the group-nav buttons occupying space
    // (visibility:hidden) when they don't apply, instead of collapsing.
    let btn = function (label, onclick, active, hidden) {
        // Match the modal buttons: .tabButton + margin:0 5px; border-color set
        // to the layer color scheme. Active page uses the Hkm scheme as a fill.
        let extra = active ? "background-color:" + scheme + ";color:black;" : ""
        if (hidden) extra += "visibility:hidden;"
        return "<button class='tabButton' style='width:60px;box-sizing:border-box;padding:5px 0;margin:0 5px;"
            + "border-color:" + scheme + ";" + extra + "'"
            + " onclick='" + onclick + "'>" + label + "</button>"
    }
    let out = "<div style='text-align:center;margin-bottom:6px'>"
    // Prev-group: hidden (but space-occupying) on the first group.
    out += btn("&lt;", "hbcRecipeShiftGroup(-1)", false, big <= 0)
    // Page-number buttons for this group.
    let pagesPerGroup = tmp.Hbc.HBC_PAGES_PER_GROUP
    for (let s = 0; s < pagesPerGroup; s++) {
        let p = big * pagesPerGroup + s
        if (p >= hbcRecipePageCount()) break
        out += btn(String(p + 1), "hbcGotoRecipePage(" + p + ")", p == cur, false)
    }
    // Next-group: hidden (but space-occupying) on the last group.
    out += btn("&gt;", "hbcRecipeShiftGroup(1)", false, big >= hbcRecipeBigPageCount() - 1)
    out += "</div>"
    return out
}

// Full HTML for the current page of the Recipes tab.
function hbcRecipesDisplay() {
    hbcEnsureMaps()
    let pages = hbcRecipePageCount()
    let page = Math.max(0, Math.min(pages - 1, player.Hbc.recipePage || 0))
    let start = page * HBC_RECIPES_PER_PAGE
    let slice = HBC_SORTED_RECIPES.slice(start, start + HBC_RECIPES_PER_PAGE)

    let out = hbcRecipePagerHTML()
    out += "<div style='text-align:center'>"
    for (let i = 0; i < slice.length; i++) {
        out += hbcRecipeBox(slice[i].id)
        if ((i + 1) % 3 == 0) out += "<br>"   // 3 per row -> 2 rows per page
    }
    out += "</div>"
    return out
}
// Backward Clock challenge layer.
// A self-contained crafting minigame that only exists while the Hkm-bk1
// challenge is active. Recipe data is loaded from CraftingDataGenerated.js.

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
            posk1: 0,
            posk2: 0,
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
        if (document.getElementById('Hbc') != null) player.Hbc.posk1 = document.getElementById('Hbc').getBoundingClientRect().left - 225
        if (document.getElementById('Hbc') != null) player.Hbc.posk2 = document.getElementById('Hbc').getBoundingClientRect().top - 150
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
