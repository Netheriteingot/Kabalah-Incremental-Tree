addLayer("Ktr", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { return "Ktr<sup>" + player.Ktr.storyUnlocked }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            memory: new Decimal(0),
            stellar: new Decimal(0),
            stellarFreeze: new Decimal(0),
            stallar: new Decimal(0), //compatibility
            stallarFreeze: new Decimal(0), //compatibility
            ark: new Decimal(0),
            fuel: new Decimal(0),
            totalFuel: new Decimal(0),
            storyUnlocked: 0,
            storyShowing: 1,
            newStory: false,
            distant: false,
            remote: false,
            solarLayer: 0,
            solarPower: [n(0), n(0), n(0), n(0), n(0), n(0)],
            universalTime: n(0),
            realTime: n(0),
            timeWrap: n(1),
            memoryCrystal: n(0),
            gateLayer: 0,
            content: '',
            gate1: 0,
            lastCrystal: n(0),
            resetedMemory: false,
            respeced: false,
            posk1: 0,
            posk2: 0,
            infinityPoint: 0,
        }
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('Hkm', 'Hkm-2') && resettingLayer == 'Hkm') keep.push('upgrades')
        if (hasMilestone('Hkm', 'Hkm-7') && resettingLayer == 'Hkm') keep.push('memoryCrystal')
        if (hasMilestone('Hkm', 'Hkm-8') && resettingLayer == 'Hkm') keep.push('distant')
        if (hasMilestone('Hkm', 'Hkm-8') && resettingLayer == 'Hkm') keep.push('remote')
        if (hasMilestone('Hkm', 'Hkm-12') && resettingLayer == 'Hkm') keep.push('buyables')
        if (hasMilestone('Hkm', 'Hkm-12') && resettingLayer == 'Hkm') keep.push('ark')
        if (hasMilestone('Hkm', 'Hkm-12') && resettingLayer == 'Hkm') keep.push('fuel')
        if (hasMilestone('Hkm', 'Hkm-12') && resettingLayer == 'Hkm') keep.push('totalFuel')
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    resetsNothing() {
        return player.Ktr.storyUnlocked >= 9
    },
    celestialLevel() {
        let level = [n(0), n(0), n(0), n(0), n(0), n(0)]
        for (var i = 0; i <= 5; i++) {
            level[i] = player.Ktr.solarPower[i].add(1).log(tmp.Ktr.celestialRoot[i]).floor()
        }
        if (level[0].gte(100)) level[0] = n(100)
        return level
    },
    arkReq() {
        return [0, 200, 10000, 100000, 2e6, 1e8, 1e10, 4e12, 4e15, 4e17, 4e20]
    },
    arkBonusReq() {
        return [2, 3, 4, 5, 6, 7, 8, 14, 22, 31, 99999]
    },
    arkFullReq() {
        if (player.Ktr.ark.lt(10)) req = n(tmp.Ktr.arkReq[player.Ktr.ark.add(1)])
        if (player.Ktr.ark.gte(10) && player.Ktr.ark.lt(20)) req = new Decimal(2500).pow(player.Ktr.ark.sub(10)).mul(1e19)
        if (player.Ktr.ark.gte(20) && player.Ktr.ark.lt(30)) req = new Decimal(2.5e6).pow(player.Ktr.ark.sub(19)).mul(1e48)
        if (player.Ktr.ark.gte(30) && player.Ktr.ark.lt(40)) req = new Decimal(7e9).pow(player.Ktr.ark.sub(29)).mul(1e110)
        if (player.Ktr.ark.gte(40) && player.Ktr.ark.lt(80)) req = new Decimal(1e25).pow(player.Ktr.ark.sub(39)).mul(1e210)
        if (player.Ktr.ark.gte(80)) req = new Decimal(1e55).pow(player.Ktr.ark.sub(79)).mul('1e1050')
        if (tmp.Ktr.celestialLevel[1].gte(1)) req = req.div(tmp.Ktr.clickables['Ktr-r-c2'].effect1)
        if (hasAchievement('Ain', 'Hkm-14')) req = req.div(buyableEffect('Hkm', 'Hkm-f1'))
        return n(req)
    },
    stellarEff() {
        let eff = player.Ktr.stellar.add(2.7).log(2.7)
        if (tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[5].start)) eff = eff.pow(4.5)
        if (hasUpgrade('Hkm', 'Hkm-8')) eff = player.Ktr.stellar.add(1).pow(0.05)
        return eff
    },
    solarLayer() {
        let layer = ["Milky Way System", "Local Group of Galaxies", "Virgo Supercluster", "Observable Universe", "Multiverse"]
        return layer
    },
    solarReq() {
        return [1e52, 5e67, 1e150, 1e9999]
    },
    solarBoost() {
        return [1, 1000, 1e6, 1e18]
    },
    solarColor() {
        return ['lavender', '#c999ff', '#8619ff', '#480099']
    },
    celestialGain() {
        return [tmp.Ktr.solarEnergy.root(5).div(10).mul(tmp.Ktr.celestialBoost), tmp.Ktr.solarEnergy.root(10).div(1300).mul(tmp.Ktr.celestialBoost), tmp.Ktr.solarEnergy.root(15).div(1e4).mul(tmp.Ktr.celestialBoost), tmp.Ktr.solarEnergy.root(22).div(1e7).mul(tmp.Ktr.celestialBoost), tmp.Ktr.solarEnergy.root(30).div(1e8).mul(tmp.Ktr.celestialBoost), tmp.Ktr.solarEnergy.root(40).div(1e12).mul(tmp.Ktr.celestialBoost)]
    },
    celestialRoot() {
        return [5, 9, 10, 12, 25, 40]
    },
    celestialBoost() {
        let boost = n(1)
        if (player.Ktr.solarPower[0].gte(1)) boost = boost.mul(tmp.Ktr.clickables['Ktr-r-c1'].effect1)
        if (player.Ktr.solarPower[2].gte(1)) boost = boost.mul(tmp.Ktr.clickables['Ktr-r-c3'].effect1)
        if (player.Ktr.solarPower[4].gte(1)) boost = boost.mul(tmp.Ktr.clickables['Ktr-r-c5'].effect1)
        if (getBuyableAmount('Ktr', 'Ktr-s-d4').gte(1)) boost = boost.mul(buyableEffect('Ktr', 'Ktr-s-d4'))
        if (player.Ktr.ark.gte(30)) boost = boost.mul(5).mul(Decimal.pow(1.2, player.Ktr.ark.sub(30)))
        if (tmp.Ktr.memoryLevel.gte(75)) boost = boost.mul(10)
        return boost
    },
    celestialNext() {
        let next = [n(0), n(0), n(0), n(0), n(0), n(0)]
        for (var i = 0; i <= 5; i++) {
            next[i] = Decimal.pow(tmp.Ktr.celestialRoot[i], tmp.Ktr.celestialLevel[i].add(1)).sub(1)
        }
        return next
    },
    celestialProgress() {
        let progress = [n(0), n(0), n(0), n(0), n(0), n(0)]
        for (var i = 0; i <= 5; i++) {
            progress[i] = Decimal.div(player.Ktr.solarPower[i], tmp.Ktr.celestialNext[i]).mul(100)
        }
        return progress
    },
    celestialPerSec() {
        let persec = [n(0), n(0), n(0), n(0), n(0), n(0)]
        for (var i = 0; i <= 5; i++) {
            persec[i] = Decimal.div(tmp.Ktr.celestialGain[i], tmp.Ktr.celestialNext[i]).mul(100)
        }
        return persec
    },
    solarEnergy() {
        let gain = player.Ktr.stellar.pow(0.05).mul(tmp.Ktr.solarBoost[player.Ktr.solarLayer])
        if (player.Ktr.solarPower[0].gte(1)) gain = gain.mul(tmp.Ktr.clickables['Ktr-r-c1'].effect1)
        if (player.Ktr.solarPower[2].gte(1)) gain = gain.mul(tmp.Ktr.clickables['Ktr-r-c3'].effect1)
        if (player.Ktr.solarPower[4].gte(1)) gain = gain.mul(tmp.Ktr.clickables['Ktr-r-c5'].effect1)
        if (getBuyableAmount('Ktr', 'Ktr-s-d4').gte(1)) gain = gain.mul(buyableEffect('Ktr', 'Ktr-s-d4'))
        if (getBuyableAmount('Ktr', 'Ktr-s-d5').gte(1)) gain = gain.mul(buyableEffect('Ktr', 'Ktr-s-d5'))
        if (player.Ktr.ark.gte(30)) gain = gain.mul(5).mul(Decimal.pow(1.2, player.Ktr.ark.sub(30)))
        if (tmp.Ktr.memoryLevel.gte(42)) gain = gain.mul(100)
        if (tmp.Ktr.memoryLevel.gte(75)) gain = gain.mul(10)
        if (hasAchievement('Ain', 'Hkm-14')) gain = gain.mul(buyableEffect('Hkm', 'Hkm-f3'))
        return gain
    },
    solarEff() {
        let eff = tmp.Ktr.solarEnergy.add(1).pow(0.5)
        if (player.Ktr.storyUnlocked >= 9) eff = eff.mul(player.Ktr.memoryCrystal.add(1).pow(2))
        return eff
    },
    arkEff() {
        let eff = Decimal.pow(n(2).add(player.Ktr.ark.gte(5) ? buyableEffect('Ktr', 'Ktr-s-d2') : 0), Decimal.pow(player.Ktr.ark, 1.2))
        if (player.Ktr.remote) eff = eff.mul(tmp.Ktr.solarEff)
        return eff
    },
    gateEff() {
        let power = n(0.05)
        power = power.mul(player.Ktr.realTime.add(1).log10().min(4))
        if (layers.Ktr.buyables['Ktr-g-h2'].enabled() && player.Ktr.storyUnlocked >= 9) power = power.add(0.05)
        if (layers.Ktr.buyables['Ktr-g-h3'].enabled() && player.Ktr.storyUnlocked >= 9) power = power.mul(2)
        return power
    },
    antimatter() {
        if (hasMilestone('Hkm', 'Hkm-6')) return n(0)
        let antimatter = Decimal.pow(2, player.Ktr.universalTime.sub(10)).sub(1).max(0).min(n('1.7977e308'))
        return antimatter
    },
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "kether points", // Name of prestige currency
    baseResource: "essences", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() { return player.Ktr.ark.gte(2) ? 1 : 0 },
    ArkDescs: {
        2: "unlock red dwarf and gain 1 extra brown dwarf.",
        3: "gain a half of red dwarf and passive gain 100% kether points on reset.",
        4: "unlock orange dwarf.",
        5: "gain a half of red dwarf.",
        6: "unlock yellow dwarf.",
        7: "every brown dwarf also gives 0.05 extra yellow dwarves.",
        8: "keep brown & yellow dwarf on reset.",
        14: "unlock white dwarf.",
        22: "Unlock a row of new distant space upgrades. Reset for ark won't longer reset your stars.",
        31: "Boost all resource in remote space by ×5, and every ark after this increases this number by ×1.2.",
        99999: "???",
    },
    memoryBonus: {
        0: {
            desc: 'Essence gain',
            effect() { return Decimal.pow(2, tmp.Ktr.memoryLevel) },
            start: n(1),
            prev: '×',
            color: "#FFFFFF"
        },
        1: {
            desc: 'Kether points gain',
            effect() {
                let eff = Decimal.pow(n(1.6).add(tmp.Ktr.memoryLevel.lt(45) && tmp.Ktr.memoryLevel.gte(15) ? 0.2 : 0), tmp.Ktr.memoryLevel.sub(2))
                if (tmp.Ktr.memoryLevel.gte(15)) eff = eff.pow(2)
                if (eff.gte(1e12)) softcap(eff, 'root', n(1e12), 3)
                return eff
            },
            start: n(3),
            prev: '×',
            color: "#FFFFFF"
        },
        2: {
            desc: 'Kether points gain exp',
            effect() { return n(1.03) },
            start: n(7),
            prev: '^',
            color: "#FFFFFF"
        },
        3: {
            desc: 'Essences gain exp',
            effect() { return n(1.02) },
            start: n(15),
            prev: '^',
            color: "#FFFFFF"
        },
        4: {
            desc: 'Ktr-3 effect',
            effect() { return n(4) },
            start: n(25),
            prev: '^',
            color: "lightyellow"
        },
        5: {
            desc: 'Stellar effect',
            effect() { return n(4.5) },
            start: n(50),
            prev: '^',
            color: "lightyellow"
        },
        6: {
            desc: 'Base of Ktr-s-d4',
            effect() { return n(0.5) },
            start: n(65),
            prev: '+',
            color: "lavender"
        },
        7: {
            desc: 'stellar effect',
            effect() { return n(4.5) },
            start: n(101),
            prev: '^',
            color: "lightyellow"
        },
    },
    storyContent: {
        1: {
            text() {
                let text = `<text style='color:#FFFFFF; font-size: 30px; text-shadow: 2px 2px 7px white'>My life's pursuit has ever been the sublime beauty of feeling and the pure knowledge of reason.</text><br>
                <text style='color:#FFFFFF; font-size: 30px; text-shadow: 2px 2px 7px white'>I wish to stand at the city's highest peak and gaze once more upon the Miracle Continent beneath the stars.
                I wish to remember forever how beautiful it was. — Kether</text><br><br>
                <text style='color: #999999'>[Illustration] In the year 680 of the Lunar Calendar, the Miracle Continent was destroyed. To change this fate, Ain traveled back through time to the Miracle Continent. Through countless cycles and attempts, she came to understand that her destiny is one of endless repetition — yet never able to alter the fate of the Miracle Continent. To break this outcome, she paid the price of forgetting her own predetermined destiny, summoning a fragment of your consciousness into the spiritual world through the Heart Gate, rebuilding the order of the Kabbalah Tree, and attempting to defy the trajectory of fate itself — Preface to the Kabbalah Incremental Tree</text><br>
                <text style='color:magenta'>[Ain] Let me think once more... I have traveled through time and space, back to the Miracle Continent of 680 years ago... I passed through a door, and there I met...</text><br>`
                if (player.Ktr.storyUnlocked < 1) text += `<br><br>
                <i style='color: #444444'>[Locked] Reach 1 kether point to continue. (Tips: Press the prestige button in the kether layer to gain kether points. You will lose all your essence.)</i>`
                if (player.Ktr.storyUnlocked >= 1) text += `
                <text style='color:magenta'>[Ain] You are the one I met at the Heart Gate. Our consciousnesses are now connected. You can see all that unfolds upon the Miracle Continent.</text><br>
                <text style='color:magenta'>[Ain] Perhaps because we come from the same world, we can...</text><br>`
                return text
            }
        },
        2: {
            text() {
                let text = `<text style='color:#999999'>[Illustration] What unfolded before Ain's eyes was a strange and unfamiliar city.</text><br>
                <text style='color:magenta'>[Ain] Crown Town Hospital... where is this place?</text><br>
                <text style='color:magenta'>[Ain] There is a clothing store ahead. Let us go and inquire about this world first.</text><br>
                <text style='color:#999999'>[Illustration] For reasons she could not explain, a vision of a sea of stars flashed through Ain's mind.</text><br>
                <text style='color:#999999'>[Illustration] In that fleeting instant, she recalled a dream she once held as a child.</text><br>
                <text style='color:#999999'>[Illustration] When she was six years old, she had dreamed of a sea of stars.</text><br>
                <text style='color:#999999'>[Illustration] Upon that sea stood a stargazing platform, and upon that platform, a silent writer amidst the starry seas.</text><br>
                <text style='color:#999999'>[Illustration] His hood concealed his eyes. He reached out with his pen, pointing toward the heavens, and the stars seemed to bend to his will, drifting from their brilliant orbits.</text><br>
                <text style='color:white'>[Kether] This is the only answer. All galaxies are destined for destruction.</text><br>`
                if (player.Ktr.storyUnlocked == 1) text += `<br><br>
                <i style='color: #444444'>[Locked] Have at least 1 kether upgrade to continue. "Upgrade" is a tool that can be purchased using kether points, boosting your production. Each can only be purchased once to take effect.</i>`
                if (player.Ktr.storyUnlocked >= 2) text += `
                <text style='color:#999999'>[Illustration] He did not seem to be speaking to anyone, lost in depicting the vision within his heart.</text><br>
                <text style='color:white'>[Kether] I observed the only outcome, yet left behind a single unpredictable variable. Will the outcome change because of it?</text><br>
                <text style='color:magenta'>[Ain lv.6] Who are you?</text><br>
                <text style='color:white'>[Kether] I am the one who bestowed destiny upon you.</text><br>
                <text style='color:#999999'>[Illustration] For some reason, the memories within this dream suddenly became vividly clear.</text><br>
                <text style='color:#999999'>[Illustration] Ain had not yet gathered herself when suddenly many people entered the clothing store.</text><br>
                <text style='color:#999999'>[Illustration] They had not come to shop. Instead, they surrounded Ain without hesitation.</text><br>
                <text style='color:white'>[Kether-9718] This guest, you are...</text><br>
                <text style='color:white'>[Kether-19] The long-haired girl — is it you? You look so plain... and yet, the one who possesses the power of Sephirah's Shadow.</text><br>
                <text style='color:#999999'>[Illustration] The clothing store doors were shut, two figures standing guard at the entrance, allowing no one to pass.</text><br>
                <text style='color:#999999'>[Illustration] The alluring girl known as Kether-19 stepped toward the power of Sephirah's Shadow.</text><br>`
                return text
            }
        },
        3: {
            text() {
                let text = `<text style='color:magenta'>[Ain] I believe you may be mistaken. I possess no such power.</text><br>
                <text style='color:white'>[Kether-19] Whether you do or not, let us find out!</text><br>
                <text style='color:#999999'>[Illustration] Kether-19 suddenly dragged Ain into the [Battle of Recollection]!!</text><br>
                <text style='color:#999999'>[Illustration] This time, Ain felt a different state of mind than before. A deeper power stirred within her, and a strange voice echoed in her heart.</text><br>
                <text style='color:white'>[Kether] With your memories lost, what will you fight with?</text><br>`
                if (player.Ktr.storyUnlocked == 2) text += `<br><br>
                <i style='color: #444444'>[Locked] Reach 200,000 essence to continue. This may require a much stronger upgrade effect.</i>`
                if (player.Ktr.storyUnlocked >= 3) text += `
                <text style='color:#999999'>[Illustration] The world before Ain twisted and dissolved. She found herself standing amidst a sea of stars. She gazed around in bewilderment — it felt so achingly familiar.</text><br>
                <text style='color:magenta'>[Ain] Where is this?</text><br>
                <text style='color:white'>[Kether] Your spiritual world — the true battlefield of the Battle of Recollection.</text><br>
                <text style='color:white'>[Kether] The true Battle of Recollection is a contest of memories and emotions woven into essence. The power of memories from within can sway the outcome of the battle. I am but a memory projection, not your teacher. Now, do you remember? The true power concealed within memory is the key to turning the tide.</text><br>
                <text style='color:#999999'>[Illustration] Ain returned to the Battle of Recollection and, drawing upon the strength of her memories, defeated the woman. After the battle, the starry sea dissolved and all returned to tranquility — yet the memories hidden within Ain's heart grew ever clearer.</text><br>
                <text style='color:white'>[Kether-9718] The power of memory can reshape a person's spiritual world. Can we say that Kether-19's spiritual world has been altered? Could the rumor be true?</text><br>
                <text style='color:#999999'>[Illustration] Ain murmured to herself. All that was once beautiful would vanish into nothingness. Civilization would fade as though it had never existed, leaving not a trace behind. And all of this, because...</text><br>
                <text style='color:#999999'>[Illustration] "The story of the Miracle Continent must come to an end." Kether stood in the distance, his silver hair stirred by the winds of apocalypse, pronouncing final judgment upon the Miracle Continent's destruction.</text><br>`
                return text
            }
        },
        4: {
            text() {
                let text = `<text style='color:magenta'>[Ain] No... this cannot be true. The Miracle Continent has been destroyed — I witnessed its destruction with my own eyes.</text><br>`
                if (player.Ktr.storyUnlocked == 3) text += `<br><br>
                <i style='color: #444444'>[Locked] Reach 200 stellar points to continue. Create a giant gas planet to begin collecting them.</i>`
                if (player.Ktr.storyUnlocked >= 4) text += `
                <text style='color:white'>[Kether] This world is steeped in conflict and chaos. On the level of memory, everyone is endowed with the ability to reshape the memories of others. Your desires lie hidden within your heart, your dreams seem forever beyond reach — all because of your weakness. Come, let me grant you the power to change this.</text><br>
                <text style='color:#999999'>[Illustration] Countless memories flashed through Ain's mind — the refusal to lose more, the inability to face fate any longer, the rejection of a predetermined outcome!</text><br>
                <text style='color:#999999'>[Illustration] Kether's stargazing platform appeared before Ain. The seawater seemed to follow his guidance, surging upward to eclipse the sunlight from the sky.</text><br>
                <text style='color:magenta'>[Ain] It is you, Kether.</text><br>
                <text style='color:white'>[Kether] I told you before — Sephirah's Shadow is but a memory projection.</text><br>
                <text style='color:magenta'>[Ain] Sephirah's Shadow?</text><br>
                <text style='color:white'>[Kether] I exist through your soul. I am nothing more than a memory adrift in an endless ocean of memories.</text><br>
                <text style='color:magenta'>[Ain] Why did you choose me?</text><br>
                <text style='color:white'>[Kether] Fate chose you. I am merely an observer of fate.</text><br>
                <text style='color:magenta'>[Ain] An observer of fate? It is you who manipulated the fate of the Miracle Continent, steering it toward destruction!</text><br>
                <text style='color:white'>[Kether] Why do you see it that way?</text><br>
                <text style='color:magenta'>[Ain] I saw it with my own eyes!</text><br>
                <text style='color:white'>[Kether] What you see is not the truth. Go and seek the answer you desire within my memories.</text><br>`
                if (player.Ktr.storyUnlocked == 4) text += `<br><br>
                <i style='color: #444444'>[Locked] Build 3 arks to continue. Each time you build an ark, you will lose all stars as well as stellar points.</i>`
                if (player.Ktr.storyUnlocked >= 5) text += `
                <text style='color:white'>[Kether] Are you saying my calculations are wrong?</text><br>
                <text style='color:magenta'>[Ain] I will not question your calculations. I am the insignificance you speak of — I cannot see the truth you describe in this starry sky. I am the foolishness you speak of — and I will never surrender, not until the very end of destruction.</text><br>`
                return text
            }
        },
        5: {
            text() {
                let text = `<text style='color:magenta'>[Ain] You see all living beings as ants. Yet the joy of each passing day and the hope for tomorrow are fleeting treasures that all living beings hold dear.</text><br>
                <text style='color:white'>[Kether] But no matter what, destruction will come in the end.</text><br>
                <text style='color:magenta'>[Ain] Then I will go and change the future you have written!</text><br>
                <text style='color:#999999'>[Illustration] Upon the distant horizon, a thread of white appeared, and the rising stars climbed high.</text><br>
                <text style='color:magenta'>[Ain] This is the fate you chose for me. You want me to break it, do you not? Teacher... thank you for telling me this. I must go now.</text><br>
                <text style='color:white'>[Kether] In this era, you are like a pebble cast into boundless waters. I cannot tell whether you will stir a vortex or be silently swallowed whole.</text><br>
                <text style='color:#999999'>[Illustration] The ocean and the stars faded, interweaving into Ain's garments. Stars shook free — clothes designed by Kether.</text><br>
                <text style='color:white'>[Kether] Use their power to leave the starry sea.</text><br>
                <text style='color:#999999'>[Illustration] The stars fell away, the tide receded, and the first ray of morning light fell upon Ain's sleeping face. Her lashes fluttered, and she opened her eyes.</text><br>
                <text style='color:#999999'>[Illustration] In the world of starry seas, the stargazing platform still floated. The starry seas had not yet vanished — but Ain could no longer see them.</text><br>
                <text style='color:white'>[Kether] The orbits of stars are independent of one another. Their seeming interlock is but an illusion of perspective. Each orbit is the fate of a world.</text><br>
                <text style='color:white'>[Kether] Are you looking for her? She has already returned to the real world.</text><br>`
                if (player.Ktr.storyUnlocked == 5) text += `<br><br>
                <i style='color: #444444'>[Locked] Let the ark reach distant space to continue. Perhaps you need more ark fuel.</i>`
                if (player.Ktr.storyUnlocked >= 6) text += `
                <text style='color:#999999'>[Illustration] Kether seemed to be speaking to himself, yet you sensed that this man could feel your presence.</text><br>
                <text style='color:pink'>[You] Are you speaking to me?</text><br>
                <text style='color:#999999'>[Illustration] Kether did not answer. He set down his pen, and countless star-trails silently glided behind him, falling upon the sea of stars.</text><br>
                <text style='color:white'>[Kether] I chose her. She shall be the unknown in the equation of fate — perhaps able to break the predetermined destiny of the Miracle Continent. And she chose you, to break her own destiny. But to forge a connection through the Heart Gate, she paid a price: she forgot what her destiny was.</text><br>`
                return text
            }
        },
        6: {
            text() {
                let text = `<text style='color:pink'>[You] What is Ain's fate?</text><br>
                <text style='color:white'>[Kether] No matter the attempts, no matter the cost, nothing can be changed. That is her fate. And yet, she chose you.</text><br>
                <text style='color:#999999'>[Illustration] Kether reached out as though touching an invisible "wall," and ripples spread across its surface. Silver-white borders gradually emerged around the wall, studded with crystals like stars. It was a mirror — and Kether stood within it.</text><br>
                <text style='color:pink'>[You] You have not told me yet — how do I leave this place?</text><br>
                <text style='color:white'>[Kether] Through the mirror, your consciousness can reconnect with her spiritual world.</text><br>
                <text style='color:#999999'>[Illustration] Kether vanished from the mirror, and the world within it shifted. The sky and ocean endured, but the stars slowly dimmed and faded, until they were no more.</text><br>
                <text style='color:pink'>[You] Am I within the mirror, or is the mirror within me?</text><br>
                <text style='color:white'>[Kether] Why not find out for yourself?</text><br>
                <text style='color:#999999'>[Illustration] You stepped through the mirror, and a brand-new world unfolded before your eyes.</text><br>`
                if (player.Ktr.storyUnlocked == 6) text += `<br><br>
                <i style='color: #444444'>[Locked] Let the ark reach distant space to continue. Perhaps you need more stellar points.</i>`
                if (player.Ktr.storyUnlocked >= 7) text += `
                <text style='color:#999999'>[Illustration] Upon the vast and tranquil sea floated wondrous structures: a serene garden, a building akin to a museum, and a clock tower whose dials and clocks were set apart. The tracks of a train linked these buildings together like chains.</text><br>
                <text style='color:pink'>[You] Is this the ark Kether spoke of — the vessel that carries all the memories of civilization? What is happening? Were we not in a world of stars?</text><br>
                <text style='color:#999999'>[Illustration] After waking from that dream within the starry sea, all had returned to normal. I wished to understand what connection Sephirah's Shadow held with Kether, so I returned to the ark first.</text><br>
                <text style='color:magenta'>[Ain] I had forgotten — you have never been here before. This is the Sea of Memories in the distant and fathomless sky, the ocean of human memory, bridging different worlds and consciousnesses. The Ark governs the Sea of Memory. After the destruction of the Miracle Continent, I came to the Ark. Through the ark, I can cross back, and thus connect with your consciousness.</text><br>
                <text style='color:white'>[Kether-7] Ain? Fallen_Cat? You've both returned!</text><br>
                <text style='color:white'>[Kether-7] Wow, Fallen_Cat, you're still so soft~</text><br>`
                return text
            }
        },
        7: {
            text() {
                let text = `<text style='color:#999999'>[Illustration] The little girl clung to you tightly and refused to let go. You struggled in vain.</text><br>
                <text style='color:pink'>[You] So, Ain — would you introduce us?</text><br>`
                if (player.Ktr.storyUnlocked == 7) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock all distant space upgrades to continue. That means obtaining at least 21 arks.</i>`
                if (player.Ktr.storyUnlocked >= 8) text += `
                <text style='color:magenta'>[Ain] Ktr-7, one of the ark administrators. She has a brother called Ktr-2. The numbers denote the ranking of their Sephirah Shadow power within the Kether field.</text><br>
                <text style='color:#999999'>[Illustration] Just then, a powerful hand reached down and lifted Ktr-7 into the air. She kicked and struggled vigorously.</text><br>
                <text style='color:white'>[Kether-2] Enough trouble, Ktr-7.</text><br>
                <text style='color:white'>[Kether-7] I wasn't causing any trouble! Put me down, brother!</text><br>
                <text style='color:#999999'>[Illustration] You studied the man behind Ktr-7 — her brother, it seemed, and another administrator of the ark: Ktr-2.</text><br>
                <text style='color:white'>[Kether-2] Ain, I brought you to the Sephirah Shadow Museum earlier. There, all Sephirah Shadows are preserved within mirrors. The power you wielded in your recent battle was one of the Sephirah Shadows — and it appears you can summon them.</text><br>`
                if (player.Ktr.storyUnlocked == 8) text += `<br><br>
                <i style='color: #444444'>[Locked] Unlock The Kether's Heart Gate to continue. This is the ultimate challenge of the Kether layer.</i>`
                if (player.Ktr.storyUnlocked >= 9) text += `
                <text style='color:white'>[Kether-2] I have uncovered some new clues regarding Kether. I will share them with you once I have pieced everything together.</text><br>
                <text style='color:magenta'>[Ain] Thank you, Ktr-2.</text><br>
                <text style='color:white'>[Kether-2] Think nothing of it. I was already searching for answers about Kether.</text><br>
                <text style='color:#999999'>[Illustration] Ain had no wish to linger in the ark. She decided to depart with you first. Kether-2 then led Ain and you to the Heart Gate to return. The Heart Gate stands at the center of the ark, and beneath it lies the "Ark's Heart" — the core that sustains the ark's operation.</text><br>
                <text style='color:white'>[Kether-2] Are you ready, Ain?</text><br>
                <text style='color:magenta'>[Ain] I am ready.</text><br>
                <text style='color:magenta'>[Ain] Let us go. Together, we can surely change the future of this world. With the power that matches us, we shall cross the door of the heart.</text><br>`
                return text
            }
        },
    },
    infoboxes: {
        'Ktr-i1': {
            title: "Recollection Waves",
            body() {
                player.Ktr.content = ''
                for (var i = 0; i <= 999; i++) {
                    if (tmp.Ktr.memoryLevel.gte(layers.Ktr.memoryBonus[i].start)) player.Ktr.content += "[" + i + "]" + layers.Ktr.memoryBonus[i].desc + " " + quickBigColor(layers.Ktr.memoryBonus[i].prev + format(layers.Ktr.memoryBonus[i].effect()), layers.Ktr.memoryBonus[i].color) + "<br>"
                    else {
                        player.Ktr.content += quickColor('Get ' + formatWhole(layers.Ktr.memoryBonus[i].start.sub(tmp.Ktr.memoryLevel)) + ' more recollection depth to unlock a new wave!', 'gray')
                        break
                    }
                }
                return player.Ktr.content
            },
        },
    },
    clickables: {
        'Ktr-s1': {
            title() { return "<h4>Absorb Energy<br>" },
            gain() {
                let gain = n(1)
                if (player.Ktr.ark.gte(1)) gain = gain.mul(tmp.Ktr.arkEff)
                gain = gain.mul(buyableEffect('Ktr', 'Ktr-s1'))
                if (player.Ktr.ark.gte(1)) gain = gain.mul(layers.Ktr.buyables['Ktr', 'Ktr-s3'].effect())
                if (tmp.Ktr.memoryLevel.lt(42) && tmp.Ktr.memoryLevel.gte(15) && !hasAchievement('Ain', 'Hkm-4')) gain = gain.div(100)
                if (tmp.Ktr.memoryLevel.gte(42)) gain = gain.mul(100)
                if (tmp.Ktr.memoryLevel.gte(75)) gain = gain.mul(1000)
                if (player.Ktr.activeChallenge == 'Ktr-g1') gain = gain.pow(tmp.Ktr.gateEff)
                if (player.Ktr.storyUnlocked >= 9 || hasMilestone('Hkm', 'Hkm-6')) gain = gain.mul(player.Ktr.timeWrap)
                if (hasMilestone('Hkm', 'Hkm-1')) gain = gain.mul(tmp.Hkm.effect)
                if (tmp.Ktr.antimatter.gt(player.Ktr.stellar)) gain = n(0)
                return gain
            },
            display() { return "Absorb some stellar energy from your stellars.<br>+" + formatWhole(this.gain()) + ' stellar points until ' + format(player.Ktr.stellarFreeze) + ' sec' },
            canClick() { return player.Ktr.stellarFreeze.lte(0) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px Moccasin', 'background-color': 'lightyellow', 'color': 'black', 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'lightyellow' }
            },
            onClick() {
                player.Ktr.stellarFreeze = tmp.Ktr.stellarFreezeLimit
                player.Ktr.stellar = player.Ktr.stellar.add(this.gain())
            },
        },
        'Ktr-a1': {
            title() { return "<h4>Build +1 Ark<br>" },
            display() { return "Reset your stars and stellar points, but build a new ark, and gain some fuel as well.<br>" + "in ark " + getBonusDesc() + "<br>" + formatWhole(player.Ktr.ark.add(1)) + " fuel" },
            canClick() { return player.Ktr.stellar.gte(tmp.Ktr.arkFullReq) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px white', 'background': `repeating-linear-gradient(90deg, white 0, white 1px, black 0, black 100px)`, "background-position": player.timePlayed % 10 + '% ' + player.timePlayed % 10 + "%", 'background-size': `1000% 1000%`, 'color': 'white', 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'white' }
            },
            onClick() {
                player.Ktr.ark = player.Ktr.ark.add(1)
                player.Ktr.fuel = player.Ktr.fuel.add(player.Ktr.ark)
                player.Ktr.totalFuel = player.Ktr.totalFuel.add(player.Ktr.ark)
                if (player.Ktr.ark.lt(21)) for (var i = 1; i <= 6; i++) {
                    setBuyableAmount('Ktr', 'Ktr-s' + i, n(0))
                }
                player.Ktr.stellar = n(0)
            },
        },
        'Ktr-a2': {
            title() { return "Travel into distant space" },
            display() { return "Requires 15 ark fuel. Unlock distant space upgrades." },
            canClick() { return player.Ktr.fuel.gte(15) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender', 'background': `repeating-linear-gradient(90deg, lavender 0, lavender 1px, black 0, black 100px)`, "background-position": player.timePlayed % 10 + '% ' + player.timePlayed % 10 + "%", 'background-size': `1000% 1000%`, 'color': 'white', 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px' }
                else return { 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'lavender', 'margin-left': '5px' }
            },
            onClick() {
                player.Ktr.distant = true
            },
            unlocked() { return !player.Ktr.distant }
        },
        'Ktr-a3': {
            title() { return "Respec" },
            display() { return "Respec distant space upgrades and take back all fuel." },
            canClick() { return true },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender', 'background': `repeating-linear-gradient(90deg, lavender 0, lavender 1px, black 0, black 100px)`, "background-position": player.timePlayed % 10 + '% ' + player.timePlayed % 10 + "%", 'background-size': `1000% 1000%`, 'color': 'white', 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px' }
                else return { 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'lavender', 'margin-left': '5px' }
            },
            onClick() {
                for (var i = 1; i <= 6; i++) {
                    setBuyableAmount('Ktr', 'Ktr-s-d' + i, n(0))
                }
                player.Ktr.fuel = player.Ktr.totalFuel
                for (var i = 1; i <= 6; i++) {
                    setBuyableAmount('Ktr', 'Ktr-s' + i, n(0))
                }
                player.Ktr.stellar = n(0)
                player.Ktr.respeced = true
            },
            unlocked() { return player.Ktr.distant }
        },
        'Ktr-a4': {
            title() { return "Travel into remote space" },
            display() { return "Requires 2e42 stellar points. Unlock a new tab." },
            canClick() { return player.Ktr.stellar.gte(2e42) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender', 'background': `repeating-linear-gradient(90deg, lavender 0, lavender 1px, black 0, black 100px)`, "background-position": player.timePlayed % 10 + '% ' + player.timePlayed % 10 + "%", 'background-size': `1000% 1000%`, 'color': 'white', 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px' }
                else return { 'height': '200px', 'width': '200px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'lavender', 'margin-left': '5px' }
            },
            onClick() {
                player.Ktr.remote = true
            },
            unlocked() { return player.Ktr.distant && !player.Ktr.remote }
        },
        'Ktr-r1': {
            title() { return "Transition to the cosmic level " + tmp.Ktr.solarLayer[player.Ktr.solarLayer + 1] },
            display() { return "<br>Requires " + format(tmp.Ktr.solarReq[player.Ktr.solarLayer]) + " stellar points. Unlock some new Celestials." },
            canClick() { return player.Ktr.stellar.gte(tmp.Ktr.solarReq[player.Ktr.solarLayer]) },
            style() {
                if (this.canClick()) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset ' + tmp.Ktr.solarColor[player.Ktr.solarLayer + 1], 'background-color': `black`, 'color': 'white', 'height': '150px', 'width': '300px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': tmp.Ktr.solarColor[player.Ktr.solarLayer + 1] }
                else return { 'height': '150px', 'width': '300px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'gray', 'color': 'black', 'border-color': 'lavender', 'margin-left': '5px' }
            },
            onClick() {
                player.Ktr.solarLayer += 1
            },
        },
        'Ktr-r-c1': {
            title() { return "[Ktr-r-c1] Neutron Star Lv." + tmp.Ktr.celestialLevel[0] },
            display() { return format(tmp.Ktr.celestialProgress[0]) + '% to next level' },
            canClick() { return true },
            effect1() {
                let eff = Decimal.pow(1.4, tmp.Ktr.celestialLevel[0])
                if (eff.gte(20000)) eff = softcap(eff, 'root', n(20000), 2.5)
                return eff
            },
            effect2() {
                let eff = Decimal.pow(2, tmp.Ktr.celestialLevel[0].sqrt())
                if (eff.gte(50)) eff = softcap(eff, 'root', n(50), 1.5)
                return eff
            },
            onHold() {
                player.Ktr.solarPower[0] = player.Ktr.solarPower[0].add(tmp.Ktr.celestialGain[0].mul(0.05))
            },
            unlocked() { return player.Ktr.solarLayer >= 1 },
            tooltip() { return quickBackgColor2("[Mass] 22 Msun<br>[Temp.] 900000K", '#c999ff') + '<br><br>Boost solar energy gain and generate extra red dwarf.<br>Effect1: ×' + format(this.effect1()) + "<br>Effect2: +" + format(this.effect2()) + "<br>Hold and gain " + format(tmp.Ktr.celestialPerSec[0]) + "% neutron energy per second." },
            style() {
                return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #c999ff', 'background': `linear-gradient(to right,#c999ff ${format(tmp.Ktr.celestialProgress[0].min(100))}%,black ${format(tmp.Ktr.celestialProgress[0].add(0.25).min(100))}%)`, 'color': 'white', 'min-height': '80px', 'width': '600px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#c999ff' }
            },
        },
        'Ktr-r-c2': {
            title() { return "[Ktr-r-c2] Electroweak star Lv." + tmp.Ktr.celestialLevel[1] },
            display() { return format(tmp.Ktr.celestialProgress[1]) + '% to next level' },
            canClick() { return true },
            effect1() {
                let eff = Decimal.pow(666, tmp.Ktr.celestialLevel[1])
                if (getBuyableAmount('Ktr', 'Ktr-s-d6').gte(1)) eff = eff.pow(buyableEffect('Ktr', 'Ktr-s-d6'))
                if (eff.gte(1e20)) eff = softcap(eff, 'root', n(1e20), 4)
                return eff
            },
            onHold() {
                player.Ktr.solarPower[1] = player.Ktr.solarPower[1].add(tmp.Ktr.celestialGain[1].mul(0.05))
            },
            unlocked() { return player.Ktr.solarLayer >= 1 },
            tooltip() { return quickBackgColor2("[Mass] Undefined Msun<br>[Temp.] 2e16K", '#c999ff') + '<br><br>Lower the requirement of next ark.<br>Effect: /' + format(this.effect1()) + "<br>Hold and gain " + format(tmp.Ktr.celestialPerSec[1]) + "% electroweak energy per second." },
            style() {
                return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #c999ff', 'background': `linear-gradient(to right,#c999ff ${format(tmp.Ktr.celestialProgress[1].min(100))}%,black ${format(tmp.Ktr.celestialProgress[1].add(0.25).min(100))}%)`, 'color': 'white', 'min-height': '80px', 'width': '600px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#c999ff' }
            },
        },
        'Ktr-r-c3': {
            title() { return "[Ktr-r-c3] Quasi-Star Lv." + tmp.Ktr.celestialLevel[2] },
            display() { return format(tmp.Ktr.celestialProgress[2]) + '% to next level' },
            canClick() { return true },
            effect1() {
                let eff = Decimal.pow(1.9, tmp.Ktr.celestialLevel[2])
                if (eff.gte(200)) eff = softcap(eff, 'root', n(200), 1.5)
                return eff
            },
            effect2() {
                let eff = Decimal.pow(2, tmp.Ktr.celestialLevel[2].root(3))
                return eff
            },
            onHold() {
                player.Ktr.solarPower[2] = player.Ktr.solarPower[2].add(tmp.Ktr.celestialGain[2].mul(0.05))
            },
            unlocked() { return player.Ktr.solarLayer >= 2 },
            tooltip() { return quickBackgColor("[Mass] 1000 Msun<br>[Temp.] 100000K", '#8619ff') + '<br><br>Boost solar energy gain and generate extra orange dwarf.<br>Effect1: ×' + format(this.effect1()) + "<br>Effect2: +" + format(this.effect2()) + "<br>Hold and gain " + format(tmp.Ktr.celestialPerSec[2]) + "% quasi-star energy per second." },
            style() {
                return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #8619ff', 'background': `linear-gradient(to right,#8619ff ${format(tmp.Ktr.celestialProgress[2].min(100))}%,black ${format(tmp.Ktr.celestialProgress[2].add(0.25).min(100))}%)`, 'color': 'white', 'min-height': '80px', 'width': '600px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#8619ff' }
            },
        },
        'Ktr-r-c4': {
            title() { return "[Ktr-r-c4] Preon stars Lv." + tmp.Ktr.celestialLevel[3] },
            display() { return format(tmp.Ktr.celestialProgress[3]) + '% to next level' },
            canClick() { return true },
            effect1() {
                let eff = Decimal.mul(5, tmp.Ktr.celestialLevel[3])
                return eff
            },
            onHold() {
                player.Ktr.solarPower[3] = player.Ktr.solarPower[3].add(tmp.Ktr.celestialGain[3].mul(0.05))
            },
            unlocked() { return player.Ktr.solarLayer >= 2 },
            tooltip() { return quickBackgColor("[Mass] Nearly Infinity Msun<br>[Temp.] 1e14K", '#8619ff') + '<br><br>Lower the cost of Ktr-s-d4 and Ktr-s-d5.<br>Effect: -' + format(this.effect1()) + "<br>Hold and gain " + format(tmp.Ktr.celestialPerSec[3]) + "% preon energy per second." },
            style() {
                return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #8619ff', 'background': `linear-gradient(to right,#8619ff ${format(tmp.Ktr.celestialProgress[3].min(100))}%,black ${format(tmp.Ktr.celestialProgress[3].add(0.25).min(100))}%)`, 'color': 'white', 'min-height': '80px', 'width': '600px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#8619ff' }
            },
        },
        'Ktr-r-c5': {
            title() { return "[Ktr-r-c5] Ton-618 Black Hole Lv." + tmp.Ktr.celestialLevel[4] },
            display() { return format(tmp.Ktr.celestialProgress[4]) + '% to next level' },
            canClick() { return true },
            effect1() {
                let eff = Decimal.pow(2.6, tmp.Ktr.celestialLevel[4])
                if (eff.gte(1000)) eff = softcap(eff, 'root', n(1000), 2)
                return eff
            },
            effect2() {
                let eff = Decimal.pow(2, tmp.Ktr.celestialLevel[4].root(5))
                return eff
            },
            onHold() {
                player.Ktr.solarPower[4] = player.Ktr.solarPower[4].add(tmp.Ktr.celestialGain[4].mul(0.05))
            },
            unlocked() { return player.Ktr.solarLayer >= 3 },
            tooltip() { return quickBackgColor("[Mass] 6e10 Msun<br>[Temp.] -273.15K", '#480099') + '<br><br>Boost solar energy gain and generate extra yellow dwarf.<br>Effect1: ×' + format(this.effect1()) + "<br>Effect2: +" + format(this.effect2()) + "<br>Hold and gain " + format(tmp.Ktr.celestialPerSec[4]) + "% black hole-energy per second." },
            style() {
                return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px inset #480099', 'background': `linear-gradient(to right,#480099 ${format(tmp.Ktr.celestialProgress[4].min(100))}%,black ${format(tmp.Ktr.celestialProgress[4].add(0.25).min(100))}%)`, 'color': 'white', 'min-height': '80px', 'width': '600px', 'border-radius': '5px', 'font-size': '13px', 'margin-left': '5px', 'border-color': '#480099' }
            },
        },
        'Ktr-g1k': {
            title() { return "Time ×1k" },
            canClick() { return player.Ktr.timeWrap != 1000 && player.Ktr.activeChallenge != 'Ktr-g1' },
            style() {
                if (player.Ktr.timeWrap != 1000) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px dodgerblue', 'background-color': 'dodgerblue', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'dodgerblue' }
            },
            onClick() {
                player.Ktr.timeWrap = n(1000)
            },
            unlocked() { return player.Ktr.memoryCrystal.gte(1e10) }
        },
        'Ktr-g10': {
            title() { return "Time ×10" },
            canClick() { return player.Ktr.timeWrap != 10 && player.Ktr.activeChallenge != 'Ktr-g1' },
            style() {
                if (player.Ktr.timeWrap != 10) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px deepskyblue', 'background-color': 'deepskyblue', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'deepskyblue' }
            },
            onClick() {
                player.Ktr.timeWrap = n(10)
            },
            unlocked() { return player.Ktr.memoryCrystal.gte(1e6) }
        },
        'Ktr-g2': {
            title() { return "Time ×2" },
            canClick() { return player.Ktr.timeWrap != 2 && player.Ktr.activeChallenge != 'Ktr-g1' },
            style() {
                if (player.Ktr.timeWrap != 2) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px skyblue', 'background-color': 'skyblue', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'skyblue' }
            },
            onClick() {
                player.Ktr.timeWrap = n(2)
            },
        },
        'Ktr-g1': {
            title() { return "Time ×1" },
            canClick() { return player.Ktr.timeWrap != 1 },
            style() {
                if (player.Ktr.timeWrap != 1) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px white', 'background-color': 'white', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'white' }
            },
            onClick() {
                player.Ktr.timeWrap = n(1)
            },
        },
        'Ktr-g1/2': {
            title() { return "Time ×1/2" },
            canClick() { return player.Ktr.timeWrap != 0.5 },
            style() {
                if (player.Ktr.timeWrap != 0.5) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px #ffcece', 'background-color': '#ffcece', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': '#ffcece' }
            },
            onClick() {
                player.Ktr.timeWrap = n(0.5)
            },
        },
        'Ktr-g1/4': {
            title() { return "Time ×1/4" },
            canClick() { return player.Ktr.timeWrap != 0.25 },
            style() {
                if (player.Ktr.timeWrap != 0.25) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px #FA8072', 'background-color': '#FA8072', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': '#FA8072' }
            },
            onClick() {
                player.Ktr.timeWrap = n(0.25)
            },
            unlocked() { return player.Ktr.memoryCrystal.gte(1e6) }
        },
        'Ktr-g1/8': {
            title() { return "Time ×1/8" },
            canClick() { return player.Ktr.timeWrap != 0.125 },
            style() {
                if (player.Ktr.timeWrap != 0.125) return { 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px red', 'background-color': 'red', 'color': 'black', 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px' }
                else return { 'min-height': '50px', 'width': '100px', 'border-radius': '5px', 'font-size': '13px', 'background-color': 'black', 'color': 'white', 'border-color': 'red' }
            },
            onClick() {
                player.Ktr.timeWrap = n(0.125)
            },
            unlocked() { return player.Ktr.memoryCrystal.gte(1e10) }
        },
    },
    buyables: {
        'Ktr-s3': {
            title() { return '<h3>[Ktr-s3] Red Dwarf<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor("[Mass] 90 Mjupitar<br>[Temp.] 2500K", "#FF0000") + '<br><br>Multiply stellar points gain again.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + formatWhole(this.effect()) + "<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(3, new Decimal(x).pow(1.8)).mul(200).floor()
                if (x > 10) cost = cost.mul(Decimal.pow(1e3, Decimal.pow(x - 10, 3)))
                if (getBuyableAmount('Ktr', 'Ktr-s6').gte(1)) cost = cost.pow(buyableEffect('Ktr', 'Ktr-s6'))
                return cost
            },
            unlocked() { return player.Ktr.ark.gte(1) },
            effect(x) {
                let amount = n(x).add(player.Ktr.ark.gte(2) ? 0.5 : 0).add(player.Ktr.ark.gte(5) ? 0.5 : 0).add(player.Ktr.ark.gte(5) ? buyableEffect('Ktr', 'Ktr-s-d3') : 0).add(hasUpgrade('Ktr', 'Ktr-12') ? 1 : 0).add(player.Ktr.solarPower[0].gte(1) ? tmp.Ktr.clickables['Ktr-r-c1'].effect2 : 0)
                let eff = Decimal.pow(n(3).add(player.Ktr.ark.gte(4) ? buyableEffect('Ktr', 'Ktr-s4') : 0), amount)
                return eff
            },
            buy() {
                player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-radial-gradient(#CC0000,#EE0000 20px,#CC0000 50px,#EE0000 80px)', 'color': 'white', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 2px 2px red' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'red', 'margin-left': '5px' }
            },
        },
        'Ktr-m1': {
            title() { return '<h3>[Ktr-m1] The Poetry of Time<br>' },
            display() { return 'Add 12.5% to the progress for the recollection of Kether.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Kether points" },
            canAfford() { return player.Ktr.points.gte(this.cost()) && tmp.Ktr.memoryLevel.lt(100) },
            cost(x) {
                let cost = Decimal.pow(n(10), Decimal.pow(x, 1.05))
                return cost
            },
            buy() {
                if (!hasMilestone('Hkm', 'Hkm-4')) player.Ktr.points = player.Ktr.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'silver' } }
                else return { 'background-color': 'silver', 'color': 'black', 'border-color': 'silver', 'box-shadow': 'inset 3px 3px 3px #aaaaaa,0px 0px 10px #ffffff' }
            }
        },
        'Ktr-m2': {
            title() { return '<h3>[Ktr-m2] The Track of Memory<br>' },
            display() { return 'Add 25% to the progress for the recollection of Kether.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) && tmp.Ktr.memoryLevel.lt(100) },
            cost(x) {
                let cost = Decimal.pow(n(10), Decimal.pow(x, 1.05))
                return cost
            },
            buy() {
                if (!hasMilestone('Hkm', 'Hkm-4')) player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'PowderBlue' } }
                else return { 'background-color': 'PowderBlue ', 'color': 'black', 'border-color': 'PowderBlue ', 'box-shadow': 'inset 3px 3px 3px #aabbaa,0px 0px 10px #ffffff' }
            }
        },
        'Ktr-m3': {
            title() { return '<h3>[Ktr-m3] Journey Through Time<br>' },
            display() { return 'Add 100% to the progress for the recollection of Kether.<br><br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Cost: " + format(this.cost()) + " Arks" },
            canAfford() { return player.Ktr.ark.gte(this.cost()) && tmp.Ktr.memoryLevel.lt(100) },
            cost(x) {
                let cost = n(x).add(1)
                if (tmp.Ktr.memoryLevel.gte(42)) cost = cost.sub(10).max(0)
                return cost
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (!this.canAfford()) { return { 'background-color': 'black', 'color': 'white', 'border-color': 'Moccasin' } }
                else return { 'background-color': 'Moccasin', 'color': 'black', 'border-color': 'Moccasin', 'box-shadow': 'inset 3px 3px 3px #ffffdd,0px 0px 10px #ffffff' }
            }
        },
        'Ktr-sta': {
            title() {
                if (tmp.Ktr.memoryLevel.lt(15)) return "<h3>Kether's Status: Awaken<br>"
                else if (tmp.Ktr.memoryLevel.lt(42)) return "<h3>Kether's Status: Impression cultivation<br>"
                else if (tmp.Ktr.memoryLevel.lt(75)) return "<h3>Kether's Status: Impression fusion<br>"
                else if (tmp.Ktr.memoryLevel.lt(100)) return "<h3>Kether's Status: True self recovery<br>"
                else return "<h3>Kether's Status: True self sublimation<br>"
            },
            display() {
                if (tmp.Ktr.memoryLevel.lt(15)) return '<h2>Nothing special. (Tips: Reach depth 15, 42, 75 will change the strength of wave effects SIGNIFICANTLY!)'
                else if (tmp.Ktr.memoryLevel.lt(42)) return '<h2>Raise recollection wave 1 to ^2 and improve its formula, but divide stellar gain by /100<br>Click to reset Kether’s memory.'
                else if (tmp.Ktr.memoryLevel.lt(75)) return '<h2>Boost stellar and solar power gain by 100×(Uneffected by the 1st softcap), and lower the requirement of Ktr-m3.<br>Click to reset Kether’s memory.'
                else if (tmp.Ktr.memoryLevel.lt(100)) return '<h2>Boost stellar gain by 1000×, and boost all resource in remote space gain by 10×.<br>Click to reset Kether’s memory.'
                else return '<h2>The passage of the Heart Gate has been opened.<br>It‘s the time to rewrite the story of Miracle Continent.'
            },
            canAfford() { return tmp.Ktr.memoryLevel.gte(15) },
            buy() {
                setBuyableAmount('Ktr', 'Ktr-m1', n(0))
                setBuyableAmount('Ktr', 'Ktr-m2', n(0))
                setBuyableAmount('Ktr', 'Ktr-m3', n(0))
                player.Ktr.resetedMemory = true
            }
        },
        'Ktr-s1': {
            title() { return '<h3>[Ktr-s1] Giant gas planet<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor("[Mass] >0.6 Mjupiter<br>[Temp.] 200K", "#775500") + '<br><br>Multiply stellar points gain.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Kether points" },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(n(10), Decimal.pow(3, x)).mul(n(x).add(1))
                return cost
            },
            effect(x) {
                if (!hasUpgrade('Ktr', 'Ktr-13')) eff = n(x).add(hasUpgrade('Ktr', 'Ktr-11') ? 1 : 0)
                if (hasUpgrade('Ktr', 'Ktr-13')) eff = Decimal.pow(2, Decimal.add(x, 1))
                return eff
            },
            buy() {
                player.Ktr.points = player.Ktr.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-linear-gradient(0deg,#663300,#885500 20px,#775500 20px,#663300 40px)', 'color': 'white', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': '#775500', 'margin-left': '5px' }
            },
        },
        'Ktr-s2': {
            title() { return '<h3>[Ktr-s2] Brown Dwarf<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor("[Mass] 20 Mjupiter<br>[Temp.] 1000K", "#AA5500") + '<br><br>Cut stellar absorbing interval into half.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: /" + formatWhole(this.effect()) + "<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(200) },
            cost(x) {
                let cost = Decimal.pow(n(1.8), new Decimal(x).pow(1.5)).mul(10).floor()
                return cost
            },
            effect(x) {
                let eff = Decimal.pow(2, n(x).add(player.Ktr.ark.gte(1) ? 1 : 0))
                return eff
            },
            buy() {
                player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-radial-gradient(#995500,#AA5500 20px,#AA5500 50px,#884400 80px)', 'color': 'white', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 1px 1px #AA5500' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': '#AA5500', 'margin-left': '5px' }
            },
        },
        'Ktr-s4': {
            title() { return '<h3>[Ktr-s4] Orange Dwarf<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor("[Mass] 0.4 Msun<br>[Temp.] 4000K", "#FF8800") + '<br><br>Add to the base of red dwarf.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + formatWhole(this.effect()) + "<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(6, new Decimal(3).pow(x)).mul(6666).floor()
                return cost
            },
            unlocked() { return player.Ktr.ark.gte(3) },
            effect(x) {
                let eff = n(x).add(player.Ktr.solarPower[2].gte(1) ? tmp.Ktr.clickables['Ktr-r-c3'].effect2 : 0)
                return eff
            },
            buy() {
                player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-radial-gradient(#CC7700,#EE8800 20px,#CC7700 50px,#EE8800 80px)', 'color': 'white', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 3) + 'px orange' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'orange', 'margin-left': '5px' }
            },
        },
        'Ktr-s5': {
            title() { return '<h3>[Ktr-s5] Yellow Dwarf<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor2("[Mass] 0.92 Msun<br>[Temp.] 5500K", "#FFFF00") + '<br><br>Automally absorb energy from your stars.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + formatWhole(this.effect()) + " / sec<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(3, new Decimal(3).pow(x)).times(1e7).floor()
                return cost
            },
            unlocked() { return player.Ktr.ark.gte(5) },
            effect(x) {
                let eff = Decimal.pow(n(4).add(getBuyableAmount('Ktr', 'Ktr-s-d1').gte(1) ? buyableEffect('Ktr', 'Ktr-s-d1') : 0), n(x).add(player.Ktr.ark.gte(6) ? getBuyableAmount('Ktr', 'Ktr-s1').mul(0.05) : 0).add(hasMilestone('Hkm', 'Hkm-1') ? 1 : 0)).sub(1)
                if (hasUpgrade('Ktr', 'Ktr-15')) eff = eff.pow(3)
                if (player.Ktr.remote) eff = eff.mul(tmp.Ktr.solarEff.sqrt())
                return eff
            },
            buy() {
                player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-radial-gradient(#DDDD00,#EEEE00 20px,#DDDD00 50px,#EEEE00 80px)', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 4) + 'px yellow' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'yellow', 'margin-left': '5px' }
            },
        },
        'Ktr-s6': {
            title() { return '<h3>[Ktr-s6] White Dwarf<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return quickBackgColor2("[Mass] 1.6 Msun<br>[Temp.] 7000K", "#FFFFFF") + '<br><br>Decrease the cost scale of red dwarf.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + format(this.effect()) + "<br>Cost: " + format(this.cost()) + " Stellar points" },
            canAfford() { return player.Ktr.stellar.gte(this.cost()) },
            cost(x) {
                let cost = Decimal.pow(2, new Decimal(2.8).pow(x)).mul(1e27).floor()
                return cost
            },
            unlocked() { return player.Ktr.ark.gte(13) },
            effect(x) {
                let eff = n(10).sub(new Decimal(x).add(1).log(2)).div(10).min(7)
                return eff
            },
            buy() {
                player.Ktr.stellar = player.Ktr.stellar.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'repeating-radial-gradient(#DDDDDD,#EEEEEE 20px,#DDDDDD 50px,#EEEEEE 80px)', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px white' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'white', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d1': {
            title() { return '<h3>[Ktr-s-d1] Perseus Arm<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Add .3 to the base of yellow dwarf.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                let cost = n(x).div(2).plus(1).pow(2).floor()
                return cost
            },
            unlocked() { return player.Ktr.distant },
            effect(x) {
                let eff = Decimal.mul(0.3, n(x))
                return eff
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'lavender', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'lavender', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d2': {
            title() { return '<h3>[Ktr-s-d2] Orion arm<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Add .2 to the base of ark effect.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                let cost = n(x).div(1.2).plus(1).pow(2).floor()
                return cost
            },
            unlocked() { return player.Ktr.distant },
            effect(x) {
                let eff = Decimal.mul(0.2, x)
                return eff
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'lavender', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'lavender', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d3': {
            title() { return '<h3>[Ktr-s-d3] Centaurus arm<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Each brown dwarf provide .03 extra red dwarf.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: +" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                if (x < 5) return n(x).mul(2).plus(1).pow(2).floor()
                if (x == 5) return new Decimal(1e9999)
            },
            unlocked() { return player.Ktr.distant },
            effect(x) {
                let eff = Decimal.mul(0.03, x).mul(getBuyableAmount('Ktr', 'Ktr-s2'))
                return eff
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': 'lavender', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px lavender' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': 'lavender', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d4': {
            title() { return '<h3>[Ktr-s-d4] Andromeda Galaxy<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Boost all resource gain in the tab [Remote Space].<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                return n(x).mul(1.8).plus(1).pow(2).sub(player.Ktr.solarPower[3].gte(1) ? tmp.Ktr.clickables['Ktr-r-c4'].effect1 : 0).floor().max(0)
            },
            unlocked() { return player.Ktr.ark.gte(21) },
            effect(x) {
                return Decimal.pow(n(1.5).add(tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[6].start) ? 0.5 : 0), x)
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': '#c999ff', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px #c999ff' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': '#c999ff', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d5': {
            title() { return '<h3>[Ktr-s-d5] NGC 2068<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Boost solar energy gain.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ×" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                return n(x).mul(1.4).plus(1).pow(2).sub(player.Ktr.solarPower[3].gte(1) ? tmp.Ktr.clickables['Ktr-r-c4'].effect1 : 0).floor().max(0)
            },
            unlocked() { return player.Ktr.ark.gte(21) },
            effect(x) {
                return Decimal.pow(2, x)
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': '#c999ff', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px #c999ff' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': '#c999ff', 'margin-left': '5px' }
            },
        },
        'Ktr-s-d6': {
            title() { return '<h3>[Ktr-s-d6] NGC 4486<br>Lv.' + getBuyableAmount(this.layer, this.id) },
            tooltip() { return 'Raise the effect of electroweak star to a power.<br>Amount: ' + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + format(this.effect()) + "<br>Cost: " + formatWhole(this.cost()) + " Ark fuel" },
            canAfford() { return player.Ktr.fuel.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(100) },
            cost(x) {
                return n(x).mul(1.8).plus(1).pow(2).floor()
            },
            unlocked() { return player.Ktr.ark.gte(21) },
            effect(x) {
                return Decimal.add(1, x.add(1).log(4))
            },
            buy() {
                if (!hasAchievement('Ain', 'Hkm-6')) player.Ktr.fuel = player.Ktr.fuel.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                if (this.canAfford()) return { 'background': '#c999ff', 'color': 'black', 'height': '150px', 'width': '150px', 'border-radius': '50%', 'margin-left': '5px', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px #c999ff' }
                else return { 'height': '150px', 'width': '150px', 'border-radius': '50%', 'background-color': 'black', 'color': 'white', 'border-color': '#c999ff', 'margin-left': '5px' }
            },
        },
        'Ktr-g-h1': {
            title() { return "<h3>[i] Sea of Mystery " + (this.enabled() ? quickColor('(Stable)', 'green') : quickColor('(Disrupted)', 'red')) },
            display() {
                let dis = '<h2>[Kether] The ultimate beauty of truth is achieved through constantly overcoming oneself in every failure and reflection. If every time you enter the Heart Gate, the result is at least 7 times better than the previous one, I think you have achieved this.'
                if (!this.enabled()) {
                    if (player.Ktr.realTime.lt(300)) dis += '<br><br>' + quickColor('Reach 300s of kether time to discover more.', 'grey')
                    else dis += '<br><br>' + quickColor('Every time you exit the Heart Gate, you need to obtain at least 7 times the memory crystal obtained from the last exit for 3 times in a row to stabilize it.', 'red')
                }
                else dis += '<br><br>' + quickColor('Memory Crystal gain rate ×20', 'green')
                return dis
            },
            enabled() { return this.unlocked() && (player.Ktr.gate1 >= 3 || hasMilestone('Hkm', 'Hkm-1')) },
            canAfford() { return false },
            unlocked() { return player.Ktr.storyUnlocked >= 9 }
        },
        'Ktr-g-h2': {
            title() { return "<h3>[ii] Sea of Illusion " + (this.enabled() ? quickColor('(Stable)', 'green') : quickColor('(Disrupted)', 'red')) },
            display() {
                let dis = '<h2>[Kether] The law of balance undoubtedly applies to all things in the interstellar world. You can deeply understand this in the fuel usage of the ark.'
                if (!this.enabled()) {
                    if (player.Ktr.realTime.lt(1000)) dis += '<br><br>' + quickColor('Reach 1000s of kether time to discover more.', 'black')
                    else dis += '<br><br>' + quickColor('Let all of your upgrades in remote space go beyond lv.6 ( Except for Ktr-s-d3, it only requires to go beyond lv.4) to stabilize it.', 'red')
                }
                else dis += '<br><br>' + quickColor('Heart Gate nerf expontent +^0.05', 'green')
                return dis
            },
            enabled() { return this.unlocked() && ((getBuyableAmount('Ktr', 'Ktr-s-d1').gte(7) && getBuyableAmount('Ktr', 'Ktr-s-d2').gte(7) && getBuyableAmount('Ktr', 'Ktr-s-d3').gte(5) && getBuyableAmount('Ktr', 'Ktr-s-d4').gte(7) && getBuyableAmount('Ktr', 'Ktr-s-d5').gte(7) && getBuyableAmount('Ktr', 'Ktr-s-d6').gte(7)) || hasMilestone('Hkm', 'Hkm-1')) },
            canAfford() { return false },
            unlocked() { return player.Ktr.storyUnlocked >= 9 && player.Ktr.memoryCrystal.gte(1e6) }
        },
        'Ktr-g-h3': {
            title() { return "<h3>[iii] Sea of Dream " + (this.enabled() ? quickColor('(Stable)', 'green') : quickColor('(Disrupted)', 'red')) },
            display() {
                let dis = '<h2>[Kether] All miracles in the universe are built on the right foundation of time. If you can slow down time around integer moments, then you have the potential to master the time of all things.'
                if (!this.enabled()) {
                    if (player.Ktr.realTime.lt(2000)) dis += '<br><br>' + quickColor('Reach 2000s of kether time to discover more.', 'black')
                    else dis += '<br><br>' + quickColor('Change timespan rate to x1/8 and wait until your universal time can be divisible by 60s(1min) to stabilize it. (120s,180s,240s,etc.)', 'red')
                }
                else dis += '<br><br>' + quickColor('Heart Gate nerf expontent x2', 'green')
                return dis
            },
            enabled() { return this.unlocked() && ((player.Ktr.universalTime.gte(30) && player.Ktr.universalTime.toNumber() % 60 <= 2 && player.Ktr.timeWrap < n(0.2)) || hasMilestone('Hkm', 'Hkm-1')) },
            canAfford() { return false },
            unlocked() { return player.Ktr.storyUnlocked >= 9 && player.Ktr.memoryCrystal.gte(1e10) }
        },
    },
    challenges: {
        'Ktr-g1': {
            name() { return "Heart Gate " + ((this.locked()) ? '(Locked)' : (player.Ktr.activeChallenge == 'Ktr-g1' ? ("(" + formatWhole(this.gain()) + ")") : ("(Inactive)"))) },
            text() { return "❂" },
            locked() { return player.Ktr.storyUnlocked < 9 },
            exp: "",
            color: '#FFFFFF',
            challengeDescription() {
                let desc = "↑↑Click the symbol of current saphirah to enter the Heart Gate!<br>——————————————————<br>Heart Gate Effect:<br>1) Extremely Decrease the generation of stellar points. But it also gains a raising exponent based on the real time after entrying the gate.<br>2) Antimatter will increase after a short time period. If it go beyond your stellar points, you will gain no stellar points.<br>3)Gains memory crystal after exiting the gate.<br>3) Yellow Dwarf have no effect.<br>——————————————————<br>Reach 1e6 and 1e10 memory crystals to unlock more content.<br>——————————————————Goal: 1e20 memory crystals<br>Reward: Unlock Hokma."
                return desc
            },
            gain() {
                let gain = player.Ktr.stellar.add(1).pow(0.22).floor()
                if (layers.Ktr.buyables['Ktr-g-h1'].enabled()) gain = gain.mul(20)
                if (gain.gte(1e20)) gain = softcap(gain, 'root', n(1e20), 15)
                if (gain.gte(1e35)) gain = n(1e35)
                return gain
            },
            style() {
                if (player.Ktr.memoryCrystal.gte(1e20)) return { 'background-color': '#44FF44', 'box-shadow': '0px 0px 3px 3px #44FF44' }
                else if (player.Ktr.activeChallenge == 'Ktr-g1') return { 'background-color': '#dddddd', 'box-shadow': '0px 0px 6px 6px #dddddd' }
                else if (!this.locked()) return { 'background-color': '#dddddd', 'box-shadow': '0px 0px 3px 3px #dddddd' }
                else return { 'background-color': '#888888' }
            },
            onEnter() {
                player.Ktr.timeWrap = n(1)
                for (var i = 1; i <= 6; i++) {
                    setBuyableAmount('Ktr', 'Ktr-s' + i, n(0))
                }
                player.Ktr.stellar = n(0)
            },
            onExit() {
                if (this.gain().gte((player.Ktr.lastCrystal).mul(7))) player.Ktr.gate1 += 1
                else player.Ktr.gate1 = 0;
                player.Ktr.memoryCrystal = player.Ktr.memoryCrystal.add(this.gain())
                player.Ktr.lastCrystal = this.gain()
                player.Ktr.universalTime = n(0)
                player.Ktr.realTime = n(0)
            },
        },
    },
    bars: {
        'Ktr-m1': {
            direction: RIGHT,
            width: 600,
            height: 10,
            progress() { return tmp.Ktr.memoryLevel.div(100) },
            fillStyle() { return { 'background-color': 'skyblue' } },
            borderStyle() { return { 'border-color': 'skyblue' } },
        },
        'Ktr-a1': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return formatWhole(player.Ktr.stellar) + ' / ' + formatWhole(tmp.Ktr.arkFullReq) + ' stellar points for next ark' },
            progress() { return player.Ktr.stellar.div(tmp.Ktr.arkFullReq) },
            fillStyle() { return { 'background-color': 'lightyellow' } },
            borderStyle() { return { 'border-color': 'lightyellow' } },
        },
        'Ktr-g1': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req1: ' + format(player.Ktr.stellar) + ' / ' + format(1e245) + ' stellar points' },
            progress() { return player.Ktr.stellar.add(1).log(10).div(245) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            unlocked() { return player.Ktr.storyUnlocked < 9 }
        },
        'Ktr-g2': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req2: ' + formatWhole(tmp.Ktr.memoryLevel) + ' / ' + formatWhole(100) + ' memory depth' },
            progress() { return tmp.Ktr.memoryLevel.div(100) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            unlocked() { return player.Ktr.storyUnlocked < 9 }
        },
        'Ktr-g3': {
            direction: RIGHT,
            width: 600,
            height: 30,
            display() { return 'Req3: ' + formatWhole(player.Ktr.solarLayer) + ' / ' + formatWhole(3) + ' universal layer' },
            progress() { return n(player.Ktr.solarLayer / 3) },
            fillStyle() {
                if (this.progress().lt(1)) return { 'background-color': '#999999' }
                else return { 'background-color': 'green' }
            },
            unlocked() { return player.Ktr.storyUnlocked < 9 }
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Ktr', 'Ktr-6')) mult = mult.mul(upgradeEffect('Ktr', 'Ktr-6'))
        if (tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[1].start)) mult = mult.mul(tmp.Ktr.memoryBonus[1].effect)
        if (player.Ktr.ark.gte(1)) mult = mult.mul(tmp.Ktr.arkEff)
        if (mult.gte(1e100)) mult = softcap(mult, 'root', n(1e100), 1.8)
        if (hasMilestone('Hkm', 'Hkm-1')) mult = mult.mul(tmp.Hkm.effect)
        if (hasUpgrade('Hkm', 'Hkm-5')) mult = mult.mul(1e50)
        if (player.Hkm.storyUnlocked >= 6) mult = mult.mul(tmp.Hkm.foamEff1)
        if (hasUpgrade('Ktr', 'Ktr-18')) mult = mult.mul(tmp.Hkm.BatteryEff2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[2].start)) exp = exp.mul(1.03)
        return exp
    },
    storyPending() {
        let story = 0;
        if (player.Ktr.points.gte(1)) story = 1;
        if (hasUpgrade('Ktr', 'Ktr-1') && player.Ktr.storyUnlocked == 1) story = 2;
        if (player.points.gte(200000) && player.Ktr.storyUnlocked == 2) story = 3;
        if (player.Ktr.stellar.gte(200) && player.Ktr.storyUnlocked == 3) story = 4;
        if (player.Ktr.ark.gte(3) && player.Ktr.storyUnlocked == 4) story = 5;
        if (player.Ktr.distant && player.Ktr.storyUnlocked == 5) story = 6;
        if (player.Ktr.remote && player.Ktr.storyUnlocked == 6) story = 7;
        if (player.Ktr.ark.gte(21) && player.Ktr.storyUnlocked == 7) story = 8;
        if (tmp.Ktr.memoryLevel.gte(100) && player.Ktr.stellar.gte(1e245) && player.Ktr.solarLayer >= 3 && player.Ktr.storyUnlocked == 8) story = 9;
        return story
    },
    memoryLevel() {
        if (hasMilestone('Hkm', 'Hkm-11')) return n(100)
        let memory = getBuyableAmount('Ktr', 'Ktr-m1').mul(25).add(getBuyableAmount('Ktr', 'Ktr-m2').mul(50)).add(getBuyableAmount('Ktr', 'Ktr-m3').mul(200))
        return memory.div(200).floor().min(100)
    },
    memorytoNext() {
        let memory = getBuyableAmount('Ktr', 'Ktr-m1').mul(25).add(getBuyableAmount('Ktr', 'Ktr-m2').mul(50)).add(getBuyableAmount('Ktr', 'Ktr-m3').mul(200))
        return (memory.div(200).sub(memory.div(200).floor())).mul(100).min(100)
    },
    stellarFreezeLimit() {
        return n(2).div(buyableEffect('Ktr', 'Ktr-s2'))
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        'Ktr-1': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Shattered Stars<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Origin of everything. Generate 1 essence per second.' },
            effect() {
                let eff = new Decimal(1)
                return eff
            },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            effectDisplay() { return '+' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) + "/sec" },
            cost() { return n(1) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
        },
        'Ktr-2': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Clotho and the Stargazer<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Slightly boost essence gain based on kether points.' },
            effect() {
                let eff = player.Ktr.points.pow(hasUpgrade('Ktr', 'Ktr-9') ? 1.5 : 1).add(1).root(2)
                if (hasUpgrade('Ktr', 'Ktr-7')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-7'))
                if (eff.gte(50)) eff = softcap(eff, 'root', n(50), 2.5)
                if (eff.gte(1e10)) eff = softcap(eff, 'root', n(1e10), 15)
                return eff
            },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            cost() { return n(3) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-1')
            }
        },
        'Ktr-3': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Pure white waves<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Boost essences gain based on itself.' },
            effect() {
                let eff = player.points.add(1).pow(hasUpgrade('Ktr', 'Ktr-4') ? 1.5 : 1).pow(hasUpgrade('Ktr', 'Ktr-5') ? 1.5 : 1).log(9).add(1)
                if (hasUpgrade('Ktr', 'Ktr-7')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-7'))
                if (eff.gte(10)) eff = softcap(eff, 'root', n(10), n(2).sub(hasUpgrade('Ktr', 'Ktr-14') ? 0.8 : 0))
                if (eff.gte(1e20)) eff = softcap(eff, 'root', n(1e20), 15)
                if (tmp.Ktr.memoryLevel.gte(tmp.Ktr.memoryBonus[4].start)) eff = eff.pow(4)
                return eff
            },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            cost() { return n(5) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-2')
            }
        },
        'Ktr-4': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Star River Shuttle<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Ktr-3 uses a better formula.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(20) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-3')
            }
        },
        'Ktr-5': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Star Guide<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Ktr-3 uses a even better formula.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(40) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-4')
            }
        },
        'Ktr-6': {
            title() { return quickColor('[' + this.id + ']' + '<h3>The Ties of the Starry Sea<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Each bought upgrade slightly boost Kether points gain.' },
            color() { return '#ffffff' },
            effect() {
                let eff = n(player.Ktr.upgrades.length).add(hasUpgrade('Ktr', 'Ktr-10') ? 4 : 0).mul(0.15).add(1)
                if (hasUpgrade('Ktr', 'Ktr-7')) eff = eff.mul(upgradeEffect('Ktr', 'Ktr-7'))
                if (eff.gte(1e6)) softcap(eff, 'root', n(1e6), 3)
                if (eff.gte(1e100)) softcap(eff, 'root', n(1e100), 15)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(60) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-5')
            }
        },
        'Ktr-7': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Stars twinkle<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Make each upgrades which description includes "boost" better. Things become interesting.' },
            color() { return '#ffffff' },
            effect() {
                let eff = n(1.3)
                if (hasUpgrade('Ktr', 'Ktr-8')) eff = eff.pow(upgradeEffect('Ktr', 'Ktr-8'))
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(150) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-6')
            }
        },
        'Ktr-8': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Starduster<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Make Ktr-7 effects on itself.' },
            color() { return '#ffffff' },
            effect() {
                let eff = n(2)
                return eff
            },
            effectDisplay() { return '^' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(500) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-7')
            }
        },
        'Ktr-9': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Eternal Starlight<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Ktr-2 uses a better formula and weaken its softcap.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(1000) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-8')
            }
        },
        'Ktr-10': {
            title() { return quickColor('[' + this.id + ']' + '<h3>9 1/4 Platform<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Nothing but equal to 5 UPGRADES.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(2000) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-9')
            }
        },
        'Ktr-11': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Starshards<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Get 1 extra giant gas planet.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(20000) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-10') && player.Ktr.storyUnlocked >= 3
            }
        },
        'Ktr-12': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Farewell Starlight<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Get 1 extra red dwarf.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(1e21) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-11') && player.Ktr.storyUnlocked >= 6
            }
        },
        'Ktr-13': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Deep in the Sea of Memory<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Make the formula of giant gas planet MUCH BETTER.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(1e30) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-12') && player.Ktr.storyUnlocked >= 6
            }
        },
        'Ktr-14': {
            title() { return quickColor('[' + this.id + ']' + '<h3>The Footsteps of Parting<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Slightly weaken the softcap of Ktr-3.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(1e48) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-13') && player.Ktr.storyUnlocked >= 6
            }
        },
        'Ktr-14': {
            title() { return quickColor('[' + this.id + ']' + '<h3>The Footsteps of Parting<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Slightly weaken the softcap of Ktr-3.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(1e48) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-13') && player.Ktr.storyUnlocked >= 6
            }
        },
        'Ktr-15': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Orbit Calculator<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Greatly boost the effect of yellow dwarf.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n(2e49) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = n(3)
                return eff
            },
            effectDisplay() { return '^' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-14') && player.Ktr.storyUnlocked >= 6
            }
        },
        'Ktr-16': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Sendan Life<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Boost global boxes gain based on kether points.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e1050') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = player.Ktr.points.add(1).log10().div(100).sqrt().add(1)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-15') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-17': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Eternal Snow<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Transfer Ne-box faster based on the effect of Pe-Boxes.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e1250') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = Decimal.log(new Decimal(1).add(tmp.Hkm.PeBoxEff).max(1), 10).add(1)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-16') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-18': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Startail<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Unlock Eternal Battery and transfer Ne-box 5 times faster.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e1500') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = n(5)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-17') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-19': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Don’t Let Me Down<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Global boxes gaining multiplier is based on Ne-boxes.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e2100') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = n(10).mul(n(1).add(player.Hkm.NeBox).max(1).log(100).add(1))
                if (hasUpgrade('Ktr', 'Ktr-20')) eff = eff.pow(2)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-18') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-20': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Into the Night<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Square Ktr-19.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e2333') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = n(2)
                return eff
            },
            effectDisplay() { return '^' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-19') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-21': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Shade of Remorse<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'The global box gain rate is based on total fuel battery level and unlock SE-box.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e2800') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = player.Hkm.batteryTheorem.add(1)
                if (hasUpgrade('Ktr', 'Ktr-22')) eff = eff.pow(upgradeEffect('Ktr', 'Ktr-22'))
                if (hasAchievement('Ain', 'Hkm-24')) eff = eff.mul(Decimal.pow(1.5, getBuyableAmount('Hkm', 'Hkm-b1').add(getBuyableAmount('Hkm', 'Hkm-b2')).add(getBuyableAmount('Hkm', 'Hkm-b3'))))
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-20') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-22': {
            title() { return quickColor('[' + this.id + ']' + '<h3>The dusk of existance<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Square the 2nd effect of previous upgrade... Not really square.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e3033') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = n(1.9)
                return eff
            },
            effectDisplay() { return '^' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-21') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-23': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Glass world<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Divide 1e3000 from the Y-axis time compressor cost.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('3.33e3333') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-22') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-24': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Light Tachyon<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Each time foam slightly boosts Pe-box transfer rate.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e3550') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            effect() {
                let eff = Decimal.pow(1.3, player.Hkm.foams).mul(100)
                return eff
            },
            effectDisplay() { return '×' + format(layers.Ktr.upgrades[this.layer, this.id].effect()) },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-23') && hasAchievement('Ain', 'Hkm-16')
            }
        },
        'Ktr-25': {
            title() { return quickColor('[' + this.id + ']' + '<h3>Universal Harmony<br>', hasUpgrade(this.layer, this.id) ? 'green' : '') },
            description() { return 'Gain another alchemy battery.' },
            color() { return '#ffffff' },
            canAfford() { return player.Ktr.points.gte(this.cost()) },
            cost() { return n('1e4025') },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': '0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'height': '130px', 'width': '130px' }
            },
            unlocked() {
                return hasUpgrade('Ktr', 'Ktr-24') && hasAchievement('Ain', 'Hkm-16')
            }
        },
    },
    layerShown() { return player.Hkm.activeChallenge != 'Hkm-bk1' },
    tabFormat: {
        "The Sea of Floating Memory": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["row", [["upgrade", "Ktr-1"], ["upgrade", "Ktr-2"], ["upgrade", "Ktr-3"], ["upgrade", "Ktr-4"], ["upgrade", "Ktr-5"]]],
                ["row", [["upgrade", "Ktr-6"], ["upgrade", "Ktr-7"], ["upgrade", "Ktr-8"], ["upgrade", "Ktr-9"], ["upgrade", "Ktr-10"]]],
                ["row", [["upgrade", "Ktr-11"], ["upgrade", "Ktr-12"], ["upgrade", "Ktr-13"], ["upgrade", "Ktr-14"], ["upgrade", "Ktr-15"]]],
                ["row", [["upgrade", "Ktr-16"], ["upgrade", "Ktr-17"], ["upgrade", "Ktr-18"], ["upgrade", "Ktr-19"], ["upgrade", "Ktr-20"]]],
                ["row", [["upgrade", "Ktr-21"], ["upgrade", "Ktr-22"], ["upgrade", "Ktr-23"], ["upgrade", "Ktr-24"], ["upgrade", "Ktr-25"]]],
                'blank',
                ['display-text', function () { if (player.Ktr.storyUnlocked < 3) return '<h4>' + quickColor("[Hints] Click the button on the top to reset essence, but gain kether points.<br>Kether points can buy permerant upgrades and they can boost resources gain.<br><br>Reach 200,000 essence to continue the journey.", 'grey') }],
            ]
        },
        "Star Observation Platform": {
            content: [
                ['display-text', function () { return '<h4>You have ' + quickBigColor(formatWhole(player.Ktr.stellar), 'Moccasin') + ' Stellar points, boosting essence gain by ' + quickBigColor('×' + format(tmp.Ktr.stellarEff), 'moccasin') + ' .' }],
                "blank",
                ['clickable', 'Ktr-s1'],
                "blank",
                ['row', [['buyable', 'Ktr-s1'], ['buyable', 'Ktr-s2'], ['buyable', 'Ktr-s3'], ['buyable', 'Ktr-s4']]],
                ['row', [['buyable', 'Ktr-s5'], ['buyable', 'Ktr-s6']]],
                'blank',
                ['display-text', function () { return '<h4>' + quickColor("[Hints] Always care about story is a good strategy.<br>You can always check the story to see when the next feature will be unlocked.", 'grey') }],
            ],
            unlocked() { return player.Ktr.storyUnlocked >= 3 },
            buttonStyle() { return { 'background': 'linear-gradient(to right,white 11%, lightyellow 40%)', 'color': 'black', 'box-shadow': '2px 2px 2px white' } },
            style() {
                return {
                    "background-image":
                        "linear-gradient(#000 30px,transparent 0),linear-gradient(90deg,white 1px,transparent 0)",
                    "background-size": "31px 31px,31px 31px",
                    "background-position": "" + (player.timePlayed) % 100 + "%" + " " + (player.timePlayed % 100) + "%"
                }
            }
        },
        "Atmospheric Ark": {
            content: [
                ['display-text', function () { return '<h4>You have built a total of   ' + quickBigColor(formatWhole(player.Ktr.ark), 'white') + ' arks. This boosts most of previous resource by ' + quickBigColor('×' + format(tmp.Ktr.arkEff), 'white') }],
                ['bar', 'Ktr-a1'],
                "blank",
                ['row', [['clickable', 'Ktr-a1'], ['clickable', 'Ktr-a2'], ['clickable', 'Ktr-a3'], ['clickable', 'Ktr-a4']]],
                "blank",
                ['display-text', function () { return '<h4>Your arks have a total of ' + quickBigColor(formatWhole(player.Ktr.fuel), 'lavender') + ' fuel.' }],
                "blank",
                ["row", [["buyable", "Ktr-s-d1"], ["buyable", "Ktr-s-d2"], ["buyable", "Ktr-s-d3"]]],
                ["row", [["buyable", "Ktr-s-d4"], ["buyable", "Ktr-s-d5"], ["buyable", "Ktr-s-d6"]]],
            ],
            unlocked() { return player.Ktr.storyUnlocked >= 4 },
            buttonStyle() { return { 'background': 'white', 'color': 'black', 'box-shadow': '2px 2px 2px grey' } }
        },
        "Remote Space": {
            content: [
                ['display-text', function () { return '<h4>Your ark has received   ' + quickBigColor(formatWhole(tmp.Ktr.solarEnergy), 'lavender') + ' solar Energy. which boosts to ark effect and yellow dwarf effect ' + quickBigColor('×' + format(tmp.Ktr.solarEff), 'lavender') }],
                ['display-text', function () { return quickBigColor('[Universal layer:' + tmp.Ktr.solarLayer[player.Ktr.solarLayer] + ']', tmp.Ktr.solarColor[player.Ktr.solarLayer]) }],
                ['clickable', 'Ktr-r1'],
                'blank',
                ['clickable', 'Ktr-r-c1'],
                ['clickable', 'Ktr-r-c2'],
                ['clickable', 'Ktr-r-c3'],
                ['clickable', 'Ktr-r-c4'],
                ['clickable', 'Ktr-r-c5'],
            ],
            unlocked() { return player.Ktr.remote },
            buttonStyle() { return { 'background': 'lavender', 'color': 'black', 'box-shadow': '2px 2px 2px grey' } },
            style() {
                return {
                    'background': 'linear-gradient(135deg, #000000 22px, #111133 22px, #111133 24px, transparent 24px, transparent 67px, #111133 67px, #111133 69px, transparent 69px),linear-gradient(225deg, #000000 22px, #111133 22px, #111133 24px, transparent 24px, transparent 67px, #111133 67px, #111133 69px, transparent 69px)0 64px',
                    'background-color': 'black',
                    'background-size': '64px 128px',
                    "background-position": "100%" + " " + (player.timePlayed % 100) + "%"
                }
            }
        },
        "Moments Watch Shop": {
            content: [
                ['display-text', function () { return '<h4>The recollection of kether is in depth ' + quickBigColor(formatWhole(tmp.Ktr.memoryLevel), 'white') + ', providing the following bonuses' }],
                ['display-text', function () { return '<h4>' + quickBigColor(formatWhole(tmp.Ktr.memorytoNext) + '%', 'white') + ' to next' }],
                "blank",
                ['infobox', 'Ktr-i1'],
                "blank",
                ["row", [["buyable", "Ktr-m1"], ["buyable", "Ktr-m2"], ["buyable", "Ktr-m3"]]],
                ['buyable', 'Ktr-sta'],
                ['bar', 'Ktr-m1'],
            ],
            unlocked() { return player.Ktr.storyUnlocked >= 3 },
            buttonStyle() { return { 'background': 'linear-gradient(to right,white 11%, skyblue 92%)', 'color': 'black', 'box-shadow': '2px 2px 2px white' } }
        },
        "Heart Gate": {
            content: [
                ['bar', 'Ktr-g1'],
                ['bar', 'Ktr-g2'],
                ['bar', 'Ktr-g3'],
                "blank",
                ['display-text', function () { if (player.Ktr.storyUnlocked >= 9) return '<h4>You have collected a total of   ' + quickBigColor(formatWhole(player.Ktr.memoryCrystal), 'white') + ' memory crystal. Itself boosts the effect of solar energy. (Unaffected by the nerf of heart gate)' }],
                ['display-text', function () { if (player.Ktr.infinityPoint >= 1) return '<h4>You have   ' + quickBigColor(formatWhole(player.Ktr.infinityPoint), 'white') + ' Infinity Points, boosting your antimatter production by   ' + quickBigColor('×' + format(1), 'white') }],
                ['display-text', function () { if (player.Ktr.activeChallenge == 'Ktr-g1') return '<h4>Universal timespan: ' + quickBigColor(formatTime(player.Ktr.universalTime), 'white') }],
                ['display-text', function () { if (player.Ktr.activeChallenge == 'Ktr-g1') return '<h4>Kether timespan: ' + quickBigColor(formatTime(player.Ktr.realTime), 'white') + ', translated to a stellar nerf of ' + quickBigColor('^' + format(tmp.Ktr.gateEff), 'white') }],
                ['display-text', function () { if (player.Ktr.activeChallenge == 'Ktr-g1') return '<h4>You have ' + quickBigColor(formatWhole(tmp.Ktr.antimatter), 'white') + ' antimatter.' }],
                "blank",
                ['row', [['challenge', 'Ktr-g1'], ["column", [["raw-html", function () { }],
                    "blank", ['display-text', function () { return '<h3>[Black Hole controller]<br>Change the stellar and universal timespan rate.' }],
                ['column', ["blank", ["clickable", 'Ktr-g1k'], ["clickable", 'Ktr-g10'], ["clickable", 'Ktr-g2'], ["clickable", 'Ktr-g1'], ["clickable", 'Ktr-g1/2'], ["clickable", 'Ktr-g1/4'], ["clickable", 'Ktr-g1/8']]],
                    "blank",
                ],
                    {
                        "color": "white",
                        "width": "300px",
                        "height": "700px",
                        "border-color": "#FFFFFF",
                        "border-width": "3px",
                        "background-color": "black",
                    },
                ]]],
                'blank',
                ['display-text', function () { return '<h4>' + quickColor("[Hints] Kether's Memory Gate has three unique but unstable memory channels that only become stable and provide bonuses when certain specific conditions are met. If the stable conditions of the memory channel cannot be determined based on existing clues, it can be unlocked by leaving it idle in the Heart Gate for a period of time.", 'grey') }],
                'blank',
                ['buyable', 'Ktr-g-h1'],
                ['buyable', 'Ktr-g-h2'],
                ['buyable', 'Ktr-g-h3'],
            ],
            unlocked() { return tmp.Ktr.memoryLevel.gte(100) || player.Ktr.storyUnlocked >= 9 },
            buttonStyle() { return { 'background': 'linear-gradient(to right,white 11%, grey 92%)', 'color': 'black', 'box-shadow': '2px 2px 2px grey' } }
        },
    },
    update(diff) {
        if (document.getElementById('Ktr') != null) player.Ktr.posk1 = document.getElementById('Ktr').getBoundingClientRect().left - 225
        if (document.getElementById('Ktr') != null) player.Ktr.posk2 = document.getElementById('Ktr').getBoundingClientRect().top - 150
        if (player.Ktr.stellarFreeze.gt(0)) player.Ktr.stellarFreeze = player.Ktr.stellarFreeze.sub(diff).max(0)
        if (tmp.Ktr.storyPending > player[this.layer].storyUnlocked) {
            player[this.layer].storyUnlocked = tmp.Ktr.storyPending;
            player[this.layer].newStory = true
            if (!hasMilestone('Hkm', 'Hkm-9')) doPopup(type = "none", text = "New Kether story unlocked!<br>(No. " + formatWhole(player[this.layer].storyUnlocked) + ")", title = "Ancient Universal Memory Awaken...", timer = 5, color = "white")
        }
        if (getBuyableAmount('Ktr', 'Ktr-s5').gte(1) || hasMilestone('Hkm', 'Hkm-1')) player.Ktr.stellar = player.Ktr.stellar.add((player.Ktr.activeChallenge == 'Ktr-g1' ? n(0) : buyableEffect('Ktr', 'Ktr-s5')).mul(tmp.Ktr.clickables['Ktr-s1'].gain).mul(diff))
        if (player.Ktr.activeChallenge == 'Ktr-g1') {
            player.Ktr.realTime = player.Ktr.realTime.add(n(diff).mul(player.Hkm.unlocked ? tmp.Hkm.effect : 1))
            player.Ktr.universalTime = player.Ktr.universalTime.add(n(diff).mul(player.Ktr.timeWrap))
        }
        // Check for Big Crunch condition (lol)
        if (tmp.Ktr.antimatter.gte(1.7976e308)) {
            Modal.show({
                color: 'black',
                title() { return `<text style='color:#FFFFFF'>Big Crunch</text>` },
                text() {
                    return `<text style='color:#FFFFFF; font-size: 20px;'>
                    There is too much antimatter. The Heart Gate is going to break apart.</text>`
                },
                buttons: {
                    1: {
                        text: `Big Crunch`,
                        onClick() {
                            for (var i = 1; i <= 6; i++) {
                                setBuyableAmount('Ktr', 'Ktr-s' + i, n(0))
                            }
                            player.Ktr.stellar = n(0)
                            player.Ktr.universalTime = n(0)
                            player.Ktr.realTime = n(0)
                            player.Ktr.infinityPoint += 1
                            Modal.close()
                        },
                        unlocked() { return true }
                    }
                }
            })
        }
        if (hasMilestone('Hkm', 'Hkm-1') && player.Ktr.storyUnlocked >= 3) {
            for (var i = 1; i <= 6; i++) {
                if (layers.Ktr.buyables['Ktr-s' + i].unlocked) buyBuyable('Ktr', 'Ktr-s' + i)
            }
        }
        if (hasAchievement('Ain', 'Hkm-5') && player.Ktr.remote) {
            for (var i = 1; i <= 5; i++) {
                if (tmp.Ktr.celestialPerSec[i - 1].gte(1) && tmp.Ktr.clickables['Ktr-r-c' + i].unlocked) player.Ktr.solarPower[i - 1] = player.Ktr.solarPower[i - 1].add(layers.Ktr.celestialGain()[i - 1].mul(diff).mul(10))
            }
        }
        if (hasMilestone('Hkm', 'Hkm-3')) {
            if (player.Ktr.stellar.gte(tmp.Ktr.arkFullReq)) {
                player.Ktr.ark = player.Ktr.ark.add(1)
                player.Ktr.fuel = player.Ktr.fuel.add(player.Ktr.ark)
                player.Ktr.totalFuel = player.Ktr.totalFuel.add(player.Ktr.ark)
                if (player.Ktr.ark.lt(21)) for (var i = 1; i <= 6; i++) {
                    setBuyableAmount('Ktr', 'Ktr-s' + i, n(0))
                }
                player.Ktr.stellar = n(0)
            }
        }
        if (hasMilestone('Hkm', 'Hkm-4')) {
            buyBuyable('Ktr', 'Ktr-m1')
            buyBuyable('Ktr', 'Ktr-m2')
            buyBuyable('Ktr', 'Ktr-m3')
        }
        if (hasMilestone('Hkm', 'Hkm-5') && player.Ktr.stellar.gte(tmp.Ktr.solarReq[player.Ktr.solarLayer])) player.Ktr.solarLayer++
        if (hasMilestone('Hkm', 'Hkm-6')) player.Ktr.timeWrap = n(1000)
        if (hasMilestone('Hkm', 'Hkm-9')) { buyBuyable('Ktr', 'Ktr-s-d2'), buyBuyable('Ktr', 'Ktr-s-d3') }
        if (hasMilestone('Hkm', 'Hkm-10')) { buyBuyable('Ktr', 'Ktr-s-d1'), buyBuyable('Ktr', 'Ktr-s-d4'), buyBuyable('Ktr', 'Ktr-s-d5'), buyBuyable('Ktr', 'Ktr-s-d6') }
    },
})

