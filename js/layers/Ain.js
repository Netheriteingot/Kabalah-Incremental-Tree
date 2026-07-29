addLayer("Ain", {
    name: "Ain", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            feature: 0,
            hkm4unlocked: false,
            hkm5unlocked: false,
            hkm6unlocked: false,
            bestReset: 999999,
        }
    },
    color: "pink",
    resource: "ain points",
    symbol() { return "Ain<sup>" + player.Ain.achievements.length },
    effect() {
        return Decimal.pow(n(2), player.Ain.points)
    },
    effectDescription() {
        return "Boosts Hokma's effect by " + quickBigColor(format(tmp.Ain.effect.mul(100)) + "%", "pink")
    },
    nodeStyle() {
        return {
            "border-color": "pink",
            "border-width": "3px",
            "background": "linear-gradient(135deg,pink 6%, white 99%)",
            "height": "70px",
            "width": "70px",
            "border-radius": "5px"
        }
    },
    achievements: {
        'Hkm-1': {
            name() { return "B3611V" },
            tooltip() { return 'Get a 2nd Hokma point.(+1 AP)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Hkm.points.gte(2) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-2': {
            name() { return "bid farewell to the outgoing year" },
            tooltip() { return 'Stay in Heart gate for a whole day. (Kether Time) +1 AP, best reset time of Hokma boosts itself gain.<br>Currently: ×' + format(n(15).div(player.Ain.bestReset + 0.2).add(1).min(30)) + '.<br> Modder\'s note: This game was created on December 31th, 2023.' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ktr.realTime.gte(86400) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-3': {
            name() { return "Fleet" },
            tooltip() { return 'Have 48 arks. (+1 AP, each ark after 46 multiplies hokma points gain by 2×.)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ktr.ark.gte(48) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-4': {
            name() { return "... All that I'm left with is your reminiscences..." },
            tooltip() { return 'Do a hokma reset without reseting Kether\'s memory. (+1 AP, Bonus: Kether\'s memory no longer have negative effects.)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ain.hkm4unlocked },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-5': {
            name() { return "Fixations Towards the Stars" },
            tooltip() { return 'Do a hokma reset with at least one resource in Remote space is at lv0. (+1 AP, Bonus: Get 100% resource on hold when they’re getting >1%/s normally.)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ain.hkm5unlocked },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-6': {
            name() { return "Demiurge" },
            tooltip() { return 'Do a hokma reset without respecing distant space upgrades. (+1 AP, Bonus: All distant upgrades costs nothing.)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ain.hkm6unlocked },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-7': {
            name() { return "Dash" },
            tooltip() { return 'Do a hokma reset within 400ms. (+1 AP, Bonus: Gain 100x Hokma points on reset per second.)' },
            done() { return hasMilestone('Hkm', 'Hkm-1') && player.Ain.bestReset <= 0.4 },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-8': {
            name() { return "Is this an AD reference?" },
            tooltip() { return 'Have 5 time theorems. (+1 AP, Bonus: Ain effect also appeals to time energy gain.)' },
            done() { return player.Hkm.totalTimeTheorem.gte(5) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-9': {
            name() { return "t+puzzlelite" },
            tooltip() { return 'Have your first gridable in time-space grid. (+1 AP)' },
            done() { return hasGrid('Hkm', 101) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(1)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-10': {
            name() { return "Is this a good build?" },
            tooltip() { return 'Have the first two gridables in the first row. (+2 AP)' },
            done() { return hasGrid('Hkm', 101) && hasGrid('Hkm', 102) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-11': {
            name() { return "Is this a better build?" },
            tooltip() { return 'Have 3 gridables in time-space grid in a single row. (+2 AP)' },
            done() { return hasGrid('Hkm', 101) && hasGrid('Hkm', 102) && hasGrid('Hkm', 103) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-12': {
            name() { return "6/5 Efficiency" },
            tooltip() { return 'Get over 120% grid effect. (+2 AP)' },
            done() { return tmp.Hkm.gridStrength.gte(1.2) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-13': {
            name() { return "Clock Paradox" },
            tooltip() { return 'Unlock time foam. (+2 AP)' },
            done() { return player.Hkm.storyUnlocked >= 6 },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-14': {
            name() { return "ASTELLION" },
            tooltip() { return 'Get over 1e1,000 stellar points. (+2 AP)' },
            done() { return player.Ktr.stellar.gte('1e1000') },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-15': {
            name() { return "000 -Ain Soph Aur-" },
            tooltip() { return 'Get over 1e1,000^(99%) kether points. (+2 AP, make the formula of Hkm-t2 better.)' },
            done() { return player.Ktr.points.gte('1e990') },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-16': {
            name() { return "That's a handful" },
            tooltip() { return 'Get 5 gridables in time-space grid in a row. (+2 AP, unlock some new kether upgrades.)' },
            done() { return tmp.Hkm.totalGrid >= 5 },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(2)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-17': {
            name() { return "Colorful Days" },
            tooltip() { return 'Puchease Te4 in time-space grid. (+3 AP, Te2\'s cost is reduced to 50%.)' },
            done() { return hasGrid('Hkm', 404) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-18': {
            name() { return "Light" },
            tooltip() { return 'Have an eternal battery. (+3 AP)' },
            done() { return tmp.Hkm.BatteryEff2.gte(1e50) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-19': {
            name() { return "Rainy Heart" },
            tooltip() { return 'Have a coal battery. (+3 AP)' },
            done() { return getBuyableAmount('Hkm', 'Hkm-fb-1-4').gte(1) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-20': {
            name() { return "Khalid" },
            tooltip() { return 'Have 100 time theorems. (+3 AP, get an extra eternal battery Mk.2HD and the foam constructors will never be reseted before Binah layer.)' },
            done() { return player.Hkm.timeTheorem.gte(100) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-21': {
            name() { return "NYA!!!" },
            tooltip() { return 'Have 7 eternal batteries. (+3 AP)' },
            done() { return getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).gte(7) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-22': {
            name() { return "Aphasia" },
            tooltip() { return 'Enable the alchemy battery. (+3 AP, gain a free alchemy battery.)' },
            done() { return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(2) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(3)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-23': {
            name() { return "The hatred of the fireflies" },
            tooltip() { return 'Unlock all of Kether upgrades. (25 upgrades) (+4 AP)' },
            done() { return hasUpgrade('Ktr', 'Ktr-25') },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-24': {
            name() { return "Playground" },
            tooltip() { return 'Enable the leaf battery. (+4 AP, gain a free leaf battery and the amount of eternal batteries affects Ktr-21.)' },
            done() { return minBatteryLevel().gte(3) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-25': {
            name() { return "Broken Sky" },
            tooltip() { return 'Have 2<sup>7</sup> time theorems. (+4 AP, sutract 20 from the cost of Te5.)' },
            done() { return player.Hkm.timeTheorem.gte(128) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-26': {
            name() { return "Rubbish Sorting" },
            tooltip() { return 'Enable the aqua battery. (+4 AP, sutract 20 from the cost of Te3 again and gain a free aqua battery.)' },
            done() { return minBatteryLevel().gte(4) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-27': {
            name() { return "Dreamland" },
            tooltip() { return 'Have 15 eternal batteries. (+4 AP, the effect of Ktr-19 and Ktr-24 are also appealed to time energy gain.)' },
            done() { return getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).gte(15) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
        'Hkm-28': {
            name() { return "Electron" },
            tooltip() { return 'Have 10×2<sup>4</sup> time theorems. (+4 AP)' },
            done() { return player.Hkm.timeTheorem.gte(160) },
            onComplete() {
                return player.Ain.points = player.Ain.points.add(4)
            },
            style() { if (hasAchievement(this.layer, this.id)) return { 'background-color': 'grey', 'box-shadow': 'grey 0px 2px 2px' } },
        },
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown() { return player.Hkm.activeChallenge != 'Hkm-bk1' && hasMilestone('Hkm', 'Hkm-1') },
    tabFormat: {
        "Achievements": {
            content: [
                "main-display",
                "blank",
                ["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>[Stage 2-1] First Encounter of Star Feather Town<br>Unlock all achievement in this row to unlock Time Compressor (in Hokma layer).' }],
                ['row', [["achievement", 'Hkm-1'], ["achievement", 'Hkm-2'], ["achievement", 'Hkm-3'], ["achievement", 'Hkm-4'], ["achievement", 'Hkm-5'], ["achievement", 'Hkm-6'], ["achievement", 'Hkm-7']]],
                    "blank",
                ],
                    {
                        "color": "black",
                        "width": "700px",
                        "border-color": "#FFFFFF",
                        "border-width": "3px",
                        "background-color": "#AAAAAA",
                    }],
                ["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>[Stage 2-2] The Cruelty Behind the Gate<br>Unlock all achievement in this row to unlock foam constructor!' }],
                ['row', [["achievement", 'Hkm-8'], ["achievement", 'Hkm-9'], ["achievement", 'Hkm-10'], ["achievement", 'Hkm-11'], ["achievement", 'Hkm-12'], ["achievement", 'Hkm-13'], ["achievement", 'Hkm-14']]],
                    "blank",
                ],
                    {
                        "color": "black",
                        "width": "700px",
                        "border-color": "#FFFFFF",
                        "border-width": "3px",
                        "background-color": "#AAAAAA",
                    }],
                ["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>[Stage 2-3] Scar of the emptiness<br>Unlock all achievement in this row to unlock all sorts of fuel batteries!' }],
                ['row', [["achievement", 'Hkm-15'], ["achievement", 'Hkm-16'], ["achievement", 'Hkm-17'], ["achievement", 'Hkm-18'], ["achievement", 'Hkm-19'], ["achievement", 'Hkm-20'], ["achievement", 'Hkm-21']]],
                    "blank",
                ],
                    {
                        "color": "black",
                        "width": "700px",
                        "border-color": "#FFFFFF",
                        "border-width": "3px",
                        "background-color": "#AAAAAA",
                    }],
                ["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>[Stage 2-4] Unstable timeline<br>Unlock all achievement in this row to unlock the ultimate challenge of Hokma!' }],
                ['row', [["achievement", 'Hkm-22'], ["achievement", 'Hkm-23'], ["achievement", 'Hkm-24'], ["achievement", 'Hkm-25'], ["achievement", 'Hkm-26'], ["achievement", 'Hkm-27'], ["achievement", 'Hkm-28']]],
                    "blank",
                ],
                    {
                        'color': 'black',
                        'background-color': '#c2c2c2',
                        'opacity': '1',
                        'background': 'linear-gradient(135deg, #afafaf55 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #afafaf 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #afafaf55 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #afafaf 25%, #c2c2c2 25%) 0px 0/ 20px 20px',
                    }],
            ],
            buttonStyle() {
                return {
                    "color": "#FFFFFF",
                    "border-radius": "5px",
                    "border-color": "#FFFFFF",
                    "border-width": "2px",
                    "background": "#000000",
                    "background-image":
                        "linear-gradient(#000 15px,transparent 0),linear-gradient(90deg,white 1px,transparent 0)",
                    "background-size": "16px 16px,16px 16px",
                    "box-shadow": "2px 2px 2px white"
                }
            }
        },
    },
})