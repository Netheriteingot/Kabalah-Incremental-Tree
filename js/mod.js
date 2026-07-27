let modInfo = {
	name: "The Kabalah Incremantal Tree",
	id: "FallenCat20231218",
	author: "Fallen_Cat",
	pointsName: "essences",
	modFiles: ["data/HokmaGrid.js", "data/FlavorText.js", "data/NewsTicker.js", "data/CraftingData.js", "layers.js", "layers/Hbc.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "Hkm.Hbc.12.0",
	name: "Assembly Apocalypse",
}

let changelog =
	`
<span style='color:#f7ecfb; text-shadow: 0 0 2px #8a2be2, 0 0 5px #8a2be2, 0 0 9px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:34px;'>
vHkm.Hbc.12.0 — Assembly Apocalypse
</span><br>
<span style='font-size:18px;'>
- Added the Backward Clock challenge: a timed 10-minute crafting minigame.
</span><br>
<span style='font-size:18px;'>
- Added the "Bars" tab with 3 recipe slots that reroll every minute from a weighted rarity pool.
</span><br>
<span style='font-size:18px;'>
- Click a slot to activate its recipe; it crafts repeatedly until a resource runs out, then resumes automatically once you can afford it again. Activated recipes are never rerolled.
</span><br>
<span style='font-size:18px;'>
- Added 149 recipes across 8 rarity tiers and 34 craftable resources, all feeding toward the ultimate goal: the Backward Clock.
</span><br>
<span style='font-size:18px;'>
- Build a Backward Clock before time runs out to complete the challenge.
</span><br>
<span style='font-size:18px;'>
- Reorganized game data (flavor text, news ticker, Hokma grid, crafting data) into dedicated files.
</span><br>

<br>
<br>

<span style='color:#f7ecfb; text-shadow: 0 0 1px #8a2be2, 0 0 3px #8a2be2, 0 0 5px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:22px;'>
vHkm.Hbc.11.5
</span><br>
Even more text fixes.<br>
Fixed the problem of typo correction corrupting savefiles.<br>
Hokma story is yet to be fixed but I will fix it in the next updates.<br>

<br>
<br>

<span style='color:#f7ecfb; text-shadow: 0 0 1px #8a2be2, 0 0 3px #8a2be2, 0 0 5px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:22px;'>
vHkm.Hbc.11.4
</span><br>
More text fixes.<br>
Fixed some visual glitches.<br>

<br>
<br>

<span style='color:#f7ecfb; text-shadow: 0 0 1px #8a2be2, 0 0 3px #8a2be2, 0 0 5px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:22px;'>
vHkm.Hbc.11.3
</span><br>
More text fixes.<br>
Made the current late-game slightly faster.<br>

<br>
<br>

<span style='color:#f7ecfb; text-shadow: 0 0 1px #8a2be2, 0 0 3px #8a2be2, 0 0 5px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:22px;'>
vHkm.Hbc.11.2
</span><br>
More text fixes.<br>

<br>
<br>

<span style='color:#f7ecfb; text-shadow: 0 0 1px #8a2be2, 0 0 3px #8a2be2, 0 0 5px #8a2be2, 2px 2px 4px rgba(0, 0, 0, 0.2); font-size:22px;'>
vHkm.Hbc.11.1
</span><br>
Fixed some typos and grammar mistakes, and rephrased many descriptions.<br>
Some typos are too hard to fix, as fixing it may break your save.<br>
Added an Easter egg.<br>

`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('Ktr', 'Ktr-1')) gain = gain.add(1)
	if (hasUpgrade('Ktr', 'Ktr-2')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-2'))
	if (hasUpgrade('Ktr', 'Ktr-3')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-3'))
	if (player.Ktr.storyUnlocked >= 3) gain = gain.mul(tmp.Ktr.stellarEff)
	if (tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[0].start)) gain = gain.mul(tmp.Ktr.memoryBonus[0].effect)
	if (player.Ktr.ark.gte(1)) gain = gain.mul(tmp.Ktr.arkEff)
	if (hasMilestone('Hkm', 'Hkm-1')) gain = gain.mul(tmp.Hkm.effect)
	if (hasUpgrade('Hkm', 'Hkm-4')) gain = gain.mul(1e50)
	if (player.Hkm.storyUnlocked >= 6) gain = gain.mul(tmp.Hkm.foamEff1)
	if (hasUpgrade('Ktr', 'Ktr-18')) gain = gain.mul(tmp.Hkm.BatteryEff2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
	}
}

// Display extra things at the top of the page

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e4050"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
	console.log("Fixing save for version " + oldVersion)
	function migrateProperty(obj, oldKey, newKey) {
		if (
			obj[oldKey] !== undefined &&
			obj[newKey] !== undefined &&
			obj[newKey].eq(0)
		) {
			obj[newKey] = obj[oldKey]
			delete obj[oldKey]
			console.log(`Migrated ${oldKey} to ${newKey}: ${format(obj[newKey])}`)
		}
	}
	[
		[player.Ktr, "stallar", "stellar"],
		[player.Ktr, "stallarFreeze", "stellarFreeze"],
		[player.Hkm, "foems", "foams"],
		[player.Hkm, "timeThroem", "timeTheorem"],
		[player.Hkm, "totalTimeThroem", "totalTimeTheorem"],
		[player.Hkm, "batteryThroem", "batteryTheorem"],
	].forEach(([obj, oldKey, newKey]) => migrateProperty(obj, oldKey, newKey))
}

addNode("P", {
	row: 999,
	color: 'blue',
	onClick() {
		if (player.devSpeed != 1e-300) player.devSpeed = 1e-300
		else player.devSpeed = 1
	},
	canClick() { return true }
})