function ketherStory() {
    player.Ktr.newStory = false
    Modal.show({
        color: 'white',
        title() {
            if (player.Ktr.storyShowing < 100) return `<text style='color:#FFFFFF'>Kether's Quotes > Story ` + player.Ktr.storyShowing + `</text>`
            else if (player.Ktr.storyShowing == 100) return `<text style='color:#FFFFFF'>Kether's Quotes > Mega Softcaps</text>`
        },
        text() { return tmp.Ktr.storyContent[player.Ktr.storyShowing].text },
        buttons: {
            1: {
                text: `01`,
                onClick() {
                    player.Ktr.storyShowing = 1
                },
                unlocked() { return true }
            },
            2: {
                text: `02`,
                onClick() {
                    player.Ktr.storyShowing = 2
                },
                unlocked() { return player.Ktr.storyUnlocked >= 1 }
            },
            3: {
                text: `03`,
                onClick() {
                    player.Ktr.storyShowing = 3
                },
                unlocked() { return player.Ktr.storyUnlocked >= 2 }
            },
            4: {
                text: `04`,
                onClick() {
                    player.Ktr.storyShowing = 4
                },
                unlocked() { return player.Ktr.storyUnlocked >= 3 }
            },
            5: {
                text: `05`,
                onClick() {
                    player.Ktr.storyShowing = 5
                },
                unlocked() { return player.Ktr.storyUnlocked >= 5 }
            },
            6: {
                text: `06`,
                onClick() {
                    player.Ktr.storyShowing = 6
                },
                unlocked() { return player.Ktr.storyUnlocked >= 6 }
            },
            7: {
                text: `07`,
                onClick() {
                    player.Ktr.storyShowing = 7
                },
                unlocked() { return player.Ktr.storyUnlocked >= 7 }
            },
        }
    })
}
