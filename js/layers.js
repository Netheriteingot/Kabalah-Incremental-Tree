// Add this constant at the top of your js/layers.js file
const TOTAL_HOKMA_STORIES = 14;
const STORIES_PER_PAGE = 10;


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

function onReset(layer) {
    if (layer == 'Hkm' && player.Hkm.resetTime < player.Ain.bestReset) player.Ain.bestReset = player.Hkm.resetTime
    if (layer == 'Hkm' && player.Ktr.resetedMemory == false) player.Ain.hkm4unlocked = true
    if (layer == 'Hkm' && player.Ktr.respeced == false) player.Ain.hkm6unlocked = true
    if (layer == 'Hkm' && (tmp.Ktr.celestialLevel[0].lt(1) || tmp.Ktr.celestialLevel[1].lt(1) || tmp.Ktr.celestialLevel[2].lt(1) || tmp.Ktr.celestialLevel[3].lt(1) || tmp.Ktr.celestialLevel[4].lt(1))) player.Ain.hkm5unlocked = true
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

function hasGrid(layer, id) {
    return player[layer].grid[id] >= 1
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