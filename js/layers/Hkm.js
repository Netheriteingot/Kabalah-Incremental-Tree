const TOTAL_HOKMA_STORIES = 14;
const STORIES_PER_PAGE = 10;

addLayer("Hkm", {
    startData() {
        return {                  // startData is a function that returns default data for a layer.
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),
            storyUnlocked: 0,
            storyShowing: 1,
            newStory: false,
            resetTimes: 0,
            timeEnergy: new Decimal(0),
            timeThroem: new Decimal(0), //compatibility
            totalTimeThroem: new Decimal(0), //compatibility
            batteryThroem: new Decimal(0), //compatibility
            timeTheorem: new Decimal(0),
            totalTimeTheorem: new Decimal(0),
            batteryTheorem: new Decimal(0),
            gridTime: new Decimal(0),
            foams: new Decimal(0),
            foems: new Decimal(0), //compatibility
            PeBox: new Decimal(0),
            NeBox: new Decimal(0),
            maxBet: new Decimal(0),
            posk1: 0,
            posk2: 0,
            // "points" is the internal name for the main resource of the layer.
        }
    },
    symbol() { return "Hkm<sup>" + player.Hkm.storyUnlocked },
    color: "grey",                       // The color for this layer, which affects many elements.
    resource: "hokma points",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    passiveGeneration() { return hasAchievement('Ain', 'Hkm-7') ? 100 : 0 },
    baseResource: "kether points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.Ktr.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e200),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 1e-300,
    branches: ['Ktr'],
    resetsNothing() { return false },                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if (hasAchievement('Ain', 'Hkm-3')) {
            bonus = Decimal.pow(2, player.Ktr.ark.sub(46)).max(1)
            if (bonus.gte(10)) bonus = softcap(bonus, 'root', n(10), 5)
            mult = mult.mul(bonus)
        }
        if (hasAchievement('Ain', 'Hkm-2')) mult = mult.mul(n(15).div(player.Ain.bestReset + 0.2).add(1).min(30))
        if (hasUpgrade('Hkm', 'Hkm-1')) mult = mult.mul(upgradeEffect('Hkm', 'Hkm-1'))
        if (hasUpgrade('Hkm', 'Hkm-2')) mult = mult.mul(upgradeEffect('Hkm', 'Hkm-2'))
        if (hasGrid('Hkm', 101)) mult = mult.mul(getEffect('', 101))
        if (hasGrid('Hkm', 201)) mult = mult.mul(getEffect('', 201))
        if (hasGrid('Hkm', 301)) mult = mult.mul(getEffect('', 301))
        if (hasGrid('Hkm', 401)) mult = mult.mul(getEffect('', 401))
        if (hasGrid('Hkm', 501)) mult = mult.mul(getEffect('', 501))
        if (player.Hkm.storyUnlocked >= 6) mult = mult.mul(tmp.Hkm.PeBoxEff)
        if (mult.gte(1e150)) mult = softcap(mult, 'root', n(1e150), 2.2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    effectDescription() {
        return "boosting your essence gain, kether points gain, kether time gain and stellar gain by " + quickBigColor(' ×' + format(tmp.Hkm.effect), 'grey')
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    canReset() {
        return player.Ktr.memoryCrystal.gte(1e20) && player.Ktr.stellar.gte('1e330')
    },
    storyPending() {
        let story = 0;
        if (player.Hkm.points.gte(1)) story = 1;
        if (player.Ain.achievements.length >= 7 && player.Hkm.storyUnlocked == 1) story = 2;
        if (hasMilestone('Hkm', 'Hkm-13') && player.Hkm.storyUnlocked == 2) story = 3;
        if (hasMilestone('Hkm', 'Hkm-14') && player.Hkm.storyUnlocked == 3) story = 4;
        if (hasMilestone('Hkm', 'Hkm-15') && player.Hkm.storyUnlocked == 4) story = 5;
        if (hasMilestone('Hkm', 'Hkm-16') && player.Hkm.storyUnlocked == 5) story = 6;
        if (hasAchievement('Ain', 'Hkm-14') && player.Hkm.storyUnlocked == 6) story = 7;
        if (hasAchievement('Ain', 'Hkm-16') && player.Hkm.storyUnlocked == 7) story = 8;
        if (hasMilestone('Hkm', 'Hkm-17') && player.Hkm.storyUnlocked == 8) story = 9;
        if (hasUpgrade('Ktr', 'Ktr-18') && player.Hkm.storyUnlocked == 9) story = 10;
        if (hasMilestone('Hkm', 'Hkm-18') && player.Hkm.storyUnlocked == 10) story = 11;
        if (hasMilestone('Hkm', 'Hkm-19') && player.Hkm.storyUnlocked == 11) story = 12;
        if (hasAchievement('Ain', 'Hkm-21') && player.Hkm.storyUnlocked == 12) story = 13;
        if (hasAchievement('Ain', 'Hkm-24') && player.Hkm.storyUnlocked == 13) story = 14;
        if (hasAchievement('Ain', 'Hkm-28') && player.Hkm.storyUnlocked == 14) story = 15;
        return story
    },
    totalCompressor() {
        return getBuyableAmount('Hkm', 'Hkm-t1').add(getBuyableAmount('Hkm', 'Hkm-t2')).add(getBuyableAmount('Hkm', 'Hkm-t3'))
    },
    nextTimeTheorem() {
        let lim = new Decimal(1).mul(new Decimal(10).pow(player.Hkm.totalTimeTheorem.add(1)))
        if (player.Hkm.totalTimeTheorem.gte(29)) lim = lim.mul(new Decimal(2).pow(player.Hkm.totalTimeTheorem.sub(29)))
        if (hasGrid('Hkm', 104)) lim = lim.div(getEffect('', 104))
        return lim
    },
    timeTheoremEff() {
        let eff = Decimal.pow(n(25), player.Hkm.totalTimeTheorem)
        return eff
    },
    gridStrength() {
        let strength = n(1)
        if (player.Hkm.gridTime.lt(100)) strength = strength.sub(n(100).sub(player.Hkm.gridTime).div(100).mul(0.1))
        if (hasUpgrade('Hkm', 'Hkm-9')) strength = strength.add(0.05)
        if (hasUpgrade('Hkm', 'Hkm-9') && player.Hkm.gridTime.gte(100)) strength = strength.add(player.Hkm.gridTime.mul(2).add(1).log(10).sub(2).div(100))
        for (var i = 103; i <= 1300; i += 100) {
            if (hasGrid('Hkm', i)) strength = strength.add(getEffect('', i))
        }
        if (hasAchievement('Ain', 'Hkm-14')) strength = strength.add(buyableEffect('Hkm', 'Hkm-f2'))
        // Backward Clock resource discovery bonus: +1% per resource discovered (via tmp.Hbc.resourceDiscoveryBoost)
        if (tmp.Hbc && tmp.Hbc.resourceDiscoveryBoost !== undefined) {
            strength = strength.add(tmp.Hbc.resourceDiscoveryBoost)
        }
        return strength
    },
    compressorEff() {
        let eff = Decimal.pow(n(3).add(hasUpgrade('Hkm', 'Hkm-6') ? 2 : 0), tmp.Hkm.totalCompressor).sub(1)
        if (hasAchievement('Ain', 'Hkm-8')) eff = eff.mul(tmp.Ain.effect)
        if (hasUpgrade('Hkm', 'Hkm-7')) eff = eff.mul(tmp.Hkm.gridStrength.mul(1000))
        if (hasGrid('Hkm', 204)) eff = eff.mul(getEffect('', 204))
        if (hasGrid('Hkm', 304)) eff = eff.mul(getEffect('', 304))
        if (hasGrid('Hkm', 504)) eff = eff.mul(getEffect('', 504))
        if (hasAchievement('Ain', 'Hkm-27')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-19')).mul(upgradeEffect('Ktr', 'Ktr-24'))
        return eff
    },
    gridSize() {
        if (!hasMilestone('Hkm', 'Hkm-13')) return 0
        else if (!hasMilestone('Hkm', 'Hkm-14')) return 1
        else if (!hasMilestone('Hkm', 'Hkm-15')) return 2
        else if (!hasMilestone('Hkm', 'Hkm-17')) return 3
        else if (!hasMilestone('Hkm', 'Hkm-19')) return 4
        else return 5
    },
    foamReq() {
        let req = n(0)
        if (player.Hkm.foams.lt(20)) req = new Decimal(2.5e4).pow(player.Hkm.foams).mul(1e24)
        if (player.Hkm.foams.gte(20)) req = new Decimal(2.5e4).pow(player.Hkm.foams).mul(1e24).mul(new Decimal(5e4).pow(player.Hkm.foams.sub(19)))
        if (hasMilestone('Hkm', 'Hkm-20')) req = req.div(1e20)
        return req
    },
    foamEff1() {
        let eff = Decimal.pow(1e40, player.Hkm.foams).mul(player.Hkm.foams.pow(7)).add(1)
        if (hasUpgrade('Ktr', 'Ktr-21')) eff = eff.mul(tmp.Hkm.Sebox)
        return eff
    },
    foamEff2() {
        let eff = Decimal.pow(3, player.Hkm.foams).sub(1).pow(hasUpgrade('Ktr', 'Ktr-18') ? buyableEffect('Hkm', 'Hkm-b1').add(1) : 1)
        if (hasUpgrade('Ktr', 'Ktr-16')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-16'))
        if (hasUpgrade('Ktr', 'Ktr-19')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-19'))
        if (hasUpgrade('Ktr', 'Ktr-21')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-21'))
        return eff
    },
    boxGain() {
        let gain = getBuyableAmount('Hkm', 'Hkm-t1').add(getBuyableAmount('Hkm', 'Hkm-t2')).add(getBuyableAmount('Hkm', 'Hkm-t3'))
        if (hasAchievement('Ain', 'Hkm-14')) gain = gain.mul(buyableEffect('Hkm', 'Hkm-f4'))
        if (hasUpgrade('Ktr', 'Ktr-16')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-16'))
        if (hasUpgrade('Ktr', 'Ktr-17')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-17'))
        if (hasUpgrade('Ktr', 'Ktr-18')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-18'))
        if (hasUpgrade('Ktr', 'Ktr-19')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-19'))
        if (hasUpgrade('Ktr', 'Ktr-21')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-21'))
        if (hasUpgrade('Ktr', 'Ktr-24')) gain = gain.mul(upgradeEffect('Ktr', 'Ktr-24'))
        return gain
    },
    NeBoxStroage() {
        let str = n(1000)
        if (hasUpgrade('Ktr', 'Ktr-18')) str = str.pow(buyableEffect('Hkm', 'Hkm-b2'))
        return str
    },
    NeBoxEff() {
        let eff = player.Hkm.NeBox.div(buyableEffect('Hkm', 'Hkm-b3')).add(1).log(1e10).add(1).cbrt().recip()
        eff = eff.pow(buyableEffect('Hkm', 'Hkm-f6'))
        if (hasUpgrade('Ktr', 'Ktr-21')) eff = eff.root(20)
        return eff
    },
    NeBoxGain() {
        return tmp.Hkm.foamEff2.sub(tmp.Hkm.boxGain)
    },
    PeBoxExp() {
        let exp = n(1.4).add(hasUpgrade('Ktr', 'Ktr-18') ? buyableEffect('Hkm', 'Hkm-b1') : 0)
        return exp
    },
    PeBoxEff() {
        let eff = player.Hkm.PeBox.add(1).pow(tmp.Hkm.PeBoxExp).pow(tmp.Hkm.NeBoxEff)
        if (hasAchievement('Ain', 'Hkm-14')) eff = eff.pow(buyableEffect('Hkm', 'Hkm-f5'))
        if (tmp.Hbc && tmp.Hbc.recipeDiscoveryBoost !== undefined) {
            eff = eff.mul(tmp.Hbc.recipeDiscoveryBoost)
        }
        return eff
    },
    PeBoxGain() {
        if (tmp.Hkm.NeBoxGain.lte(0)) return tmp.Hkm.foamEff2
        else return tmp.Hkm.boxGain
    },
    Sebox() {
        let box = player.Hkm.PeBox.add(1).mul(player.Hkm.NeBox.add(1))
        if (hasMilestone('Hkm', 'Hkm-19')) box = box.pow(1.5 + (hasMilestone('Hkm', 'Hkm-20') ? 0.5 : 0))
        return box
    },
    BatteryEff1() {
        let eff = Decimal.pow(413, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).max(2).sub(2))
        let exp = n(1)
        for (var i = 105; i <= 1300; i += 100) {
            if (hasGrid('Hkm', i)) exp = exp.add(0.05)
        }
        return eff.pow(exp)
    },
    BatteryEff2() {
        let eff = Decimal.pow(1e100, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).pow(0.85)).mul(getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).pow(4)).add(1)
        let exp = n(1)
        for (var i = 105; i <= 1300; i += 100) {
            if (hasGrid('Hkm', i)) exp = exp.add(0.05)
        }
        return eff.pow(exp)
    },
    totalGrid() {
        let total = 0
        for (var i = 101; i <= 1299; i++) {
            if (hasGrid('Hkm', i)) total++
        }
        return total
    },
    update(diff) {
        if (document.getElementById('Hkm') != null) player.Hkm.posk1 = document.getElementById('Hkm').getBoundingClientRect().left - 225
        if (document.getElementById('Hkm') != null) player.Hkm.posk2 = document.getElementById('Hkm').getBoundingClientRect().top - 150
        if (tmp.Hkm.storyPending > player[this.layer].storyUnlocked) {
            player[this.layer].storyUnlocked = tmp.Hkm.storyPending;
            player[this.layer].newStory = true
            doPopup(type = "none", text = "New Hokma story unlocked!<br>(No. " + formatWhole(player[this.layer].storyUnlocked) + ")", title = "The gears of time quietly rotate...", timer = 5, color = "gray")
        }
        if (player.Hkm.storyUnlocked >= 2) player.Hkm.timeEnergy = player.Hkm.timeEnergy.add(tmp.Hkm.compressorEff.mul(diff))
        if (player.Hkm.timeEnergy.gte(tmp.Hkm.nextTimeTheorem)) {
            player.Hkm.timeTheorem = player.Hkm.timeTheorem.add(1)
            player.Hkm.totalTimeTheorem = player.Hkm.totalTimeTheorem.add(1)
        }
        player.Hkm.gridTime = player.Hkm.gridTime.add(diff)
        if (player.Hkm.storyUnlocked >= 6) {
            player.Hkm.PeBox = player.Hkm.PeBox.add(tmp.Hkm.PeBoxGain.mul(diff))
            player.Hkm.NeBox = player.Hkm.NeBox.add(tmp.Hkm.NeBoxGain.mul(diff)).max(0)
        }
        if (player.Hkm.NeBox.gte(tmp.Hkm.NeBoxStroage)) {
            player.Hkm.PeBox = n(0)
            player.Hkm.foams = player.Hkm.foams.div(2).floor()
            setBuyableAmount('Hkm', 'Hkm-f4', n(0))
            player.Hkm.NeBox = n(0)
        }
        if (hasAchievement('Ain', 'Hkm-17')) HokmaGridC[204] = 11
        if (hasAchievement('Ain', 'Hkm-25')) HokmaGridC[504] = 90
        if (hasAchievement('Ain', 'Hkm-26')) HokmaGridC[304] = 18
        if (getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).gt(player.Hkm.maxBet)) player.Hkm.maxBet = getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3'))
    },
    resetsNothing() {
        return player.Hkm.storyUnlocked >= 15
    },
    upgrades: {
        'Hkm-1': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Soft moonlight<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Essences above 1e300 boosts hokma points gain.' },
            effect() {
                let eff = Decimal.pow(1.1, player.points.add(1).log(10).sub(300))
                if (eff.gte(1e5)) eff = softcap(eff, 'root', n(1e5), 2)
                if (eff.gte(1e10)) eff = softcap(eff, 'root', n(1e10), 25)
                return eff
            },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            effectDisplay() { return '×' + format(layers.Hkm.upgrades[this.layer, this.id].effect()) },
            cost() { return n(3e6) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return true }
        },
        'Hkm-2': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Indulge in the starry sky<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Kether points above 1e300 boosts hokma points gain.' },
            effect() {
                let eff = Decimal.pow(1.03, player.Ktr.points.add(1).log(10).sub(300))
                if (eff.gte(1e5)) eff = softcap(eff, 'root', n(1e5), 2)
                if (eff.gte(1e10)) eff = softcap(eff, 'root', n(1e10), 25)
                return eff
            },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            effectDisplay() { return '×' + format(layers.Hkm.upgrades[this.layer, this.id].effect()) },
            cost() { return n(1e8) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-3': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Unleashed World<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Significantly improve Hokma points’ effect.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(2e9) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-4': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Imagined Ripples<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Essence gain ×1e50' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(2e10) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-5': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Infinity Heaven<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Kether points gain ×1e50' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(2e19) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-6': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Star Feather<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Make the formula of time compressors better.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(2e23) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-7': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Star Float<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Time-speed strength boost itself energy gain.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(1e24) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-8': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Heart meteor<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'Greatly boost the formula of stellar points.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(1e30) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-9': {
            title() { return quickColor('[' + this.id + ']' + '<h3>A distant agreement<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'The Growth of Time Space-grid have no limit, and slightly make it better.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(2e31) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-10': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Destruction 123<br>', hasUpgrade(this.layer, this.id) ? 'lime' : '') },
            description() { return 'divide 10,000 from the cost of z-axis time compressor.' },
            color() { return 'grey' },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost() { return n(1e38) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': this.color() } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'lime', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() { return hasUpgrade(this.layer, 'Hkm-9') }
        },
    },
    storyContent: {
        1: {
            text() {
                let text = `<text style='color:gray; font-size: 30px; text-shadow: 2px 2px 7px gray'>When the meteor falls, the star feathers still, and drift down into the lake.</text><br>
                <text style='color:gray; font-size: 30px; text-shadow: 2px 2px 7px gray'>Never have I hated the starry sky that seems so near, that sinking illusion — like the meteor for which all hearts yearn. The meteor will not come, and my tomorrow is but a deep and abiding darkness. — Hokma</text><br><br>
        		<text style='color: #999999'>[Illustration] Ain dreamed of Kether, and within that dream he told her that he had buried a key in Wonderland.</text><br>
		        <text style='color: #999999'>[Illustration] When Ain woke from her dream, she and I were adrift upon the lake in a wooden boat. I asked her where we should go first, and Ain answered that the clues Ktr-2 had given us pointed toward Star Feather Town, in the Kingdom of Niniel.</text><br>`
                if (player.Hkm.storyUnlocked < 1) text += `<br><br>
                <i style='color: #444444'>[Locked] Reach 1 hokma point to continue. (Tips: Press the prestige button in the hokma layer to gain hokma points. The requirement is 1e20 memory crystals and 1e330 stellar points. You will LOSE ALL PROGRESS IN THE KETHER LAYER!!)</i>`
                if (player.Hkm.storyUnlocked >= 1) text += `
                <text style='color: #999999'>[Illustration] As the boat drifted on, the girl at the oars fell into conversation with Ain, telling her that the Kingdom of Niniel is a romantic and fanciful land woven from fairy tales, and that each of its cities is the stage upon which one of Niniel's tales unfolds. Ain, curious about the tale of Star Feather Town, asked after it, and the boating girl answered that it was the tale of the Star Feather Swan.</text><br>
                <text style='color:magenta'>[Ain] Legend tells that Silver Moon Lake is a mirror left within the forest by the great designer Kether, one that reflects the beauty of the starry sky. Its truest wonder is that it can summon a grand meteor shower, and any wish made beneath that shower is certain to come true.</text><br>
                <text style='color: #777777'>[Hokma-768] Come, dear girl, come to Silver Moon Lake. The ripples are the stage, the starry night the curtain~ Dance, and spread your wings, and let dreams come true; pray, let me accompany you~ When the swans dance, their feathers fall as shooting stars...</text><br>
                <text style='color:magenta'>[Ain] Oh — might this be tied to the design brochure that Kether-2 gave us?</text><br>
                `
                return text
            }
        },
        2: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] The design brochure holds a rule: to bring a design into being, the designer's own inspiration must resound in echo. Now the inspiration for "Meteor Feather" rested within Ain's album, and you suggested that we visit the design workshop of Star Feather Town to give it form. Hokma-768, the boat girl, brought Ain and you ashore, and told us her name was Ah Huan — bidding us welcome to Star Feather Town, and inviting us to take her boat often in the days to come.</text><br>
                <text style='color: #999999'>[Illustration] Within the design workshop, Ain cradled the newly crafted piece and yearned for the power of the Sephirah Shadow that would be summoned once the Meteor Feather design was complete. She longed, too, to weave ever more designs in the days ahead, and to command a stronger Sephirah power.</text><br>
                `
                if (player.Hkm.storyUnlocked < 2) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock at least 7 achievements to continue. The more milestones you have, the faster the next Hokma run will be.</i>`
                if (player.Hkm.storyUnlocked >= 2) text += `
                <text style='color: #999999'>[Illustration] Ain was drawing out her purse to pay the crafting fee when a handsome young man in resplendent attire approached the shopkeeper. His eyes settled upon a pair of delicate gloves, and he wished to buy them — yet the shopkeeper offered them for free. The young man thanked him again and again, while Ain looked on, bewildered as to why they were given freely, and whether the shop kept some special favor.</text><br>
                <text style='color: #999999'>[Illustration] The handsome young man gave Ain a wink and departed. The shopkeeper explained that in Star Feather Town beauty is everything, and that, as one of its people, it is only natural to grant favor to the beautiful. Ain found this hard to believe. The shopkeeper said that folk always think Star Feather Town places too great a weight upon beauty, yet there is no need to deny human nature; better, he said, to grant the beautiful more happiness — as Star Feather Town does — for the plain were never suited to be born here.</text><br>
                <text style='color:magenta'>[Ain] Absurd, truly absurd — to treat people differently by the measure of their faces?</text><br>
                <text style='color: #999999'>[Illustration] Ain said that no one has any means to decree another's beauty or ugliness by birth. The shopkeeper answered that she was already very beautiful and had no need to think so little of herself. Ain saw that the shopkeeper had misunderstood her, and explained that it was the very system of judgment in Star Feather Town that was unreasonable.</text><br>
                <text style='color: #999999'>[Illustration] Walking out of the shop, Ain gazed once more upon the fairy-tale streets of Star Feather Town, and felt something altogether different. She saw that all who walked the streets were beautiful. In Star Feather Town, beauty is everything. So then — where had all the plain ones gone?</text><br>
                `
                return text
            }
        },
        3: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] Perhaps to the eyes of outsiders Star Feather Town is a pleasing and beautiful place, yet to Ain it brought only unease.</text><br>
                <text style='color: #999999'>[Illustration] Having come to Star Feather Town in search of clues about Kether, Ain resolved first to seek word of the nursery rhyme that Ah Huan had sung. And as for that nursery rhyme, the townsfolk again and again spoke of one person — an old fairy-tale musician who had dwelt within the town hospital for two years.</text><br>
                <text style='color: #999999'>[Illustration] Ain came to the door of the old musician's ward, and before she could knock, his voice had already drifted out from within.</text><br>
                <text style='color: #777777'>[Hokma-3] Are you Hokma-9? Come in, please.</text><br>
                `
                if (player.Hkm.storyUnlocked < 3) text += `<br><br>
                <i style='color: #444444'>[Locked] Expand your Time-Space grid to 1×1 to continue.</i>`
                if (player.Hkm.storyUnlocked >= 3) text += `
                <text style='color: #777777'>[Hokma-3] Grey Grass, you have come so early today. Have you finished your chores ahead of time? (Grey Grass = Hokma-9, Old Musician = Hokma-3)</text><br>
                <text style='color:magenta'>[Ain] Hello, dear musician — I am not Grey Grass. I am Ain, and today is the first time we have come to visit.</text><br>
                <text style='color: #999999'>[Illustration] Still the old musician murmured to himself, seemingly lost in a world where he and "Grey Grass" spoke as two old companions. As he spoke, he rose trembling from his wheelchair, and Ain hastened forward to steady him.</text><br>
                <text style='color: #777777'>[Hokma-3] The meteor, falling in the eye...</text><br>
                <text style='color: #999999'>[Illustration] The notes of the piano lay shattered, and the singing had grown hoarse.</text><br>
                <text style='color: #999999'>[Illustration] The musician once spoken of as a legend now played only old songs within a hospital ward.</text><br>
                <text style='color: #999999'>[Illustration] Watching the old musician lose himself in his playing, Ain resolved first to inquire of his attending physician.</text><br>
                <text style='color: #999999'>[Illustration] In the office, the attending doctor said that the old musician had dwelt within the hospital ever since the fire at the Star Feather Swan Selection two years past.</text><br>
                <text style='color: #777777'>[Hokma-768] After the fire he grew disoriented, and seemed to hold no memory of what befell that day. In time he slowly fell to Alzheimer's disease, and his heart has struggled ever since.</text><br>
                `
                return text
            }
        },
        4: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] As for the Grey Grass of whom the old musician so often spoke, none within the hospital knew who she was. Ain wondered why Grey Grass never came to visit him. The doctor said little, only that the old musician had few kin, and that his medical fees had always been borne by the town band.</text><br>
                <text style='color: #999999'>[Illustration] The thread of clues seemed to have broken. I suggested we return to the ark and ask Kether-2 — perhaps there was some way yet. But then, all at once, a telephone rang!</text><br>
                <text style='color:white'>[Kether-9718] Hello, is this Ain? Do you remember the friend I told you of, the one who was gathering word of designers? Her name is Vivian, and she is a journalist. She is preparing a column of interviews on design, and is in need of help. Are you interested?</text><br>
                <text style='color:white'>[Kether-9718] The column is called the Designer's Intelligence Room. Through its interviews you may meet designers of every kind, and gather many design collectibles that never circulate upon the open market.</text><br>
                <text style='color:magenta'>[Ain] Then it is settled.</text><br>
                <text style='color: #999999'>[Illustration] Returning to the Sea of Memory, Ain sought out Kether-2 and told him how the thread of the nursery rhyme had come to break.</text><br>
                <text style='color: #999999'>[Illustration] Kether-2 opened his portable notebook and drew forth the record of Ain's passage through the Miracle Continent. Ain marveled greatly at the powers held within that notebook.</text><br>
                <text style='color:white'>[Kether-2] The clue to the nursery rhyme was found within the record of a certain Sephirah Shadow — and its name may be of interest to you.</text><br>
                <text style='color:magenta'>[Ain] And the name is?</text><br>
                <text style='color:white'>[Kether-2] Hokma-9!</text><br>
                <text style='color:white'>[Kether-2] Within each mirror of the ark dwells a Sephirah, and in battle you call upon the power of the Sephirah Shadow held within the mirror.</text><br>
                `
                if (player.Hkm.storyUnlocked < 4) text += `<br><br>
                <i style='color: #444444'>[Locked] Expand your Time-Space grid to 2×2 to continue.</i>`
                if (player.Hkm.storyUnlocked >= 4) text += `
                <text style='color:white'>[Kether-2] This mirror holds the Sephirah Shadow of Grey Grass and the Meteor Feather; yet because its making was never finished, the mirror too remains incomplete.</text><br>
                <text style='color: #999999'>[Illustration] Upon the unfinished mirror, the sharp gaze of Grey Grass was revealed — and beneath that gaze lay a desire long suppressed.</text><br>
                <text style='color: #999999'>[Illustration] Meeting the gaze of Grey Grass, images flashed all at once through Ain's mind, and the vividness of that feeling made her clench her hands tight.</text><br>
                `
                return text
            }
        },
        5: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] When Ain came to her senses, she stood already within a sea of fire. Amidst the flames, far off in the distance, there loomed an indistinct grey figure.</text><br>
                <text style='color:magenta'>[Ain] Who are you? Where is this place?</text><br>
                <text style='color: #777777'>[Hokma-9] The meteor, falling in the eye...</text><br>
                <text style='color: #777777'>[Hokma-9] I am the one whom you have awakened.</text><br>
                <text style='color:magenta'>[Ain] Grey Grass?</text><br>
                <text style='color:white'>[?????] Grey Grass is already dead — and next, it shall be you!</text><br>
                <text style='color:pink'>[You] Call upon the power of Sephirah's Shadow, quickly!</text><br>
                <text style='color: #999999'>[Illustration] The power of Sephirah's Shadow arose within her warm heart, and the sea of fire slowly faded, leaving Ain alone upon the empty lakeshore.</text><br>
                <text style='color:magenta'>[Ain] Where is that mysterious girl?</text><br>
                <text style='color:magenta'>[Ain] What became of that mysterious girl? Then what I beheld just now was the designer's memory, from the time this garment was made?</text><br>
                <text style='color:white'>[Kether-2] Every garment is a distillation of its designer's emotions and memories, and from them a Sephirah Shadow is born within the reflection of the Sea of Memory.</text><br>
                <text style='color:white'>[Kether-2] A Sephirah Shadow holds only the emotions and memories the designer bore in that moment — and because those emotions run so fierce, take care, when you wield its power, that it does not turn upon you.</text><br>
                <text style='color: #999999'>[Illustration] Ain thought a while, and understood that only by summoning the Sephirah Shadow of Grey Grass could she learn the truth of that memory. Only so could we come to know the bond between the nursery rhyme and Kether.</text><br>
                `
                if (player.Hkm.storyUnlocked < 5) text += `<br><br>
                <i style='color: #444444'>[Locked] Expand your Time-Space grid to 3×3 to continue.</i>`
                if (player.Hkm.storyUnlocked >= 5) text += `
                <text style='color: #999999'>[Illustration] Ain and her companions met Ah Huan by chance, and Ah Huan invited them to take a ferry tour about the lake. Ain gently declined, saying that she had another matter to attend to.</text><br>
                <text style='color: #999999'>[Illustration] Ah Huan was a little curious, and so Ain asked whether she had ever seen the Meteor Feather garment before, and showed her its likeness.</text><br>
                `
                return text
            }
        },
        6: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] Ah Huan knew the Meteor Feather at a single glance, and said that even were she to die she could never forget this garment — for the tale of the Meteor Feather was not one that could be told in a moment. And so Ah Huan bade Ain and her companions aboard her boat, and slowly recounted the story behind the Meteor Feather.</text><br>
                <text style='color: #999999'>[Illustration] Of her memory of the Meteor Feather, Ah Huan said she had beheld it during the qualifying round of the last Star Feather Swan Selection, shining in brilliance between the starry sky and its reflection upon the water.</text><br>
                <text style='color: #999999'>[Illustration] As Ain heard Ah Huan speak of the Star Feather Swan Selection, it seemed to stir some faint echo within her memory. By now Ah Huan and Ain had come to the stage of the Star Feather Swan Selection; and as there were no festivities that night, the stage lay silent and still.</text><br>
                <text style='color: #777777'>[Hokma-768] This is the town's selection, held once every two years, in which the most beautiful girl is crowned with the title of "Star Feather Swan". Though Star Feather Town is small, its Selection of the Swan is a grand event that draws the eyes of the whole nation.</text><br>
                <text style='color: #777777'>[Hokma-768] The queen of Niniel — she whom I shall forever revere and aspire to, Lilith — departed two years ago, after she had won the crown.</text><br>
                <text style='color:magenta'>[Ain] What? Is the throne not passed by blood?</text><br>
                <text style='color: #777777'>[Hokma-768] The sovereign of Niniel is chosen by election — the one whom all the people of the land believe best embodies Niniel's spirit.</text><br>
                <text style='color:magenta'>[Ain] So the queen is the most beautiful girl, chosen by all the people of the land?</text><br>
                <text style='color: #777777'>[Hokma-768] Yes. Tomorrow is the Selection of the Star Feather Swan, and this year's contest shall be grander still.</text><br>
                <text style='color:magenta'>[Ain] The values of this land are truly extreme, and truly terrifying.</text><br>
                <text style='color: #777777'>[Hokma-768] Ain, I too wish to enter my name. Will you accompany me upon the stage, just once? The theme is my favorite — "Nick of Time"!</text><br>
                `
                if (player.Hkm.storyUnlocked < 6) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock Time foam to continue.</i>`
                if (player.Hkm.storyUnlocked >= 6) text += `
                <text style='color: #999999'>[Illustration] Ain awakened the power of the Sephirah and donned the headpiece of the Meteor Feather — the Star Feather.</text><br>
                <text style='color: #999999'>[Illustration] Ah Huan did not yet grasp how grave the matter had become, and Ain, giving her all, let Ah Huan feel the full power of the art of pairing, and ground her utterly into the earth.</text><br>
                `
                return text
            }
        },
        7: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] After the match, Ah Huan urged Ain to enter the Star Feather Swan Selection on the morrow, thinking she might there meet many artists and designers of the pairing craft — and all the more since the Meteor Feather had once shone upon that stage. Ain readily agreed.</text><br>
                <text style='color: #777777'>[Hokma-768] After the ones who bore the Meteor Feather had gone, thick smoke came drifting from behind the stage.</text><br>
                <text style='color:magenta'>[Ain] Was it that fire, the one in which the old musician was hurt?</text><br>
                <text style='color: #777777'>[Hokma-768] That fire was a strange thing indeed. Everyone believed the girl who wore the Meteor Feather would win the crown — but alas.</text><br>
                <text style='color:magenta'>[Ain] What became of her...?</text><br>
                <text style='color: #777777'>[Hokma-768] Disfigured by the flames.</text><br>
                <text style='color:magenta'>[Ain] Was it Grey Grass?</text><br>
                <text style='color: #777777'>[Hokma-768] It does not seem to have been that name — though many girls enter these contests to make their way into the circles of stage and fashion, and so go by names not their own.</text><br>
                <text style='color:magenta'>[Ain] And what befell her afterward?</text><br>
                <text style='color: #777777'>[Hokma-768] To bear so great a blow, and then to live on as an ugly thing in this little town — that is a bitter ending. I once saw a girl who always wore a mask when she went abroad, who had no friends, and who was forever tormented by others. I pitied her always — until, by chance, I glimpsed her face. Then I understood why she was so treated, and I was afraid.</text><br>
                <text style='color:pink'>[You] Why can we not spare that girl a little more compassion? She must be in such pain.</text><br>
                <text style='color:magenta'>[Ain] Do beauty and ugliness truly matter so? Is not the very purpose of the pairing craft to let all who yearn to shine become truly themselves?</text><br>
                `
                if (player.Hkm.storyUnlocked < 7) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock Time foam constructor to continue.</i>`
                if (player.Hkm.storyUnlocked >= 7) text += `
                <text style='color: #777777'>[Hokma-768] If that fire holds such interest for you, you might inquire at the police station — perhaps the record of the case is kept there still.</text><br>
                <text style='color:magenta'>[Ain] Let us go now!</text><br>
                <text style='color: #777777'>[Hokma-768] Ain, the hour is too late now. The police station will not receive your request.</text><br>
                <text style='color:magenta'>[Ain] I had forgotten...</text><br>
                `
                return text
            }
        },
        8: {
            text() {
                let text = `
                <text style='color: #777777'>[Hokma-768] Shall we see you to the inn first, and make our inquiries in the morning?</text><br>
                <text style='color:magenta'>[Ain] Thank you.</text><br>
                <text style='color: #777777'>[Hokma-768] It is nothing at all. To contend against your memory has shown me the way toward bettering myself, and let me feel the Shadow of the Sephirah. Tomorrow, I shall enter the contest with confidence.</text><br>
                <text style='color: #999999'>[Illustration] The next day.</text><br>
                <text style='color: #999999'>[Illustration] Ain came to the police station in the guise of an admirer of the Meteor Feather, to learn of the fire's aftermath and of what had become of Grey Grass.</text><br>
                <text style='color: #777777'>[Hokma-3200] Grey Grass is an arsonist — but how is it that you know of her? When the matter was reported, she went by a false name.</text><br>
                <text style='color: #999999'>[Illustration] Ain was seized with fear.</text><br>
                <text style='color: #777777'>[Hokma-3200] I took part in the investigation myself, and if my memory serves, Grey Grass was the arsonist who perished in the fire. Now I would know — what is your bond with her?</text><br>
                <text style='color:magenta'>[Ain] How can that be? The Meteor Feather was plainly the design of Grey Grass.</text><br>
                <text style='color: #777777'>[Hokma-3200] You do not believe it? Come into the archives, and I shall show you something.</text><br>
                <text style='color: #999999'>[Illustration] The officer (Hokma-3200) showed them a recording of Grey Grass, dancing and screaming as she covered her disfigured face.</text><br>
                <text style='color: #999999'>[Illustration] Fallen_Cat and Ain stood stunned before the screen. Whoever the arsonist had been, such a crime was a terrible thing. At that moment, the officer held out yet another photograph.</text><br>
                `
                if (player.Hkm.storyUnlocked < 8) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock the second pack of Kether upgrades to continue.</i>`
                if (player.Hkm.storyUnlocked >= 8) text += `
                <text style='color:magenta'>[Ain] Perhaps, being too ugly, she was cast off by the parents who bore her and taken in as an adopted daughter. And out of envy for her sister's beauty, she committed so terrible a crime.</text><br>
                <text style='color: #777777'>[Hokma-3200] Many say that to die in that fire was a mercy she scarcely deserved. Those are not my words, mind — do not go about repeating such things.</text><br>
                <text style='color:magenta'>[Ain] Thank you. I understand.</text><br>
                <text style='color:magenta'>[Ain] Perhaps this whole matter is not so simple. Let us return to the hospital and see the old musician once more.</text><br>
                `
                return text
            }
        },
        9: {
            text() {
                let text = `
                <text style='color:magenta'>[Ain] Old musician, are you well?</text><br>
                <text style='color: #777777'>[Hokma-3] Grey Grass, you have come again!</text><br>
                <text style='color:magenta'>[Ain] I have come to see you. Old musician, do you still remember the garment I designed?</text><br>
                <text style='color: #777777'>[Hokma-3] I remember. How fares that beautiful gown?</text><br>
                <text style='color:magenta'>[Ain] We need a few materials yet — it is very nearly finished.</text><br>
                <text style='color: #777777'>[Hokma-3] Good. When you stand upon that stage, I shall be there beside you.</text><br>
                <text style='color:magenta'>[Ain] Thank you. Do I sing well?</text><br>
                <text style='color: #777777'>[Hokma-3] It is a lovely sound; you need only believe in yourself. True beauty is not the face alone, but the holding fast to one's own heart. No matter what others may say, in my eyes you are lovely indeed. Stand upon that stage, wear the gown you fashioned with your own hands, sing that song, and summon that meteor shower.</text><br>
                <text style='color: #999999'>[Illustration] The old musician's words seemed so out of place in Star Feather Town, where beauty is everything.</text><br>
                <text style='color: #777777'>[Hokma-3] Go now! The meteor shower shall surely fall!</text><br>
                <text style='color:pink'>[You] Ain, let us return to the ark and see Grey Grass. She must be so very lonely.</text><br>
                `
                if (player.Hkm.storyUnlocked < 9) text += `<br><br>
                <i style='color: #444444'>[Locked] Expand your time-space grid to 4×4 to unlock.</i>`
                if (player.Hkm.storyUnlocked >= 9) text += `
                <text style='color:magenta'>[Ain] Return to the ark and see Grey Grass? But the mirror is not yet whole, is it?</text><br>
                <text style='color:pink'>[You] Even so, let us go back. There is something I truly wish to say to Grey Grass.</text><br>
                <text style='color: #999999'>[Illustration] The Ark of the Sea of Memory — before the Sephirah Shadow of Grey Grass.</text><br>
                <text style='color:magenta'>[Ain] Grey Grass, perhaps you have indeed done a wrong beyond forgiving. I can feel your emotions, and see those dim fragments of memory — yet is this ending truly the one you desire now?</text><br>
                <text style='color: #777777'>[Hokma-9] Those who mock you will never change, and your pain will never end.</text><br>
                <text style='color: #999999'>[Illustration] Ain reached out and lightly touched the mirror, and ripples spread across its surface — yet the touch held no chill. It was like a flame, burning and leaping.</text><br>
                `
                return text
            }
        },
        10: {
            text() {
                let text = `
                <text style='color: #999999'>[Illustration] A figure woven of anger and sorrow arose within the dimly lit mirror, rushing upon Ain amid roaring flames and drawing her within.</text><br>
                <text style='color:pink'>[You] Ain!</text><br>
                <text style='color:magenta'>[Ain] Grey Grass, you...</text><br>
                <text style='color:pink'>[You] Ain! Do not let the power of the Sephirah Shadow devour you — join her in the war of memory!</text><br>
                <text style='color:magenta'>[Ain] Grey Grass, your pain shall not master me!!</text><br>
                `
                if (player.Hkm.storyUnlocked < 10) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock eternal battery to continue.</i>`
                if (player.Hkm.storyUnlocked >= 10) text += `
                <text style='color: #999999'>[Illustration] The stage of which Grey Grass had once dreamed blazed with roaring flames; the people scattered and fled, and Grey Grass stood trembling in terror amidst the sea of fire.</text><br>
                <text style='color: #999999'>[Illustration] Grey Grass held her head high, bared to the flames, like a queen surveying a realm of her own.</text><br>
                <text style='color: #777777'>[Hokma-9] If evil be beautiful, then why should I not become a demon?</text><br>
                <text style='color:magenta'>[Ain] Pain cannot be burned away.</text><br>
                <text style='color: #777777'>[Hokma-9] Do not imagine that you understand me — leave my memories!</text><br>
                <text style='color: #999999'>[Illustration] Grey Grass was seized with fury, and the flames were swept upon Ain by a mighty wind.</text><br>
                <text style='color: #999999'>[Illustration] The firelight drifted away, and Ain returned to the ark.</text><br>
                <text style='color: #999999'>[Illustration] Ain gazed upon the silent mirror, knowing that the raging fire had been burning all this while within the heart of Grey Grass.</text><br>
                <text style='color:pink'>[You] Grey Grass seems to have sealed herself within the fire, refusing all who draw near.</text><br>
                <text style='color:magenta'>[Ain] The flame will die in the end — so long as the meteor shower falls.</text><br>
                <text style='color:pink'>[You] If a true meteor shower were summoned before Grey Grass, perhaps it might quench the fire within her heart?</text><br>
                <text style='color:magenta'>[Ain] Yes, I think so too. Come what may, I must try. I have all the inspiration now — let us go and call down the meteor shower together.</text><br>
                <text style='color: #999999'>[Illustration] The registration on the day of the contest.</text><br>
                <text style='color: #777777'>[Hokma-768] Ain, come here!</text><br>
                `
                return text
            }
        },
        11: {
            text() {
                let text = `
                <text style='color:magenta'>[Ain] Congratulations, Ah Huan!</text><br>
                <text style='color: #777777'>[Hokma-768] The qualifying round is not so hard to pass after all — I had feared you would not come.</text><br>
                <text style='color:magenta'>[Ain] Forgive me; I was held up by certain matters.</text><br>
                <text style='color:pink'>[You] So much has happened today; in the blink of an eye it is nearly dark.</text><br>
                <text style='color: #999999'>[Illustration] Just then the broadcast across the square announced that the qualifying round of the Star Feather Swan Selection was about to close. Ain hurried in alarm to register, but the judges refused her, saying the selection had already ended.</text><br>
                <text style='color:magenta'>[Ain] But the registration does not close for another five minutes.</text><br>
                `
                if (player.Hkm.storyUnlocked < 11) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock fuel battery to continue.</i>`
                if (player.Hkm.storyUnlocked >= 11) text += `
                <text style='color: #777777'>[Hokma-768] Grant us this chance, I beg you — this contest means a great deal to us.</text><br>
                <text style='color: #777777'>[Hokma] Why did you not come sooner? Can you not answer for yourself? Would you have me set an alarm for you? Away with you!</text><br>
                <text style='color: #777777'>[Hokma-768] But in years past, further places were opened even after the selection had closed. Why, even the queen who entered the last contest joined only after the semi-finals——</text><br>
                <text style='color: #777777'>[Hokma] What queen, and who are you? The special channel is opened to the beautiful alone. You, like those plain girls upon the street, are of common appearance. There is no wrong in being common — but to claim privilege despite that commonness, that is your fault!</text><br>
                <text style='color:magenta'>[Ain] Is this the measure by which the judges of the Star Feather Swan pass their judgment?</text><br>
                <text style='color: #777777'>[Hokma] What — do you have some objection?</text><br>
                <text style='color:magenta'>[Ain] The standard of beauty is not absolute.</text><br>
                <text style='color: #777777'>[Hokma] So now you insult the judges and slander the contest before all who stand here.</text><br>
                <text style='color:magenta'>[Ain] Did you not just declare that the contest had ended?</text><br>
                <text style='color: #777777'>[Hokma] Shameless little girl — let me teach you your place. You may name the theme of our contest of memory.</text><br>
                <text style='color: #999999'>[Illustration] Ah Huan grew frightened, and quickly told Ain that this judge was a renowned senior master of the pairing craft within the Sephirah Alliance, charged with appraising the pairings of the contestants in the competition.</text><br>
                `
                return text
            }
        },
        12: {
            text() {
                let text = `
                <text style='color:magenta'>[Ain] It is no matter. I do not believe that one whose understanding of the Sephirah is so shallow could command any great power of memory.</text><br>
                <text style='color:magenta'>[Ain] So then — let the theme be "the most esteemed of judges".</text><br>
                <text style='color: #777777'>[Hokma] Ha! You have named a theme in which I am well versed. How arrogant of you!</text><br>
                `
                if (player.Hkm.storyUnlocked < 12) text += `<br><br>
                <i style='color: #444444'>[Locked] Reach the first softcap of hokma points gain to unlock.</i>`
                if (player.Hkm.storyUnlocked >= 12) text += `
                <text style='color: #999999'>[Illustration] Even now the judge had not grasped how grave the matter was, and yet the battle was ended almost as soon as it began. He was ground utterly into the earth by Ain's power.</text><br>
                <text style='color: #999999'>[The Judge] I — lost? Impossible!</text><br>
                <text style='color: #777777'>[Hokma-768] Ain, you are so mighty!</text><br>
                <text style='color: magenta'>[Ain] The stage of the Star Feather Swan is a place where every girl may shine; even she who never becomes a 'Star Feather Swan' may show the world her own radiance. My own understanding of beauty is shallow still — yet a beauty that can bring neither hope nor wonder to others cannot be called true beauty at all.</text><br>
                <text style='color: #999999'>[Illustration] The judge looked upon the suddenly solemn Ain, and could find no words. In that moment, Ain's phone rang all at once.</text><br>
                <text style='color: #999999'>[Illustration] "Hello — yes, it was I who came to visit the old musician this afternoon. What? I shall come at once!" Ain was struck with alarm; the voice on the other end had told her that the old musician had suffered a sudden seizure of the heart, and was even now under emergency care!</text><br>
                `
                if (player.Hkm.storyUnlocked < 13) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock all sorts of fuel batteries to continue.</i>`
                if (player.Hkm.storyUnlocked >= 13) text += `
                <text style='color: #999999'>[Illustration] The door of the emergency room opened, and the attending doctor came forth.</text><br>
                <text style='color: magenta'>[Ain] Hello, doctor. How fares the old musician?</text><br>
                <text style='color: #999999'>[The Doctor] He has woken now, but... there are likely only two days left to him. Are you Grey Grass?</text><br>
                <text style='color: magenta'>[Ain] Why do you ask?</text><br>
                <text style='color: #999999'>[The Doctor] Spend what time you can at his side.</text><br>
                <text style='color: magenta'>[Ain] I believe what the old musician longs to see is not Grey Grass herself, but that she may overcome the world's prejudice and find her hope once more.</text><br>
                <text style='color: #777777'>[Hokma-3] You... have come... how did it... go...(struggling to form the words)</text><br>
                <text style='color: magenta'>[Ain] Do not hurry to speak. The registration went well; I wore the Meteor Feather, and everyone praised my design.</text><br>
                `
                return text
            }
        },
        13: {
            text() {
                let text = `
                <text style='color: #777777'>[Hokma-3] Mm... how wonderful.</text><br>
                <text style='color: magenta'>[Ain] Before long, I shall stand upon the stage and sing, and the meteor shower will fall. You must keep your eyes open to behold it!</text><br>
                <text style='color: #999999'>[Illustration] The old musician gazed out the window and nodded, his eyes shining with starlight, and grew a little brighter.</text><br>
                `
                if (player.Hkm.storyUnlocked < 14) text += `<br><br>
                <i style='color: #444444'>[Locked] Enable the leaf battery to continue.</i>`
                if (player.Hkm.storyUnlocked >= 14) text += `
                <text style='color:pink'>[You] We never registered, so we cannot take part in the contest. And what is more, the hospital lies so far from the stage that the old musician could never see it...</text><br>
                <text style='color: magenta'>[Ain] We have no need of that stage. Let us go and finish the rest of the Meteor Feather — Grey Grass is waiting for us.</text><br>
                <text style='color: #999999'>[Illustration] When they came out of the hospital, the night had already grown deep.</text><br>
                <text style='color: #999999'>[Illustration] "Grey Grass, it is time for us to take the stage," said Ain, holding the necklace. By now the Star Feather Swan contest would surely be underway, and lively indeed. The Heart Gate appeared — yet beyond the door all was silent, and no echo answered.</text><br>
                <text style='color:pink'>[You] It seems as though... she does not wish to come out.</text><br>
                <text style='color: #999999'>[Illustration] "Grey Grass, the stage and the gown are ready for you. It is time to step upon the stage. Are you afraid?"</text><br>
                <text style='color: #999999'>[Illustration] "What is it you think you understand?" Grey Grass rushed from the Heart Gate toward Ain, then a moment later lowered her head, her bangs falling to veil her eyes.</text><br>
                <text style='color:pink'>[You] You shall not hurt Ain any longer!</text><br>
                <text style='color: #777777'>[Hokma-9] Mocked, trampled, mocked again, my gown torn away, my violin broken...</text><br>
                <text style='color: #999999'>[Illustration] Moments steeped in resentment and rage.</text><br>
                <text style='color: magenta'>[Ain] The fire did not burn your pain away; your hope is lost — and the hope you long for is a grand meteor shower. Come; the old musician has been waiting for you to take the stage.</text><br>
                <text style='color: #777777'>[Hokma-9] Be arrogant no longer. You do not understand my feelings; you do not know how mighty my heart can be.</text><br>
                <text style='color: #999999'>[Illustration] Ain was drawn all at once into the Battle of Recollection! Yet in but a few moments, she overcame Grey Grass.</text><br>
                <text style='color: #999999'>[Illustration] The tattered garments upon Grey Grass were transformed into a Meteor Feather, adorned with stars.</text><br>
                `
                return text
            }
        },
        14: {
            text() {
                let text = `
                <text style='color:pink'>[You] Grey Grass, wearing the Meteor Feather, is truly beautiful!</text><br>
                <text style='color: magenta'>[Ain] Yes — we have done it. The meteor shower is beautiful!</text><br>
                <text style='color: #999999'>[Illustration] In the quiet ward, the old musician gazed in wonder at the meteor shower pouring past his window, and the radiant starry sky lit all of Silver Moon Lake. Grey Grass, robed in the Meteor Feather, appeared before him, and gently held him in her arms.</text><br>
                <text style='color: magenta'>[Ain] The flames of the world within the mirror are quenched, and I must not let myself be consumed by the memories of Grey Grass.</text><br>
                <text style='color:pink'>[You] Though we have gained no further clue to the nursery rhyme, it was worth it all the same — to let Grey Grass lay down the past.</text><br>
                <text style='color: #999999'>[Illustration] A glittering diamond, like a shooting star, came to rest upon my warm palm, faintly shaped like a swan.</text><br>
                <text style='color: magenta'>[Ain] Could this have been left behind by Kether?</text><br>
                `
                if (player.Hkm.storyUnlocked < 15) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock Backward Clock to continue. It's the ultimate challenge of Hokma layer.</i>`
                if (player.Hkm.storyUnlocked >= 15) text += `
                <text style='color: #999999'>[Illustration] ......</text><br>
                <text style='color: magenta'>[Ain] Farewell, old musician. Death, too, is the beginning of an unknown journey. Farewell, old musician.</text><br>
                <text style='color: #999999'>[Illustration] Ain heard a familiar voice, and turned to see Binah amidst the crowd.</text><br>
                <text style='color: magenta'>[Ain] Binah? That time at the bar...</text><br>
                <text style='color: #3a3a3a'>[Binah] We meet again, Ain and Fallen_Cat.</text><br>
                <text style='color: magenta'>[Ain] Thank you... I misjudged you before.</text><br>
                <text style='color: #3a3a3a'>[Binah] The fault was mine, for not explaining clearly. Have you too come to the old musician's funeral?</text><br>
                <text style='color: magenta'>[Ain] Yes.</text><br>
                <text style='color: #999999'>[Illustration] A stirring rose in Ain's heart as she stood before Binah and drew forth the Star Feather Diamond.</text><br>
                <text style='color: #3a3a3a'>[Binah] Where did this come from? Hmm... I believe the radiance of this diamond may point toward another timeline, running parallel to our own space and time — and to cross over, we shall need the power of the Clock of Backtracking. Will you come with me?</text><br>
                `
                return text
            }
        },
    },
    bars: {
        'Hkm-t1': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return formatWhole(player.Hkm.timeEnergy) + ' / ' + formatWhole(tmp.Hkm.nextTimeTheorem) + ' time energy for next time theorem' },
            progress() { return player.Hkm.timeEnergy.div(tmp.Hkm.nextTimeTheorem) },
            borderStyle() { return { 'border-color': 'grey' } },
            fillStyle() { return { 'background-color': 'grey' } },
            style() { return { 'color': 'white' } },
        },
        'Hkm-f1': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return formatWhole(player.Hkm.NeBox) + ' / ' + formatWhole(tmp.Hkm.NeBoxStroage) + ' until destruction' },
            progress() { return player.Hkm.NeBox.div(tmp.Hkm.NeBoxStroage) },
            borderStyle() { return { 'border-color': 'salmon' } },
            fillStyle() { return { 'background-color': 'salmon' } },
            style() { return { 'color': 'white' } },
        },
        'Hkm-bk1': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req1: ' + format(player.points) + ' / ' + format('1e4050') + ' essences' },
            progress() { return player.points.add(1).log(10).div(4050) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            style() { return { 'color': 'white' } },
            unlocked() { return true }
        },
        'Hkm-bk2': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req2: ' + formatWhole(player.Hkm.points) + ' / ' + format('1e225') + ' hokma points' },
            progress() { return player.Hkm.points.add(1).log(10).div(225) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            style() { return { 'color': 'white' } },
            unlocked() { return true }
        },
        'Hkm-bk3': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req3: ' + formatWhole(player.Hkm.timeEnergy) + ' / ' + formatWhole('1e167') + ' time energy' },
            progress() { return player.Hkm.timeEnergy.add(1).log(10).div(167) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            style() { return { 'color': 'white' } },
            unlocked() { return true }
        },
    },
    milestones: {
        'Hkm-1': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Autobuy every basic stars when affordable and gain 1 extra yellow dwarf.<br>2.All memory channels are always stable after unlocking them.<br>` + quickColor("3.Unlock Ain (Achievements).", 'pink') },
            req: n(1),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return true }
        },
        'Hkm-2': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Keep all Kether upgrades on Hokma reset.` },
            req: n(2),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-3': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Autobuy ark if possible.` },
            req: n(3),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-4': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Autobuy things in Moments Watch Shop and they costs nothing.` },
            req: n(4),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-5': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Auto Transition when possible.` },
            req: n(6),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-6': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.The black hole speed is always at 1000× and you cannot longer gain antimatter.` },
            req: n(9),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-7': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Keep memory crystal through Hokma reset.` },
            req: n(18),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-8': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.The ark is in remote space instantly after Hokma reset.` },
            req: n(100),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-9': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Autobuy Ktr-s-d2 and Ktr-s-d3.<br>2.Unlocking new Kether story won’t longer force a pupop.` },
            req: n(500),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-' + Number(this.id[4] - 1)) }
        },
        'Hkm-10': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Autobuy the rest of buyables.` },
            req: n(1000),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-9') }
        },
        'Hkm-11': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.The memory depth of Kether is always 100.` },
            req: n(1500),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-12': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Keep all buyable and arks after Hokma reset.` },
            req: n(2500),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-13': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Expand time-space grid.(0×0 → 1×1)` },
            req: n(1e13),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-14': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Expand time-space grid.(1×1 → 2×2)` },
            req: n(1e20),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-15': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Expand time-space grid.(2×2 → 3×3)` },
            req: n(1e32),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-16': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Unlock Time foam.` },
            req: n(1e42),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-17': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Expand time-space grid.(3×3 → 4×4)` },
            req: n(1e63),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-18': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Unlock fuel battery.(Under the eternal battery tab.)` },
            req: n(1e136),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-19': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Expand time-space grid.(4×4 → 5×5)<br>2.Divide 1e20 from the cost of time foam.<br>3.The gain of hokma points is softcapped. (I'm sorry)` },
            req: n(1e150),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-1' + Number(this.id[5] - 1)) }
        },
        'Hkm-20': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.Gain a free leaf battery.<br>2.The gain of Se-box is raised to the power of ^1.33.<br>3.Double the effect of Hkm-b1.` },
            req: n(1e203),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-19') }
        },
        'Hkm-21': {
            requirementDescription() { return quickColor("Get " + formatWhole(this.req) + " Hokma Points (" + formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100).min(100)) + "%)", hasMilestone(this.layer, this.id) ? 'green' : '') },
            effectDescription() { return `———————————————————————————————————————————<br>1.All batteries are twice as strong per level.<br>2.Gain a free aqua battery.` },
            req: n(1e218),
            done() { return player.Hkm.points.gte(this.req) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return { 'height': '100px', 'max-width': '700px', 'background': `linear-gradient(to right,#999999 ${formatWhole(n(player.Hkm.points).div(tmp.Hkm.milestones[this.id].req).mul(100))}%,grey ${formatWhole(player.Hkm.points.div(tmp.Hkm.milestones[this.id].req).mul(100))}%)`, 'border-radius': '5px' } }
                else return { 'background': `repeating-linear-gradient(90deg, #444444 0, #444444 1px, #001700 0,#001700 70px)`, 'background-size': '70px', 'color': 'white', 'height': '100px', 'max-width': '700px', 'box-shadow': `0px 0px 4px ${player.timePlayed % 2 + 5}px #444444` }
            },
            unlocked() { return hasMilestone(this.layer, 'Hkm-2' + Number(this.id[5] - 1)) }
        },
    },

    layerShown() { return player.Hkm.activeChallenge != 'Hkm-bk1' && (player.Ktr.memoryCrystal.gte(1e20) || player.Hkm.storyUnlocked >= 1) },          // Returns a bool for if this layer's node should be visible in the tree.
    grid: {
        rows() { return tmp.Hkm.gridSize }, // If these are dynamic make sure to have a max value as well!
        cols() { return tmp.Hkm.gridSize },
        maxRows: 12,
        maxCols: 12,
        getStartData(id) {
            return 0
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            return player.Hkm.timeTheorem.gte(HokmaGridC[id]) && data != 1
        },
        getTooltip(data, id) {
            let color = HokmaColor[id % 100]
            return "<h4 style='color:" + color + ";text-shadow:0px 0px 10px;'>[" + HokmaGridFullProfix[id % 100] + (Math.floor(id / 100)) + "]<h4><h4>Effect: " + HokmaGridDesc[id] + "<br>Currently: " + getProfix(data, id) + format(getEffect(data, id))
        },
        onClick(data, id) {
            player.Hkm.timeTheorem = player.Hkm.timeTheorem.sub(HokmaGridC[id])
            player[this.layer].grid[id]++
        },
        getDisplay(data, id) {
            return '<h1 style="font-size:25px">' + HokmaGridProfix[id % 100] + (Math.floor(id / 100)) + "<h3><br><br>Cost: " + HokmaGridC[id] + ' Time theorems'
        },
        getStyle(data, id) {
            let color = HokmaColor[id % 100]
            if (data <= 0) return { 'background-color': "#000000", color: "white", 'border-color': color, 'border-radius': "5px", height: "100px", width: "100px" }
            else return { 'background-color': color, color: "white", 'border-color': color, 'border-radius': "5px", height: "100px", width: "100px" }
        },
    },
    buyables: {
        'Hkm-t1': {
            title() { return '<h3>[Hkm-t1] X-axis Time Compressor<br>' },
            display() { return 'Create a new time compressor.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Hokma points" },
            canAfford() { return player.Hkm.points.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(n(100), Decimal.pow(x, 1.2)).mul(10000)
                return cost
            },
            buy() {
                player.Hkm.points = player.Hkm.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'silver' } }
                else return { 'background-color': 'grey', 'color': 'black', 'border-color': 'silver', 'box-shadow': 'inset 3px 3px 3px #aaaaaa,0px 0px 10px grey' }
            }
        },
        'Hkm-t2': {
            title() { return '<h3>[Hkm-t2] Y-axis Time Compressor<br>' },
            display() { return 'Create a new time compressor.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Kether points" },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(n(1e8), Decimal.pow(4, x)).mul('1e340')
                if (hasAchievement('Ain', 'Hkm-15')) cost = Decimal.pow(n(1e10), Decimal.pow(x, 2)).mul('1e340')
                if (hasUpgrade('Ktr', 'Ktr-23')) cost = cost.div('1e3000')
                if (cost.gte('1e3200')) cost = cost.mul(cost.div('1e3200').pow(4))
                return cost
            },
            buy() {
                player.Ktr.points = player.Ktr.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'silver' } }
                else return { 'background-color': 'grey', 'color': 'black', 'border-color': 'silver', 'box-shadow': 'inset 3px 3px 3px #aaaaaa,0px 0px 10px grey' }
            }
        },
        'Hkm-t3': {
            title() { return '<h3>[Hkm-t3] Z-axis Time Compressor<br>' },
            display() { return 'Create a new time compressor.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Memory crystals" },
            canAfford() { return player.Ktr.memoryCrystal.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(n(10), Decimal.pow(x, 1.1)).mul(1e24)
                if (hasUpgrade('Hkm', 'Hkm-10')) cost = cost.div(10000)
                return cost
            },
            buy() {
                player.Ktr.memoryCrystal = player.Ktr.memoryCrystal.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'silver' } }
                else return { 'background-color': 'grey', 'color': 'black', 'border-color': 'silver', 'box-shadow': 'inset 3px 3px 3px #aaaaaa,0px 0px 10px grey' }
            }
        },
        'Hkm-f1': {
            title() { return '<h3>[Hkm-f1] Milli-foam<br>' },
            display() { return 'Reduce the requirement of the next ark.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: /" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-boxes" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            effect(x) {
                let eff = Decimal.pow(1e85, Decimal.pow(x, 0.8))
                return eff
            },
            cost(x) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(10, x).mul(100)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost
            },
            buy() {
                player.Hkm.PeBox = player.Hkm.PeBox.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'turquoise', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,aqua 0px,aqua 40px,turquoise 40px,turquoise 80px)', 'color': 'black', 'border-color': 'turquoise', 'box-shadow': 'inset 3px 3px 3px aqua,0px 0px 10px #00dddd', 'height': '150px' }
            }
        },
        'Hkm-f2': {
            title() { return '<h3>[Hkm-f2] Micro-foam<br>' },
            display() { return 'Strengthen the time-space grid.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(this.effect().mul(100)) + "%<br>Cost: " + format(this.cost()) + " Pe-boxes" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            effect(x) {
                let eff = Decimal.div(x, 100)
                return eff
            },
            cost(x) {
                if (x.gte(20)) x = x.pow(x.div(20))
                let cost = Decimal.pow(15, x).mul(200)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost
            },
            buy() {
                player.Hkm.PeBox = player.Hkm.PeBox.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'turquoise', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,aqua 0px,aqua 40px,turquoise 40px,turquoise 80px)', 'color': 'black', 'border-color': 'turquoise', 'box-shadow': 'inset 3px 3px 3px aqua,0px 0px 10px #00dddd', 'height': '150px' }
            }
        },
        'Hkm-f3': {
            title() { return '<h3>[Hkm-f3] Nano-foam<br>' },
            display() { return 'Multiply solar energy gain.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-boxes" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            effect(x) {
                let eff = Decimal.pow(6e8, Decimal.pow(x, 0.95))
                return eff
            },
            cost(x) {
                if (x.gte(20)) x = x.pow(x.div(20))
                let cost = Decimal.pow(150, x).mul(1000)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost
            },
            buy() {
                player.Hkm.PeBox = player.Hkm.PeBox.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'turquoise', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,aqua 0px,aqua 40px,turquoise 40px,turquoise 80px)', 'color': 'black', 'border-color': 'turquoise', 'box-shadow': 'inset 3px 3px 3px aqua,0px 0px 10px #00dddd', 'height': '150px' }
            }
        },
        'Hkm-f4': {
            title() { return '<h3>[Hkm-f4] Pico-foam<br>' },
            display() { return 'Make the Pe-box transformation speed faster.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-boxes" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            effect(x) {
                let eff = Decimal.pow(1.35, x)
                return eff
            },
            cost(x) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(10, x).mul(1000)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost.floor()
            },
            buy() {
                player.Hkm.PeBox = player.Hkm.PeBox.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'turquoise', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,aqua 0px,aqua 40px,turquoise 40px,turquoise 80px)', 'color': 'black', 'border-color': 'turquoise', 'box-shadow': 'inset 3px 3px 3px aqua,0px 0px 10px #00dddd', 'height': '150px' }
            }
        },
        'Hkm-f5': {
            title() { return '<h3>[Hkm-f5] Femto-foam<br>' },
            display() { return 'Make the effect of Pe-box massively better.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " time energy" },
            canAfford() { return player.Hkm.timeEnergy.gte(this.cost()) },
            cost(x) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(1e6, x).mul(1e29)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost.floor()
            },
            effect(x) {
                let eff = x.mul(0.4).add(1).cbrt().min(1.60)
                return eff;
            },
            buy() {
                player.Hkm.timeEnergy = player.Hkm.timeEnergy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'gold', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,gold 0px,gold 40px,yellow 40px,yellow 80px)', 'color': 'black', 'border-color': 'gold', 'box-shadow': 'inset 3px 3px 3px gold,0px 0px 10px yellow', 'height': '150px' }
            }
        },
        'Hkm-f6': {
            title() { return '<h3>[Hkm-f6] Atto-foam<br>' },
            display() { return 'Decrease the negative effect of Ne-boxes.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " time energy" },
            canAfford() { return player.Hkm.timeEnergy.gte(this.cost()) },
            cost(x) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(1e10, x).mul(1e40)
                if (player.Hkm.storyUnlocked >= 10) cost = cost.div(tmp.Hkm.BatteryEff1)
                return cost.floor()
            },
            effect(x) {
                let eff = x.mul(0.02).add(1).recip()
                return eff;
            },
            buy() {
                player.Hkm.timeEnergy = player.Hkm.timeEnergy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasAchievement('Ain', 'Hkm-14')
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'gold', 'height': '150px' } }
                else return { 'background': 'repeating-linear-gradient(45deg,gold 0px,gold 40px,yellow 40px,yellow 80px)', 'color': 'black', 'border-color': 'gold', 'box-shadow': 'inset 3px 3px 3px gold,0px 0px 10px yellow', 'height': '150px' }
            }
        },
        'Hkm-b1': {
            title() { return '<h3>[Hkm-b1] Battery Mk.1EZ<br>' },
            display() { return 'Add 0.1 to exp of Pe-box effect and time foam effect.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-box" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            cost(x) {
                return Decimal.pow(1e4, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).sub(2).max(0).pow(1.05)).mul(1e7).max(1e7).div(buyableEffect('Hkm', 'Hkm-fb-1-4')).div(buyableEffect('Hkm', 'Hkm-fb-2-4')).div(buyableEffect('Hkm', 'Hkm-fb-3-4')).div(buyableEffect('Hkm', 'Hkm-fb-4-4'))
            },
            effect(x) {
                if (x.gte(3)) x = softcap(x, 'root', n(3), 3)
                let eff = x.mul(0.1)
                if (hasMilestone('Hkm', 'Hkm-20')) eff = eff.mul(2)
                return eff
            },
            buy() {
                batteryReset()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'gold' } }
                else return { 'background': GlowingColor('#ffaa00', 10, '#ffdd00'), 'color': 'black', 'border-color': 'gold', 'box-shadow': 'inset 3px 3px 3px gold,0px 0px 10px yellow' }
            }
        },
        'Hkm-b2': {
            title() { return '<h3>[Hkm-b2] Battery Mk.2HD<br>' },
            display() { return 'Sqaure the time destruction threshold.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-box" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            cost(x) {
                return Decimal.pow(1e4, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).sub(2).max(0).pow(1.05)).mul(1e7).max(1e7).div(buyableEffect('Hkm', 'Hkm-fb-1-4')).div(buyableEffect('Hkm', 'Hkm-fb-2-4')).div(buyableEffect('Hkm', 'Hkm-fb-3-4')).div(buyableEffect('Hkm', 'Hkm-fb-4-4'))
            },
            effect(x) {
                let eff = Decimal.pow(2, x)
                if (hasAchievement('Ain', 'Hkm-20')) eff = eff.mul(2)
                return eff
            },
            buy() {
                batteryReset()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'gold' } }
                else return { 'background': GlowingColor('#ffaa00', 10, '#ffdd00'), 'color': 'black', 'border-color': 'gold', 'box-shadow': 'inset 3px 3px 3px gold,0px 0px 10px yellow' }
            }
        },
        'Hkm-b3': {
            title() { return '<h3>[Hkm-b3] Battery Mk.3IN<br>' },
            display() { return 'Divide the base in the formula of Ne-box effect.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: /" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Pe-box" },
            canAfford() { return player.Hkm.PeBox.gte(this.cost()) },
            cost(x) {
                return Decimal.pow(1e4, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3')).sub(2).max(0).pow(1.05)).mul(1e7).max(1e7).div(buyableEffect('Hkm', 'Hkm-fb-1-4')).div(buyableEffect('Hkm', 'Hkm-fb-2-4')).div(buyableEffect('Hkm', 'Hkm-fb-3-4')).div(buyableEffect('Hkm', 'Hkm-fb-4-4'))
            },
            effect(x) {
                let eff = Decimal.pow(1e3, Decimal.pow(3, x)).div(1000)
                return eff
            },
            buy() {
                batteryReset()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'gold' } }
                else return { 'background': GlowingColor('#ffaa00', 10, '#ffdd00'), 'color': 'black', 'border-color': 'gold', 'box-shadow': 'inset 3px 3px 3px gold,0px 0px 10px yellow' }
            }
        },
        'Hkm-fb-1-4': {
            title() { return 'Coal Battery Ft.Pst1<br>' },
            display() { return "Reduce the cost of next eternal battery by /" + format(this.effect()) + '' },
            canAfford() { return false },
            cost(x) {
                return Decimal.pow(2, x).mul(10)
            },
            effect(x) {
                let eff = Decimal.pow(9 * (hasMilestone('Hkm', 'Hkm-21') ? 2 : 1), x)
                return eff
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                return { 'background': GlowingColor('#444444', 10, '#666666'), 'height': '80px', 'width': '200px', 'color': 'white', 'border-color': GlowingColor('#444444', 10, '#666666'), 'font-size': '10px', 'border-radius': '0px' }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 11
            },
        },
        'Hkm-fb-2-4': {
            title() { return 'Alchemy Battery Ft.Prs2<br>' },
            display() { return "Reduce the cost of next eternal battery by /" + format(this.effect()) + '' },
            canAfford() { return false },
            cost(x) {
                return Decimal.pow(3, x).mul(10)
            },
            effect(x) {
                let eff = Decimal.pow(81 * (hasMilestone('Hkm', 'Hkm-21') ? 2 : 1), x)
                if (hasAchievement('Ain', 'Hkm-22')) eff = eff.mul(81)
                if (hasUpgrade('Ktr', 'Ktr-25')) eff = eff.mul(400)
                return eff
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                return { 'background': GlowingColor('#660000', 7, '#aa0000'), 'height': '80px', 'width': '200px', 'color': 'white', 'border-color': GlowingColor('#770000', 7, '#bb0000'), 'font-size': '10px', 'border-radius': '0px' }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(2)
            },
        },
        'Hkm-fb-3-4': {
            title() { return 'Leaf Battery Ft.Ftr3<br>' },
            display() { return "Reduce the cost of next eternal battery by /" + format(this.effect()) + '' },
            canAfford() { return false },
            cost(x) {
                return Decimal.pow(4, x).mul(10)
            },
            effect(x) {
                let eff = Decimal.pow(729 * (hasMilestone('Hkm', 'Hkm-21') ? 2 : 1), x)
                if (hasAchievement('Ain', 'Hkm-24')) eff = eff.mul(729)
                if (hasMilestone('Hkm', 'Hkm-20')) eff = eff.mul(729)
                return eff
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                return { 'background': GlowingColor('#006600', 5, '#00aa00'), 'height': '80px', 'width': '200px', 'color': 'white', 'border-color': GlowingColor('#007700', 5, '#00bb00'), 'font-size': '10px', 'border-radius': '0px' }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(3)
            },
        },
        'Hkm-fb-4-4': {
            title() { return 'Aqua Battery Ft.Byd4<br>' },
            display() { return "Reduce the cost of next eternal battery by /" + format(this.effect()) + '' },
            canAfford() { return false },
            cost(x) {
                return Decimal.pow(5, x).mul(10)
            },
            effect(x) {
                let eff = Decimal.pow(6561 * (hasMilestone('Hkm', 'Hkm-21') ? 2 : 1), x)
                if (hasAchievement('Ain', 'Hkm-26')) eff = eff.mul(6561)
                if (hasMilestone('Hkm', 'Hkm-21')) eff = eff.mul(6561)
                return eff
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                return { 'background': GlowingColor('#222266', 3, '#3333aa'), 'height': '80px', 'width': '200px', 'color': 'white', 'border-color': GlowingColor('#222277', 3, '#3333bb'), 'font-size': '10px', 'border-radius': '0px' }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(4)
            },
        },
    },
    clickables: {
        'Hkm-tr1': {
            title() { return "Respec" },
            display() { return "Respec all gridables in Time-Space grid and take back all time theorems." },
            canClick() { return true },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px grey', 'background': `repeating-linear-gradient(90deg, grey 0, grey 1px, black 0, black 100px)`, "background-position": player.timePlayed % 10 + '% ' + player.timePlayed % 10 + "%", 'background-size': `1000% 1000%`, 'color': 'white', 'height': '150px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px' }
                else return { 'height': '150px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'lavender', 'margin-left': '5px' }
            },
            onClick() {
                for (id in player.Hkm.grid) {
                    player.Hkm.grid[id] = 0
                }
                player.Hkm.timeTheorem = player.Hkm.totalTimeTheorem.sub(player.Hkm.batteryTheorem)
                player.Hkm.gridTime = n(0)
            },
            unlocked() { return hasMilestone('Hkm', 'Hkm-13') }
        },
        'Hkm-f1': {
            title() { return "Get +1 time foam" },
            display() { return "<br>Requires " + format(tmp.Hkm.foamReq) + " time energy. <br>Resetting this to get time foam resets all your time energy." },
            canClick() { return player.Hkm.timeEnergy.gte(tmp.Hkm.foamReq) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #444', 'background-color': `black`, 'color': 'white', 'height': '150px', 'width': '300px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#444' }
                else return { 'height': '150px', 'width': '300px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': '#444', 'margin-left': '5px' }
            },
            onClick() {
                player.Hkm.foams = player.Hkm.foams.add(1)
                player.Hkm.timeEnergy = n(0)
            },
        },
        'Hkm-b1': {
            title() { return "Sell One" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-b1').gte(1) },
            style() {
                if (this.canClick()) return { 'background': `gold`, 'color': 'black', 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'border-color': 'yellow' }
                else return { 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'yellow' }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b1', getBuyableAmount('Hkm', 'Hkm-b1').sub(1))
            },
        },
        'Hkm-b2': {
            title() { return "Sell One" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-b2').gte(1) },
            style() {
                if (this.canClick()) return { 'background': `gold`, 'color': 'black', 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'border-color': 'yellow' }
                else return { 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'yellow' }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b2', getBuyableAmount('Hkm', 'Hkm-b2').sub(1))
            },
        },
        'Hkm-b3': {
            title() { return "Sell One" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-b3').gte(1) },
            style() {
                if (this.canClick()) return { 'background': `gold`, 'color': 'black', 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'border-color': 'yellow' }
                else return { 'min-height': '50px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'yellow' }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b3', getBuyableAmount('Hkm', 'Hkm-b3').sub(1))
            },
        },
        'Hkm-fb-1-1': {
            title() { return "▼" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').gte(1) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#444444', 10, '#666666'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#333333', 10, '#555555') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#444444', 10, '#666666'), 'border-color': GlowingColor('#333333', 10, '#555555') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').sub(1))
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 11
            }
        },
        'Hkm-fb-1-2': {
            title() { return "Generation " + getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1) + "<br>Gen up cost: " + formatWhole(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) + " time theorems" },
            canClick() { return false },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#444444', 10, '#666666'), 'color': 'white', 'min-height': '80px', 'width': '200px', 'border-radius': '0px', 'font-size': '10px', 'border-color': GlowingColor('#333333', 10, '#555555') }
                else return { 'min-height': '80px', 'width': '200px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#444444', 10, '#666666'), 'border-color': GlowingColor('#333333', 10, '#555555') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b3', getBuyableAmount('Hkm', 'Hkm-b3').sub(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 11
            }
        },
        'Hkm-fb-1-3': {
            title() { return "▲" },
            canClick() { return player.Hkm.timeTheorem.gte(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#444444', 10, '#666666'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#333333', 10, '#555555') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#444444', 10, '#666666'), 'border-color': GlowingColor('#333333', 10, '#555555') }
            },
            onClick() {
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 11
            }
        },
        'Hkm-fbl-2': {
            title() { return "[!!! Low Voltage !!!] Alchemy Battery Ft.Prs2<br><br>Let your weakest eternal battery reach Lv.2 to enable this." },
            canClick() { return false },
            style() {
                return { 'min-height': '80px', 'width': '560px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#000000', 7, '#bb0000'), 'border': '3px dotted ' + GlowingColor('#000000', 7, '#aa0000') }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().lt(2)
            }
        },
        'Hkm-fb-2-1': {
            title() { return "▼" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').gte(1) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#660000', 7, '#aa0000'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#770000', 7, '#bb0000') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#660000', 7, '#aa0000'), 'border-color': GlowingColor('#770000', 7, '#bb0000') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').sub(1))
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(2)
            }
        },
        'Hkm-fb-2-2': {
            title() { return "Generation " + getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1) + " / 8<br>Gen up cost: " + formatWhole(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) + " time theorems" },
            canClick() { return false },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#660000', 7, '#aa0000'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '10px', 'border-color': GlowingColor('#770000', 7, '#bb0000') }
                else return { 'min-height': '80px', 'width': '200px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#660000', 7, '#aa0000'), 'border-color': GlowingColor('#770000', 7, '#bb0000') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b3', getBuyableAmount('Hkm', 'Hkm-b3').sub(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(2)
            }
        },
        'Hkm-fb-2-3': {
            title() { return "▲" },
            canClick() { return player.Hkm.timeTheorem.gte(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) && getBuyableAmount('Hkm', 'Hkm-fb-2-4').lt(7) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#660000', 7, '#aa0000'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#770000', 7, '#bb0000') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#660000', 7, '#aa0000'), 'border-color': GlowingColor('#770000', 7, '#bb0000') }
            },
            onClick() {
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(2)
            }
        },
        'Hkm-fbl-3': {
            title() { return "[!!! Low Voltage !!!] Leaf Battery Ft.Ftr3<br><br>Let your weakest eternal battery reach Lv.3 to enable this." },
            canClick() { return false },
            style() {
                return { 'min-height': '80px', 'width': '560px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#000000', 5, '#00bb00'), 'border': '3px dotted ' + GlowingColor('#000000', 5, '#00aa00') }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().lt(3) && minBatteryLevel().gte(2)
            }
        },
        'Hkm-fb-3-1': {
            title() { return "▼" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').gte(1) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#006600', 5, '#006600'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#007700', 5, '#00bb00') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#006600', 5, '#006600'), 'border-color': GlowingColor('#007700', 5, '#00bb00') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').sub(1))
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(3)
            }
        },
        'Hkm-fb-3-2': {
            title() { return "Generation " + getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1) + " / 8<br>Gen up cost: " + formatWhole(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) + " time theorems" },
            canClick() { return false },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#006600', 5, '#006600'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '10px', 'border-color': GlowingColor('#007700', 5, '#00bb00') }
                else return { 'min-height': '80px', 'width': '200px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#006600', 5, '#006600'), 'border-color': GlowingColor('#007700', 5, '#00bb00') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b3', getBuyableAmount('Hkm', 'Hkm-b3').sub(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(3)
            }
        },
        'Hkm-fb-3-3': {
            title() { return "▲" },
            canClick() { return player.Hkm.timeTheorem.gte(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) && getBuyableAmount('Hkm', 'Hkm-fb-2-4').lt(7) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#006600', 5, '#006600'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#007700', 5, '#00bb00') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#006600', 5, '#006600'), 'border-color': GlowingColor('#007700', 5, '#00bb00') }
            },
            onClick() {
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(3)
            }
        },
        'Hkm-fbl-4': {
            title() { return "[!!! Low Voltage !!!] Aqua Battery Ft.Byd4<br><br>Let your weakest eternal battery reach Lv.4 to enable this." },
            canClick() { return false },
            style() {
                return { 'min-height': '80px', 'width': '560px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#000000', 3, '#3333aa'), 'border': '3px dotted ' + GlowingColor('#000000', 3, '#3333bb') }
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().lt(4) && minBatteryLevel().gte(3)
            }
        },
        'Hkm-fb-4-1': {
            title() { return "▼" },
            canClick() { return getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').gte(1) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#222266', 3, '#3333aa'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#222277', 3, '#3333bb') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#222266', 3, '#3333aa'), 'border-color': GlowingColor('#222277', 3, '#3333bb') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').sub(1))
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(4)
            }
        },
        'Hkm-fb-4-2': {
            title() { return "Generation " + getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1) + " / 8<br>Gen up cost: " + formatWhole(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) + " time theorems" },
            canClick() { return false },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#222266', 3, '#3333aa'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '10px', 'border-color': GlowingColor('#222277', 3, '#3333bb') }
                else return { 'min-height': '80px', 'width': '200px', 'border-radius': '0px', 'font-size': '10px', 'background-color': 'black', 'color': GlowingColor('#222266', 3, '#3333aa'), 'border-color': GlowingColor('#222277', 3, '#3333bb') }
            },
            onClick() {
                setBuyableAmount('Hkm', 'Hkm-b3', getBuyableAmount('Hkm', 'Hkm-b3').sub(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(4)
            }
        },
        'Hkm-fb-4-3': {
            title() { return "▲" },
            canClick() { return player.Hkm.timeTheorem.gte(tmp.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost) && getBuyableAmount('Hkm', 'Hkm-fb-2-4').lt(7) },
            style() {
                if (this.canClick()) return { 'background': GlowingColor('#222266', 3, '#3333aa'), 'color': 'white', 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'border-color': GlowingColor('#222277', 3, '#3333bb') }
                else return { 'min-height': '80px', 'width': '80px', 'border-radius': '0px', 'font-size': '13px', 'background-color': 'black', 'color': GlowingColor('#222266', 3, '#3333aa'), 'border-color': GlowingColor('#222277', 3, '#3333bb') }
            },
            onClick() {
                player.Hkm.batteryTheorem = player.Hkm.batteryTheorem.add(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                player.Hkm.timeTheorem = player.Hkm.timeTheorem.sub(layers.Hkm.buyables['Hkm-fb-' + this.id[7] + '-4'].cost())
                setBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4', getBuyableAmount('Hkm', 'Hkm-fb-' + this.id[7] + '-4').add(1))
            },
            unlocked() {
                return player.Hkm.storyUnlocked >= 13 && minBatteryLevel().gte(4)
            }
        },
        'Hkm-bk1': {
            title() { return "[Common] Unknown blueprint" },
            display() { return "<h3>Collect 3× wood.(1s)" },
            canClick() { return false },
            style() {
                return {
                    'background-color': '#b1b1b1',
                    'opacity': '1',
                    'background-image': 'linear-gradient(#9c9c9c 2px, transparent 2px), linear-gradient(90deg, #9c9c9c 2px, transparent 2px), linear-gradient(#9c9c9c 1px, transparent 1px), linear-gradient(90deg, #9c9c9c 1px, #b1b1b1 1px)',
                    'background-size': '50px 50px, 50px 50px, 10px 10px, 10px 10px',
                    'background-position': '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
                    'height': '100px',
                    'width': '300px',
                    'border-radius': '5px',
                    'font-size': '13px',
                    'border-width': '4px'
                }
            },
            unlocked() { return true }
        },
        'Hkm-bk2': {
            title() { return "[Common] Unknown blueprint" },
            display() { return "<h3>Collect 3× wood.(1s)" },
            canClick() { return false },
            style() {
                return {
                    'background-color': '#b1b1b1',
                    'opacity': '1',
                    'background-image': 'linear-gradient(#9c9c9c 2px, transparent 2px), linear-gradient(90deg, #9c9c9c 2px, transparent 2px), linear-gradient(#9c9c9c 1px, transparent 1px), linear-gradient(90deg, #9c9c9c 1px, #b1b1b1 1px)',
                    'background-size': '50px 50px, 50px 50px, 10px 10px, 10px 10px',
                    'background-position': '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
                    'height': '100px',
                    'width': '300px',
                    'border-radius': '5px',
                    'font-size': '13px',
                    'border-width': '4px'
                }
            },
            unlocked() { return true }
        },
        'Hkm-bk3': {
            title() { return "[Transcendent] Unknown blueprint" },
            display() { return "<h3>Collect 10,000× cobalt.(1s)" },
            canClick() { return false },
            style() {
                return {
                    'background-color': 'cyan',
                    'opacity': '1',
                    'background-image': 'linear-gradient(#00dddd 2px, transparent 2px), linear-gradient(90deg, #00dddd 2px, transparent 2px), linear-gradient(#00dddd 1px, transparent 1px), linear-gradient(90deg, #00dddd 1px, #00eeee 1px)',
                    'background-size': '50px 50px, 50px 50px, 10px 10px, 10px 10px',
                    'background-position': '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
                    'height': '100px',
                    'width': '300px',
                    'border-radius': '5px',
                    'font-size': '13px',
                    'border-width': '4px'
                }
            },
            unlocked() { return true }
        },
    },
    effect() {
        if (!hasMilestone('Hkm', 'Hkm-1')) return n(1)
        let eff = n(2).mul(player.Hkm.points.root(hasUpgrade('Hkm', 'Hkm-2') ? 1 : 2))
        if (hasMilestone('Hkm', 'Hkm-1')) eff = eff.mul(tmp.Ain.effect)
        if (player.Hkm.storyUnlocked >= 2) eff = eff.mul(tmp.Hkm.timeTheoremEff)
        if (hasGrid('Hkm', 102)) eff = eff.mul(getEffect('', 102))
        if (hasGrid('Hkm', 202)) eff = eff.mul(getEffect('', 202))
        if (hasGrid('Hkm', 302)) eff = eff.mul(getEffect('', 302))
        if (hasGrid('Hkm', 402)) eff = eff.mul(getEffect('', 402))
        if (hasGrid('Hkm', 502)) eff = eff.mul(getEffect('', 502))
        return eff
    },
    challenges: {
        'Hkm-bk1': {
            name() { return "Backward Clock " + ((this.locked()) ? '(Locked)' : "(Inactive)") },
            text() { return "♀" },
            locked() { return player.Hkm.points.lt('1e225') || player.points.lt('1e4050') || player.Hkm.timeEnergy.lt('1e167') },
            exp: "",
            color: 'grey',
            completionLimit: 1,
            // Success condition: having built at least one Backward Clock.
            canComplete() { return (player.Hbc.resources['backward_clock'] || 0) >= 1 },
            challengeDescription() {
                let desc = "↑↑Click the symbol of current saphirah to start rebuilding the backward clock!<br>——————————————————<br>You have 10 minutes to craft a Backward Clock in the crafting minigame."
                return desc
            },
            style() {
                if (!this.locked()) return { 'background-color': '#888888', 'box-shadow': '0px 0px 3px 3px #888888', 'height': '400px' }
                else return { 'background-color': '#444444', 'height': '400px' }
            },
            onEnter() {
                hbcInit()
                showTab('Hbc')
            },
            onExit() {
                if (player.tab == 'Hbc') showTab('Hkm')
            },
        },
    },
    tabFormat: {
        'Time Machine': {
            content: [
                'main-display',
                'prestige-button',
                'blank',
                ['display-text', function () { if (player.Hkm.points.lt(10)) return '<h4>' + quickColor("[Hints] Reach 1e20 memory crystals and 1e330 stellar points to reset for 1 hokma point. You will LOSE ALL PROGRESS IN THE KETHER LAYER!!", 'grey') }],
                'blank',
                'milestones',
            ]
        },
        'Silver Moon Lake': {
            content: [
                'main-display',
                ["row", [["upgrade", "Hkm-1"], ["upgrade", "Hkm-2"], ["upgrade", "Hkm-3"], ["upgrade", "Hkm-4"], ["upgrade", "Hkm-5"]]],
                ["row", [["upgrade", "Hkm-6"], ["upgrade", "Hkm-7"], ["upgrade", "Hkm-8"], ["upgrade", "Hkm-9"], ["upgrade", "Hkm-10"]]],
                ["row", [["upgrade", "Hkm-11"], ["upgrade", "Hkm-12"], ["upgrade", "Hkm-13"], ["upgrade", "Hkm-14"], ["upgrade", "Hkm-15"]]],
            ],
            unlocked() { return player.Hkm.storyUnlocked >= 2 },
        },
        "Time-Space Grid": {
            content: [
                ["row", [["buyable", "Hkm-t1"], ["buyable", "Hkm-t2"], ["buyable", "Hkm-t3"]]],
                'blank',
                ['display-text', function () { return '<h4>Total compressors: ' + quickBigColor(formatWhole(tmp.Hkm.totalCompressor), 'grey') + ' , They are generating ' + quickBigColor('+' + format(tmp.Hkm.compressorEff), 'grey') + ' time energy per second.' }],
                ['bar', 'Hkm-t1'],
                ['display-text', function () { return '<h4>Unused time theorems: ' + quickBigColor(formatWhole(player.Hkm.timeTheorem), 'grey') + ' , This provides a ' + quickBigColor('×' + format(tmp.Hkm.timeTheoremEff), 'grey') + ' effect to Hokma’s effect.' }],
                ['display-text', function () { return '<h4>Time-Space grid strength: ' + quickBigColor(format(tmp.Hkm.gridStrength.mul(100)) + "%", 'grey') + ' , Influence all gridable effect and increases over time after respec.' }],
                'blank',
                ['clickable', 'Hkm-tr1'],
                'blank',
                'grid',
            ],
            unlocked() { return player.Hkm.storyUnlocked >= 2 },
            buttonStyle() { return { 'background': 'grey', 'color': 'black', 'box-shadow': '2px 2px 2px grey' } }
        },
        "Time Foam": {
            content: [
                ['display-text', function () { return '<h4>You have ' + quickBigColor(formatWhole(player.Hkm.foams), '#555') + ' time foams. This provides a ' + quickBigColor('×' + format(tmp.Hkm.foamEff1), '#555') + ' to essence and kether points gain, as well as giving ' + quickBigColor('+' + formatWhole(tmp.Hkm.foamEff2) + "/sec", '#f00') + ' Ne-box per second.(Can be transfered to Pe-Box by time compressors)' }],
                ['display-text', function () { return '<h4>Your time compressors are transfering ' + quickBigColor('+' + formatWhole(tmp.Hkm.boxGain) + '/sec', 'turquoise') + ' Pe-Boxes from Ne-Boxes per second.' }],
                "blank",
                ['clickable', 'Hkm-f1'],
                "blank",
                ['display-text', function () { return '<h4>You have ' + quickBigColor(formatWhole(player.Hkm.PeBox), 'turquoise') + ' Pe-Boxes. Raised to a power of ' + quickBigColor(format(tmp.Hkm.PeBoxExp), 'turquoise') + ', translated to a ' + quickBigColor('×' + format(tmp.Hkm.PeBoxEff), 'turquoise') + ' boost to hokma points gain.' }],
                ['display-text', function () { return '<h4>You have ' + quickBigColor(formatWhole(player.Hkm.NeBox), 'red') + ' Ne-Boxes, nerf the effect of Pe-Box to ' + quickBigColor(format(tmp.Hkm.NeBoxEff.mul(100)) + '%', 'red') }],
                ['display-text', function () { if (hasUpgrade('Ktr', 'Ktr-21')) return '<h4>You have ' + quickBigColor(formatWhole(tmp.Hkm.Sebox), 'yellow') + ' Se-Boxes, itself multiplies the 1st effect of foam and reduce the negative effect of Ne-box.' }],
                ['bar', 'Hkm-f1'],
                ["row", [["buyable", "Hkm-f1"], ["buyable", "Hkm-f2"], ["buyable", "Hkm-f3"]]],
                ["row", [["buyable", "Hkm-f4"], ["buyable", "Hkm-f5"], ["buyable", "Hkm-f6"]]],
            ],
            unlocked() { return player.Hkm.storyUnlocked >= 6 },
            buttonStyle() { return { 'background': '#666666', 'color': 'black', 'box-shadow': '2px 2px 2px #666666' } }
        },
        "Eternal Battery": {
            content: [
                ['display-text', function () { return '<h4>You have ' + quickBigColor(formatWhole(getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3'))), GlowingColor('#ffaa00', 10, '#ffdd00')) + ' eternal batteries, dividing the cost of all foams by ' + quickBigColor('/' + format(tmp.Hkm.BatteryEff1), GlowingColor('#ff8800', 10, '#ffaa00')) + ', as well as giving ' + quickBigColor('×' + formatWhole(tmp.Hkm.BatteryEff2), GlowingColor('#ff6600', 10, '#ff8800')) + ' to essence and kether points gain.' }],
                ["row", [["buyable", "Hkm-b1"], ["buyable", "Hkm-b2"], ["buyable", "Hkm-b3"]]],
                ["row", [["clickable", "Hkm-b1"], ["clickable", "Hkm-b2"], ["clickable", "Hkm-b3"]]],
                'blank',
                ["row", [["clickable", "Hkm-fb-1-1"], ["clickable", "Hkm-fb-1-2"], ["clickable", "Hkm-fb-1-3"], ["buyable", "Hkm-fb-1-4"]]],
                ["clickable", "Hkm-fbl-2"],
                ["row", [["clickable", "Hkm-fb-2-1"], ["clickable", "Hkm-fb-2-2"], ["clickable", "Hkm-fb-2-3"], ["buyable", "Hkm-fb-2-4"]]],
                ["clickable", "Hkm-fbl-3"],
                ["row", [["clickable", "Hkm-fb-3-1"], ["clickable", "Hkm-fb-3-2"], ["clickable", "Hkm-fb-3-3"], ["buyable", "Hkm-fb-3-4"]]],
                ["clickable", "Hkm-fbl-4"],
                ["row", [["clickable", "Hkm-fb-4-1"], ["clickable", "Hkm-fb-4-2"], ["clickable", "Hkm-fb-4-3"], ["buyable", "Hkm-fb-4-4"]]],
            ],
            unlocked() { return player.Hkm.storyUnlocked >= 10 },
            buttonStyle() { return { 'background': GlowingColor('#ffaa00', 10, '#ffdd00'), 'color': 'black', 'box-shadow': '2px 2px 2px orange', 'border-color': 'orange' } }
        },
        "Backward Clock": {
            content: [
                ['row', [["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>' }],
                ['column', ["blank", ["clickable", 'Hkm-bk1'], ["clickable", 'Hkm-bk2'], ["clickable", 'Hkm-bk3'], ["clickable", 'Hkm-bk4']]],
                    "blank",
                ],
                    {
                        "color": "white",
                        "width": "300px",
                        "height": "400px",
                        "border-color": "#FFFFFF",
                        "border-width": "3px",
                    },
                ], ['challenge', 'Hkm-bk1']]],
            ],
            unlocked() { return player.Hkm.storyUnlocked >= 15 },
            buttonStyle() {
                return {
                    'background-color': '#b1b1b1', 'opacity': '1', 'background-image': 'linear-gradient(30deg, #9e9e9e 12%, transparent 12.5%, transparent 87%, #9e9e9e 87.5%, #9e9e9e), linear-gradient(150deg, #9e9e9e 12%, transparent 12.5%, transparent 87%, #9e9e9e 87.5%, #9e9e9e), linear-gradient(30deg, #9e9e9e 12%, transparent 12.5%, transparent 87%, #9e9e9e 87.5%, #9e9e9e), linear-gradient(150deg, #9e9e9e 12%, transparent 12.5%, transparent 87%, #9e9e9e 87.5%, #9e9e9e), linear-gradient(60deg, #9e9e9e77 25%, transparent 25.5%, transparent 75%, #9e9e9e77 75%, #9e9e9e77), linear-gradient(60deg, #9e9e9e77 25%, transparent 25.5%, transparent 75%, #9e9e9e77 75%, #9e9e9e77)', 'background-size': '20px 35px',
                    'background-position': '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px', 'box-shadow': '2px 2px grey', 'border-color': 'grey', 'color': 'black'
                }
            },
            style() {
                return {
                    'background-color': '#111111', 'opacity': '1', 'background-image': 'linear-gradient(30deg, #212121 12%, transparent 12.5%, transparent 87%, #212121 87.5%, #212121), linear-gradient(150deg, #212121 12%, transparent 12.5%, transparent 87%, #212121 87.5%, #212121), linear-gradient(30deg, #212121 12%, transparent 12.5%, transparent 87%, #212121 87.5%, #212121), linear-gradient(150deg, #212121 12%, transparent 12.5%, transparent 87%, #212121 87.5%, #212121), linear-gradient(60deg, #21212177 25%, transparent 25.5%, transparent 75%, #21212177 75%, #21212177), linear-gradient(60deg, #21212177 25%, transparent 25.5%, transparent 75%, #21212177 75%, #21212177)', 'background-size': '20px 35px',
                    'background-position': '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px', 'color': 'black'
                }
            }
        },
    }
})

function hokmaStory() {
    player.Hkm.newStory = false

    // Initialize pageCount if it doesn't exist
    if (player.Hkm.pageCount === undefined) {
        player.Hkm.pageCount = 1
    }

    // Calculate pagination
    const totalPages = Math.ceil(TOTAL_HOKMA_STORIES / STORIES_PER_PAGE)
    const currentPage = Math.max(1, Math.min(player.Hkm.pageCount, totalPages))
    const startStory = (currentPage - 1) * STORIES_PER_PAGE + 1
    const endStory = Math.min(currentPage * STORIES_PER_PAGE, TOTAL_HOKMA_STORIES)

    // Build buttons object dynamically
    let buttons = {}
    let buttonIndex = 1

    // Previous button (visible on page 2+)
    if (currentPage > 1) {
        buttons[buttonIndex++] = {
            text: `<`,
            onClick() {
                player.Hkm.pageCount--
                hokmaStory() // Refresh the modal
            },
            unlocked() { return true }
        }
    }

    // Story buttons for current page
    for (let storyNum = startStory; storyNum <= endStory; storyNum++) {
        buttons[buttonIndex++] = {
            text: String(storyNum).padStart(2, '0'),
            onClick() {
                player.Hkm.storyShowing = storyNum
            },
            unlocked() {
                // Story 1 is always unlocked, others require storyUnlocked >= storyNum - 1
                return storyNum === 1 || player.Hkm.storyUnlocked >= storyNum - 1
            }
        }
    }

    // Next button (visible on pages before last)
    if (currentPage < totalPages) {
        buttons[buttonIndex++] = {
            text: `>`,
            onClick() {
                player.Hkm.pageCount++
                hokmaStory() // Refresh the modal
            },
            unlocked() { return true }
        }
    }

    Modal.show({
        color: 'gray',
        title() {
            return `<text style='color:gray'>Hokma's Quotes > Story ` + player.Hkm.storyShowing +
                ` (Page ${currentPage}/${totalPages})</text>`
        },
        text() { return tmp.Hkm.storyContent[player.Hkm.storyShowing].text },
        buttons: buttons
    })
}

function getEffect(data, id) {
    let effect = n(0)
    if (id == 101) effect = tmp.Ktr.celestialLevel[4].add(1).pow(4)
    if (id == 201) effect = tmp.Ktr.celestialLevel[1].add(1).pow(5)
    if (id == 301) effect = n(1e12)
    if (id == 401) effect = Decimal.pow(25, player.Ktr.upgrades.length)
    if (id == 501) effect = n(1e52)
    if (id == 102) effect = tmp.Ktr.celestialLevel[3].add(1).pow(4)
    if (id == 202) effect = tmp.Ktr.celestialLevel[0].add(1).pow(5)
    if (id == 302) effect = n(1e14)
    if (id == 402) effect = Decimal.pow(60, player.Ktr.upgrades.length)
    if (id == 502) effect = n(1e68)
    if (id == 103) effect = n(0.03)
    if (id == 203) effect = n(0.05)
    if (id == 303) effect = n(0.075)
    if (id == 403) effect = n(0.09)
    if (id == 503) effect = n(0.11)
    if (id == 104) effect = n(1e4).pow(hasGrid('Hkm', 404) ? getEffect('', 404) : 1)
    if (id == 204) effect = Decimal.pow(7, tmp.Hkm.totalGrid).min(1e9)
    if (id == 304) effect = player.points.add(1).log10().pow(3)
    if (id == 404) effect = n(3)
    if (id == 504) effect = Decimal.pow(12, player.Ktr.upgrades.length)
    if ((id % 100 != 3) && (id % 100 != 5)) effect = effect.pow(tmp.Hkm.gridStrength)
    if (id % 100 == 5) effect = n(1.05)
    if (id == 404) effect = effect.min(6)
    return effect
}

function getProfix(data, id) {
    let profix = '×'
    if (id % 100 == 3) profix = '+'
    if (id == 104) profix = '/'
    if (id == 404 || (id % 100 == 5)) profix = '^'
    return profix
}

function batteryReset() {
    if (hasAchievement('Ain', 'Hkm-20')) return
    for (var i = 1; i <= 6; i++) {
        setBuyableAmount('Hkm', 'Hkm-f' + i, n(0))
    }
    player.Hkm.foams = n(0)
    player.Hkm.PeBox = n(0)
    player.Hkm.NeBox = n(0)
    player.Hkm.timeEnergy = n(0)
}

function minBatteryLevel() {
    return getBuyableAmount('Hkm', 'Hkm-b1').min(getBuyableAmount('Hkm', 'Hkm-b2')).min(getBuyableAmount('Hkm', 'Hkm-b3'))
}