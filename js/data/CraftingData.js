// Backward Clock crafting dataset + helpers (generated from crafting_system.json).
// The `var CRAFTING_DATA = {...}` line below is generated; regenerate it from the JSON.
// Everything after that line (weights, lookups, helpers) is hand-maintained.

var CRAFTING_DATA = {"resources":[{"id":"raw_matter","name":"Raw Matter","type":"physical","description":"Basic physical substance","value":1},{"id":"dirt","name":"Dirt","type":"physical","description":"Common earth and soil","value":0.5},{"id":"wood","name":"Wood","type":"physical","description":"Natural timber from trees","value":2},{"id":"stone","name":"Stone","type":"physical","description":"Solid rock material","value":2},{"id":"water","name":"Water","type":"physical","description":"Pure H2O liquid","value":1},{"id":"sand","name":"Sand","type":"physical","description":"Fine granular material","value":1},{"id":"clay","name":"Clay","type":"physical","description":"Malleable earth material","value":2},{"id":"coal","name":"Coal","type":"physical","description":"Combustible black rock","value":3},{"id":"ash","name":"Ash","type":"physical","description":"Residue from burning","value":1},{"id":"glass","name":"Glass","type":"physical","description":"Transparent solid material","value":4},{"id":"fiber","name":"Fiber","type":"physical","description":"Thin thread-like material","value":2},{"id":"energy","name":"Energy","type":"physical","description":"Pure energy extracted from matter","value":3},{"id":"iron","name":"Iron","type":"physical","description":"Common ferrous metal","value":4},{"id":"copper","name":"Copper","type":"physical","description":"Reddish conductive metal","value":5},{"id":"silver","name":"Silver","type":"physical","description":"Lustrous precious metal","value":8},{"id":"gold","name":"Gold","type":"physical","description":"Valuable yellow noble metal","value":10},{"id":"cobalt","name":"Cobalt","type":"physical","description":"Blue-tinted transition metal","value":7},{"id":"platinum","name":"Platinum","type":"physical","description":"Dense silvery-white precious metal","value":12},{"id":"crystal","name":"Crystal","type":"physical","description":"Crystalline structure with high energy density","value":12},{"id":"quantum_foam","name":"Quantum Foam","type":"physical","description":"Unstable quantum particles","value":20},{"id":"mana","name":"Mana","type":"arcane","description":"Raw magical essence","value":2},{"id":"essence","name":"Essence","type":"arcane","description":"Concentrated magical essence","value":8},{"id":"rune","name":"Rune","type":"arcane","description":"Mystical symbol with power","value":15},{"id":"ether","name":"Ether","type":"arcane","description":"Pure arcane substance","value":25},{"id":"void_shard","name":"Void Shard","type":"arcane","description":"Fragment of the void between worlds","value":40},{"id":"thought","name":"Thought","type":"other","description":"Crystallized conscious thought","value":4},{"id":"paradox","name":"Paradox","type":"other","description":"Logical impossibility made manifest","value":18},{"id":"dream_dust","name":"Dream Dust","type":"other","description":"Residue from the realm of dreams","value":10},{"id":"infinity_shard","name":"Infinity Shard","type":"other","description":"A piece of infinity itself","value":35},{"id":"temporal_fragment","name":"Temporal Fragment","type":"other","description":"Captured moment of time","value":30},{"id":"causality_chain","name":"Causality Chain","type":"other","description":"Linked cause and effect","value":50},{"id":"reverse_gear","name":"Reverse Gear","type":"other","description":"Mechanism that moves backward","value":80},{"id":"chrono_spring","name":"Chrono Spring","type":"other","description":"Spring wound by time itself","value":100},{"id":"backward_clock","name":"Backward Clock","type":"other","description":"The ultimate goal - a clock that runs backward","value":1000}],"currencies":[{"id":"kether_points","name":"Kether Points","description":"Divine points for physical creation"},{"id":"time_energy","name":"Time Energy","description":"Energy harvested from time itself"},{"id":"hokma_points","name":"Hokma Points","description":"Wisdom points for abstract creation"}],"recipes":[{"id":"p001","name":"Generate Raw Matter","type":"physical","time":0.5,"inputs":[{"resource":"kether_points","amount":1}],"outputs":[{"resource":"raw_matter","amount":1}],"rarity":"common"},{"id":"p001b","name":"Gather Dirt","type":"physical","time":0.5,"inputs":[{"resource":"kether_points","amount":1}],"outputs":[{"resource":"dirt","amount":2}],"rarity":"common"},{"id":"p001c","name":"Harvest Wood","type":"physical","time":1.5,"inputs":[{"resource":"kether_points","amount":1}],"outputs":[{"resource":"wood","amount":1}],"rarity":"common"},{"id":"p001d","name":"Quarry Stone","type":"physical","time":1.5,"inputs":[{"resource":"kether_points","amount":1}],"outputs":[{"resource":"stone","amount":1}],"rarity":"common"},{"id":"p001e","name":"Collect Water","type":"physical","time":0.5,"inputs":[{"resource":"kether_points","amount":1}],"outputs":[{"resource":"water","amount":1}],"rarity":"common"},{"id":"p002","name":"Extract Energy","type":"physical","time":0.5,"inputs":[{"resource":"raw_matter","amount":2}],"outputs":[{"resource":"energy","amount":1}],"rarity":"common"},{"id":"p002b","name":"Burn Wood","type":"physical","time":0.5,"inputs":[{"resource":"wood","amount":2}],"outputs":[{"resource":"energy","amount":1},{"resource":"ash","amount":1}],"rarity":"common"},{"id":"p002c","name":"Burn Coal","type":"physical","time":2,"inputs":[{"resource":"coal","amount":1}],"outputs":[{"resource":"energy","amount":2}],"rarity":"common"},{"id":"p003","name":"Refine Iron","type":"physical","time":0.5,"inputs":[{"resource":"raw_matter","amount":4}],"outputs":[{"resource":"iron","amount":1}],"rarity":"common"},{"id":"p003b","name":"Refine Copper","type":"physical","time":0.5,"inputs":[{"resource":"raw_matter","amount":5}],"outputs":[{"resource":"copper","amount":1}],"rarity":"common"},{"id":"p003c","name":"Mine Coal","type":"physical","time":0.5,"inputs":[{"resource":"stone","amount":2}],"outputs":[{"resource":"coal","amount":1}],"rarity":"common"},{"id":"p003d","name":"Sift Sand","type":"physical","time":0.5,"inputs":[{"resource":"dirt","amount":3}],"outputs":[{"resource":"sand","amount":2}],"rarity":"common"},{"id":"p003e","name":"Process Clay","type":"physical","time":0.5,"inputs":[{"resource":"dirt","amount":2},{"resource":"water","amount":1}],"outputs":[{"resource":"clay","amount":1}],"rarity":"common"},{"id":"p004","name":"Smelt Iron","type":"physical","time":0.5,"inputs":[{"resource":"stone","amount":3},{"resource":"energy","amount":2}],"outputs":[{"resource":"iron","amount":1}],"rarity":"common"},{"id":"p004b","name":"Extract Fiber","type":"physical","time":2.5,"inputs":[{"resource":"wood","amount":1}],"outputs":[{"resource":"fiber","amount":3}],"rarity":"common"},{"id":"p004c","name":"Make Glass","type":"physical","time":0.5,"inputs":[{"resource":"sand","amount":3},{"resource":"energy","amount":3}],"outputs":[{"resource":"glass","amount":1}],"rarity":"common"},{"id":"p005","name":"Crystallize Energy","type":"physical","time":0.5,"inputs":[{"resource":"energy","amount":4}],"outputs":[{"resource":"crystal","amount":1}],"rarity":"unusual"},{"id":"p005b","name":"Crystal from Glass","type":"physical","time":0.5,"inputs":[{"resource":"glass","amount":2},{"resource":"energy","amount":4}],"outputs":[{"resource":"crystal","amount":1}],"rarity":"rare"},{"id":"p006","name":"Form Crystal","type":"physical","time":0.5,"inputs":[{"resource":"iron","amount":2},{"resource":"energy","amount":1}],"outputs":[{"resource":"crystal","amount":1}],"rarity":"unusual"},{"id":"p006b","name":"Alloy Bronze","type":"physical","time":0.5,"inputs":[{"resource":"copper","amount":3},{"resource":"iron","amount":1}],"outputs":[{"resource":"iron","amount":2},{"resource":"copper","amount":1}],"rarity":"unusual"},{"id":"p006c","name":"Transmute Silver","type":"physical","time":0.5,"inputs":[{"resource":"copper","amount":3},{"resource":"energy","amount":5}],"outputs":[{"resource":"silver","amount":1}],"rarity":"rare"},{"id":"p006d","name":"Transmute Gold","type":"physical","time":0.5,"inputs":[{"resource":"silver","amount":2},{"resource":"energy","amount":4}],"outputs":[{"resource":"gold","amount":1}],"rarity":"rare"},{"id":"p006e","name":"Extract Cobalt","type":"physical","time":0.5,"inputs":[{"resource":"stone","amount":5},{"resource":"energy","amount":3}],"outputs":[{"resource":"cobalt","amount":1}],"rarity":"rare"},{"id":"p006f","name":"Forge Platinum","type":"physical","time":0.5,"inputs":[{"resource":"gold","amount":2},{"resource":"cobalt","amount":1},{"resource":"energy","amount":5}],"outputs":[{"resource":"platinum","amount":1}],"rarity":"epic"},{"id":"p007","name":"Mass-Energy Conversion","type":"physical","time":3.5,"inputs":[{"resource":"raw_matter","amount":3}],"outputs":[{"resource":"energy","amount":3}],"rarity":"unusual"},{"id":"p008","name":"Quantum Collapse","type":"physical","time":0.5,"inputs":[{"resource":"energy","amount":10},{"resource":"crystal","amount":2}],"outputs":[{"resource":"quantum_foam","amount":1}],"rarity":"epic"},{"id":"p009","name":"Iron Fusion","type":"physical","time":1,"inputs":[{"resource":"iron","amount":3}],"outputs":[{"resource":"iron","amount":2},{"resource":"energy","amount":2}],"rarity":"rare"},{"id":"p010","name":"Crystal Lattice","type":"physical","time":1,"inputs":[{"resource":"platinum","amount":2},{"resource":"energy","amount":6}],"outputs":[{"resource":"crystal","amount":3}],"rarity":"epic"},{"id":"p011","name":"Quantum Tunneling","type":"physical","time":1,"inputs":[{"resource":"crystal","amount":3},{"resource":"energy","amount":5}],"outputs":[{"resource":"quantum_foam","amount":1}],"rarity":"rare"},{"id":"p012","name":"Energy Compression","type":"physical","time":1,"inputs":[{"resource":"energy","amount":9}],"outputs":[{"resource":"crystal","amount":2}],"rarity":"rare"},{"id":"p013","name":"Copper Metallurgy","type":"physical","time":1.5,"inputs":[{"resource":"kether_points","amount":1},{"resource":"raw_matter","amount":3}],"outputs":[{"resource":"copper","amount":1}],"rarity":"common"},{"id":"p014","name":"Quantum Stabilization","type":"physical","time":1.5,"inputs":[{"resource":"quantum_foam","amount":2},{"resource":"crystal","amount":5}],"outputs":[{"resource":"quantum_foam","amount":3}],"rarity":"legendary"},{"id":"p015","name":"Particle Acceleration","type":"physical","time":0.5,"inputs":[{"resource":"cobalt","amount":2},{"resource":"energy","amount":8}],"outputs":[{"resource":"quantum_foam","amount":1}],"rarity":"epic"},{"id":"p016","name":"Thermodynamic Reversal","type":"physical","time":10,"inputs":[{"resource":"quantum_foam","amount":72},{"resource":"energy","amount":240}],"outputs":[{"resource":"temporal_fragment","amount":24}],"rarity":"legendary","batch":true,"batch_efficiency_bonus":1.2},{"id":"p017","name":"Entropy Reduction","type":"physical","time":0.5,"inputs":[{"resource":"crystal","amount":5},{"resource":"quantum_foam","amount":2}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"legendary"},{"id":"p018","name":"Mechanical Assembly","type":"physical","time":10,"inputs":[{"resource":"iron","amount":120},{"resource":"copper","amount":60},{"resource":"crystal","amount":36}],"outputs":[{"resource":"reverse_gear","amount":12}],"rarity":"mythic","batch":true,"batch_efficiency_bonus":1.2},{"id":"p019","name":"Quantum Gearing","type":"physical","time":1,"inputs":[{"resource":"quantum_foam","amount":5},{"resource":"platinum","amount":3}],"outputs":[{"resource":"reverse_gear","amount":1}],"rarity":"mythic"},{"id":"p020","name":"Chrono-Mechanical Spring","type":"physical","time":10,"inputs":[{"resource":"gold","amount":120},{"resource":"platinum","amount":72},{"resource":"temporal_fragment","amount":48}],"outputs":[{"resource":"chrono_spring","amount":24}],"rarity":"transcendent","batch":true,"batch_efficiency_bonus":1.2},{"id":"a001","name":"Conjure Mana","type":"arcane","time":1.5,"inputs":[{"resource":"time_energy","amount":1}],"outputs":[{"resource":"mana","amount":1}],"rarity":"common"},{"id":"a002","name":"Condense Essence","type":"arcane","time":0.5,"inputs":[{"resource":"mana","amount":4}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"a003","name":"Inscribe Rune","type":"arcane","time":0.5,"inputs":[{"resource":"essence","amount":2}],"outputs":[{"resource":"rune","amount":1}],"rarity":"rare"},{"id":"a004","name":"Distill Ether","type":"arcane","time":0.5,"inputs":[{"resource":"essence","amount":3}],"outputs":[{"resource":"ether","amount":1}],"rarity":"rare"},{"id":"a005","name":"Runic Amplification","type":"arcane","time":1,"inputs":[{"resource":"rune","amount":2},{"resource":"mana","amount":5}],"outputs":[{"resource":"ether","amount":1}],"rarity":"rare"},{"id":"a006","name":"Void Summoning","type":"arcane","time":1.5,"inputs":[{"resource":"ether","amount":2},{"resource":"rune","amount":3}],"outputs":[{"resource":"void_shard","amount":1}],"rarity":"epic"},{"id":"a007","name":"Mana Infusion","type":"arcane","time":2,"inputs":[{"resource":"raw_matter","amount":2},{"resource":"mana","amount":1}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"a008","name":"Crystal Enchantment","type":"arcane","time":0.5,"inputs":[{"resource":"crystal","amount":1},{"resource":"mana","amount":3}],"outputs":[{"resource":"rune","amount":1}],"rarity":"rare"},{"id":"a009","name":"Ethereal Transmutation","type":"arcane","time":1,"inputs":[{"resource":"rune","amount":3},{"resource":"essence","amount":2}],"outputs":[{"resource":"ether","amount":1}],"rarity":"epic"},{"id":"a010","name":"Void Ritual","type":"arcane","time":12.5,"inputs":[{"resource":"ether","amount":45},{"resource":"rune","amount":75}],"outputs":[{"resource":"void_shard","amount":15}],"rarity":"legendary","batch":true,"batch_efficiency_bonus":1.2},{"id":"a011","name":"Arcane Channeling","type":"arcane","time":0.5,"inputs":[{"resource":"time_energy","amount":1},{"resource":"energy","amount":1}],"outputs":[{"resource":"mana","amount":2}],"rarity":"epic"},{"id":"a012","name":"Essence Weaving","type":"arcane","time":0.5,"inputs":[{"resource":"mana","amount":6},{"resource":"silver","amount":1}],"outputs":[{"resource":"essence","amount":2}],"rarity":"epic"},{"id":"a013","name":"Runic Circle","type":"arcane","time":1,"inputs":[{"resource":"essence","amount":4},{"resource":"crystal","amount":1}],"outputs":[{"resource":"rune","amount":2}],"rarity":"epic"},{"id":"a014","name":"Ether Confluence","type":"arcane","time":1,"inputs":[{"resource":"rune","amount":4},{"resource":"ether","amount":1}],"outputs":[{"resource":"ether","amount":2}],"rarity":"legendary"},{"id":"a015","name":"Void Manipulation","type":"arcane","time":2.5,"inputs":[{"resource":"void_shard","amount":2},{"resource":"ether","amount":4}],"outputs":[{"resource":"void_shard","amount":3}],"rarity":"legendary"},{"id":"a016","name":"Temporal Enchantment","type":"arcane","time":0.5,"inputs":[{"resource":"ether","amount":5},{"resource":"void_shard","amount":2}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"legendary"},{"id":"a017","name":"Void Tempering","type":"arcane","time":10,"inputs":[{"resource":"void_shard","amount":72},{"resource":"rune","amount":192}],"outputs":[{"resource":"temporal_fragment","amount":24}],"rarity":"mythic","batch":true,"batch_efficiency_bonus":1.2},{"id":"a018","name":"Arcane Mechanism","type":"arcane","time":1,"inputs":[{"resource":"ether","amount":8},{"resource":"void_shard","amount":2}],"outputs":[{"resource":"reverse_gear","amount":1}],"rarity":"mythic"},{"id":"a019","name":"Void Spring","type":"arcane","time":0.5,"inputs":[{"resource":"void_shard","amount":4},{"resource":"ether","amount":6}],"outputs":[{"resource":"chrono_spring","amount":1}],"rarity":"transcendent"},{"id":"a020","name":"Mana Multiplication","type":"arcane","time":0.5,"inputs":[{"resource":"mana","amount":5},{"resource":"essence","amount":1}],"outputs":[{"resource":"mana","amount":8}],"rarity":"epic"},{"id":"o001","name":"Manifest Thought","type":"other","time":2.5,"inputs":[{"resource":"hokma_points","amount":1}],"outputs":[{"resource":"thought","amount":1}],"rarity":"common"},{"id":"o002","name":"Contemplate Paradox","type":"other","time":1,"inputs":[{"resource":"thought","amount":6}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"unusual"},{"id":"o003","name":"Dream Weaving","type":"other","time":0.5,"inputs":[{"resource":"thought","amount":5}],"outputs":[{"resource":"dream_dust","amount":1}],"rarity":"unusual"},{"id":"o004","name":"Infinite Recursion","type":"other","time":10,"inputs":[{"resource":"paradox","amount":16}],"outputs":[{"resource":"infinity_shard","amount":8}],"rarity":"rare","batch":true,"batch_efficiency_bonus":1.2},{"id":"o005","name":"Capture Time","type":"other","time":1.5,"inputs":[{"resource":"dream_dust","amount":3}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"rare"},{"id":"o006","name":"Thought Amplification","type":"other","time":1,"inputs":[{"resource":"thought","amount":3},{"resource":"energy","amount":2}],"outputs":[{"resource":"thought","amount":5}],"rarity":"unusual"},{"id":"o007","name":"Paradox Resolution","type":"other","time":1.5,"inputs":[{"resource":"paradox","amount":1},{"resource":"thought","amount":8}],"outputs":[{"resource":"paradox","amount":2}],"rarity":"rare"},{"id":"o008","name":"Dream Crystallization","type":"other","time":1,"inputs":[{"resource":"dream_dust","amount":2},{"resource":"crystal","amount":1}],"outputs":[{"resource":"dream_dust","amount":3}],"rarity":"epic"},{"id":"o009","name":"Infinity Contemplation","type":"other","time":1,"inputs":[{"resource":"paradox","amount":3},{"resource":"dream_dust","amount":2}],"outputs":[{"resource":"infinity_shard","amount":1}],"rarity":"epic"},{"id":"o010","name":"Thought-Matter Bridge","type":"other","time":0.5,"inputs":[{"resource":"thought","amount":2},{"resource":"raw_matter","amount":1}],"outputs":[{"resource":"dream_dust","amount":1}],"rarity":"unusual"},{"id":"o011","name":"Paradox Formation","type":"other","time":1,"inputs":[{"resource":"thought","amount":4},{"resource":"mana","amount":3}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"rare"},{"id":"o012","name":"Dream Fusion","type":"other","time":4,"inputs":[{"resource":"dream_dust","amount":4},{"resource":"essence","amount":1}],"outputs":[{"resource":"dream_dust","amount":6}],"rarity":"epic"},{"id":"o013","name":"Infinite Loop","type":"other","time":1.5,"inputs":[{"resource":"infinity_shard","amount":1},{"resource":"paradox","amount":2}],"outputs":[{"resource":"infinity_shard","amount":2}],"rarity":"legendary"},{"id":"o014","name":"Temporal Thought","type":"other","time":0.5,"inputs":[{"resource":"thought","amount":10},{"resource":"quantum_foam","amount":1}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"legendary"},{"id":"o015","name":"Dream Time","type":"other","time":0.5,"inputs":[{"resource":"dream_dust","amount":5},{"resource":"ether","amount":1}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"legendary"},{"id":"o016","name":"Paradoxical Causality","type":"other","time":10,"inputs":[{"resource":"paradox","amount":72},{"resource":"temporal_fragment","amount":24}],"outputs":[{"resource":"causality_chain","amount":24}],"rarity":"mythic","batch":true,"batch_efficiency_bonus":1.2},{"id":"o017","name":"Infinity Causation","type":"other","time":0.5,"inputs":[{"resource":"infinity_shard","amount":2},{"resource":"temporal_fragment","amount":1}],"outputs":[{"resource":"causality_chain","amount":1}],"rarity":"mythic"},{"id":"o018","name":"Reverse Causality","type":"other","time":0.5,"inputs":[{"resource":"causality_chain","amount":2},{"resource":"paradox","amount":4}],"outputs":[{"resource":"reverse_gear","amount":1}],"rarity":"transcendent"},{"id":"o019","name":"Infinite Spring","type":"other","time":0.5,"inputs":[{"resource":"infinity_shard","amount":3},{"resource":"temporal_fragment","amount":2}],"outputs":[{"resource":"chrono_spring","amount":1}],"rarity":"transcendent"},{"id":"o020","name":"Thought Spiral","type":"other","time":0.5,"inputs":[{"resource":"thought","amount":7},{"resource":"dream_dust","amount":1}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"epic"},{"id":"o021","name":"Dream Paradox","type":"other","time":0.5,"inputs":[{"resource":"dream_dust","amount":3},{"resource":"paradox","amount":1}],"outputs":[{"resource":"dream_dust","amount":5}],"rarity":"legendary"},{"id":"o022","name":"Infinite Thought","type":"other","time":1.5,"inputs":[{"resource":"thought","amount":12},{"resource":"infinity_shard","amount":1}],"outputs":[{"resource":"infinity_shard","amount":2}],"rarity":"legendary"},{"id":"o023","name":"Causality Weaving","type":"other","time":0.5,"inputs":[{"resource":"temporal_fragment","amount":3},{"resource":"infinity_shard","amount":1}],"outputs":[{"resource":"causality_chain","amount":1}],"rarity":"mythic"},{"id":"o024","name":"Temporal Paradox","type":"other","time":1.5,"inputs":[{"resource":"paradox","amount":2},{"resource":"temporal_fragment","amount":1}],"outputs":[{"resource":"temporal_fragment","amount":2}],"rarity":"legendary"},{"id":"o025","name":"Dream Infinity","type":"other","time":1.5,"inputs":[{"resource":"dream_dust","amount":6},{"resource":"infinity_shard","amount":1}],"outputs":[{"resource":"infinity_shard","amount":2}],"rarity":"legendary"},{"id":"o026","name":"Causality Loop","type":"other","time":2,"inputs":[{"resource":"causality_chain","amount":2},{"resource":"infinity_shard","amount":2}],"outputs":[{"resource":"causality_chain","amount":3}],"rarity":"mythic"},{"id":"o027","name":"Reverse Logic","type":"other","time":0.5,"inputs":[{"resource":"paradox","amount":5},{"resource":"causality_chain","amount":1}],"outputs":[{"resource":"reverse_gear","amount":1}],"rarity":"transcendent"},{"id":"o028","name":"Spring of Dreams","type":"other","time":10,"inputs":[{"resource":"dream_dust","amount":288},{"resource":"causality_chain","amount":48}],"outputs":[{"resource":"chrono_spring","amount":24}],"rarity":"transcendent","batch":true,"batch_efficiency_bonus":1.2},{"id":"o029","name":"Thought Resonance","type":"other","time":0.5,"inputs":[{"resource":"thought","amount":8},{"resource":"rune","amount":1}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"epic"},{"id":"o030","name":"Cosmic Thought","type":"other","time":1,"inputs":[{"resource":"hokma_points","amount":1},{"resource":"energy","amount":1}],"outputs":[{"resource":"thought","amount":2}],"rarity":"legendary"},{"id":"m001","name":"Quantum Dreams","type":"other","time":0.5,"inputs":[{"resource":"quantum_foam","amount":2},{"resource":"thought","amount":5}],"outputs":[{"resource":"dream_dust","amount":2}],"rarity":"epic"},{"id":"m002","name":"Void Paradox","type":"other","time":1,"inputs":[{"resource":"void_shard","amount":1},{"resource":"paradox","amount":2}],"outputs":[{"resource":"infinity_shard","amount":1}],"rarity":"legendary"},{"id":"m003","name":"Crystal Thought","type":"other","time":0.5,"inputs":[{"resource":"crystal","amount":2},{"resource":"thought","amount":3}],"outputs":[{"resource":"dream_dust","amount":1}],"rarity":"epic"},{"id":"m004","name":"Ethereal Thought","type":"other","time":0.5,"inputs":[{"resource":"ether","amount":1},{"resource":"thought","amount":4}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"epic"},{"id":"m005","name":"Mana Dream","type":"other","time":1.5,"inputs":[{"resource":"mana","amount":3},{"resource":"dream_dust","amount":1}],"outputs":[{"resource":"dream_dust","amount":2}],"rarity":"epic"},{"id":"m006","name":"Energy Thought","type":"other","time":0.5,"inputs":[{"resource":"energy","amount":4},{"resource":"thought","amount":2}],"outputs":[{"resource":"thought","amount":4}],"rarity":"epic"},{"id":"m007","name":"Quantum Paradox","type":"other","time":0.5,"inputs":[{"resource":"quantum_foam","amount":2},{"resource":"paradox","amount":1}],"outputs":[{"resource":"temporal_fragment","amount":1}],"rarity":"legendary"},{"id":"m008","name":"Void Infinity","type":"other","time":1.5,"inputs":[{"resource":"void_shard","amount":2},{"resource":"infinity_shard","amount":1}],"outputs":[{"resource":"infinity_shard","amount":2}],"rarity":"legendary"},{"id":"m009","name":"Ethereal Infinity","type":"other","time":1.5,"inputs":[{"resource":"ether","amount":3},{"resource":"infinity_shard","amount":1}],"outputs":[{"resource":"infinity_shard","amount":2}],"rarity":"legendary"},{"id":"m010","name":"Crystal Causality","type":"other","time":0.5,"inputs":[{"resource":"crystal","amount":5},{"resource":"temporal_fragment","amount":2}],"outputs":[{"resource":"causality_chain","amount":1}],"rarity":"mythic"},{"id":"m011","name":"Metal Gears","type":"other","time":12.5,"inputs":[{"resource":"iron","amount":180},{"resource":"copper","amount":90},{"resource":"causality_chain","amount":15}],"outputs":[{"resource":"reverse_gear","amount":15}],"rarity":"mythic","batch":true,"batch_efficiency_bonus":1.2},{"id":"m012","name":"Quantum Spring","type":"other","time":10,"inputs":[{"resource":"quantum_foam","amount":144},{"resource":"causality_chain","amount":48}],"outputs":[{"resource":"chrono_spring","amount":24}],"rarity":"transcendent","batch":true,"batch_efficiency_bonus":1.2},{"id":"m013","name":"Runic Thought","type":"other","time":0.5,"inputs":[{"resource":"rune","amount":2},{"resource":"thought","amount":3}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"epic"},{"id":"m014","name":"Essence Dream","type":"other","time":0.5,"inputs":[{"resource":"essence","amount":2},{"resource":"dream_dust","amount":1}],"outputs":[{"resource":"dream_dust","amount":2}],"rarity":"epic"},{"id":"m015","name":"Void Temporal","type":"other","time":1.5,"inputs":[{"resource":"void_shard","amount":1},{"resource":"temporal_fragment","amount":1}],"outputs":[{"resource":"temporal_fragment","amount":2}],"rarity":"legendary"},{"id":"r001","name":"Wood Construction","type":"physical","time":1,"inputs":[{"resource":"wood","amount":5},{"resource":"iron","amount":1}],"outputs":[{"resource":"wood","amount":6}],"rarity":"common"},{"id":"r002","name":"Stone Masonry","type":"physical","time":0.5,"inputs":[{"resource":"stone","amount":4},{"resource":"water","amount":2}],"outputs":[{"resource":"stone","amount":5}],"rarity":"common"},{"id":"r003","name":"Clay Pottery","type":"physical","time":0.5,"inputs":[{"resource":"clay","amount":3},{"resource":"energy","amount":2}],"outputs":[{"resource":"glass","amount":1}],"rarity":"common"},{"id":"r004","name":"Weave Fiber","type":"physical","time":1.5,"inputs":[{"resource":"fiber","amount":5}],"outputs":[{"resource":"fiber","amount":6}],"rarity":"common"},{"id":"r005","name":"Ash Alchemy","type":"arcane","time":0.5,"inputs":[{"resource":"ash","amount":3},{"resource":"mana","amount":2}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"r006","name":"Glass Enchantment","type":"arcane","time":0.5,"inputs":[{"resource":"glass","amount":2},{"resource":"mana","amount":4}],"outputs":[{"resource":"rune","amount":1}],"rarity":"rare"},{"id":"r007","name":"Iron to Copper","type":"physical","time":0.5,"inputs":[{"resource":"iron","amount":2},{"resource":"energy","amount":2}],"outputs":[{"resource":"copper","amount":1}],"rarity":"unusual"},{"id":"r008","name":"Stone to Iron Ore","type":"physical","time":0.5,"inputs":[{"resource":"stone","amount":6},{"resource":"coal","amount":2}],"outputs":[{"resource":"iron","amount":2}],"rarity":"unusual"},{"id":"r009","name":"Silver Catalyst","type":"physical","time":1.5,"inputs":[{"resource":"silver","amount":1},{"resource":"energy","amount":3}],"outputs":[{"resource":"silver","amount":1},{"resource":"crystal","amount":1}],"rarity":"rare"},{"id":"r010","name":"Golden Resonance","type":"arcane","time":0.5,"inputs":[{"resource":"gold","amount":1},{"resource":"mana","amount":5}],"outputs":[{"resource":"rune","amount":1}],"rarity":"rare"},{"id":"r011","name":"Cobalt Infusion","type":"other","time":0.5,"inputs":[{"resource":"cobalt","amount":1},{"resource":"thought","amount":6}],"outputs":[{"resource":"dream_dust","amount":2}],"rarity":"epic"},{"id":"r012","name":"Platinum Paradox","type":"other","time":1.5,"inputs":[{"resource":"platinum","amount":1},{"resource":"paradox","amount":1}],"outputs":[{"resource":"infinity_shard","amount":1}],"rarity":"epic"},{"id":"r013","name":"Wood to Coal","type":"physical","time":0.5,"inputs":[{"resource":"wood","amount":4}],"outputs":[{"resource":"coal","amount":2}],"rarity":"common"},{"id":"r014","name":"Fiber Enchantment","type":"arcane","time":0.5,"inputs":[{"resource":"fiber","amount":4},{"resource":"mana","amount":3}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"r015","name":"Water Purification","type":"physical","time":0.5,"inputs":[{"resource":"water","amount":3},{"resource":"sand","amount":1}],"outputs":[{"resource":"water","amount":4}],"rarity":"common"},{"id":"r016","name":"Clay to Stone","type":"physical","time":0.5,"inputs":[{"resource":"clay","amount":3},{"resource":"energy","amount":5}],"outputs":[{"resource":"stone","amount":2}],"rarity":"unusual"},{"id":"r017","name":"Glass Optics","type":"physical","time":0.5,"inputs":[{"resource":"glass","amount":3},{"resource":"silver","amount":1}],"outputs":[{"resource":"crystal","amount":1}],"rarity":"rare"},{"id":"r018","name":"Ash to Dirt","type":"physical","time":0.5,"inputs":[{"resource":"ash","amount":2},{"resource":"water","amount":1}],"outputs":[{"resource":"dirt","amount":3}],"rarity":"common"},{"id":"r019","name":"Dirt Compression","type":"physical","time":0.5,"inputs":[{"resource":"dirt","amount":10}],"outputs":[{"resource":"stone","amount":1}],"rarity":"common"},{"id":"r020","name":"Sand to Glass Direct","type":"physical","time":0.5,"inputs":[{"resource":"sand","amount":2},{"resource":"coal","amount":1}],"outputs":[{"resource":"glass","amount":1}],"rarity":"common"},{"id":"r021","name":"Iron Thoughts","type":"other","time":1,"inputs":[{"resource":"iron","amount":3},{"resource":"thought","amount":4}],"outputs":[{"resource":"paradox","amount":1}],"rarity":"rare"},{"id":"r022","name":"Copper Dreams","type":"other","time":1,"inputs":[{"resource":"copper","amount":2},{"resource":"dream_dust","amount":1}],"outputs":[{"resource":"dream_dust","amount":2}],"rarity":"unusual"},{"id":"r023","name":"Wood Spirits","type":"arcane","time":0.5,"inputs":[{"resource":"wood","amount":3},{"resource":"mana","amount":3}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"r024","name":"Stone Runes","type":"arcane","time":0.5,"inputs":[{"resource":"stone","amount":4},{"resource":"essence","amount":2}],"outputs":[{"resource":"rune","amount":1}],"rarity":"rare"},{"id":"r025","name":"Living Water","type":"arcane","time":0.5,"inputs":[{"resource":"water","amount":3},{"resource":"mana","amount":2}],"outputs":[{"resource":"essence","amount":1}],"rarity":"unusual"},{"id":"c001","name":"Assemble Backward Clock","type":"other","time":60,"inputs":[{"resource":"reverse_gear","amount":8},{"resource":"chrono_spring","amount":5},{"resource":"causality_chain","amount":6}],"outputs":[{"resource":"backward_clock","amount":1}],"rarity":"celestial"},{"id":"c002","name":"Ultimate Temporal Assembly","type":"other","time":20,"inputs":[{"resource":"reverse_gear","amount":12},{"resource":"chrono_spring","amount":8},{"resource":"temporal_fragment","amount":15},{"resource":"infinity_shard","amount":8}],"outputs":[{"resource":"backward_clock","amount":1}],"rarity":"celestial"},{"id":"c003","name":"Paradoxical Clock","type":"other","time":6,"inputs":[{"resource":"reverse_gear","amount":15},{"resource":"chrono_spring","amount":10},{"resource":"paradox","amount":30},{"resource":"causality_chain","amount":10}],"outputs":[{"resource":"backward_clock","amount":1}],"rarity":"celestial"},{"id":"p002_rare","name":"Efficient Energy Extraction","type":"physical","rarity":"rare","inputs":[{"resource":"raw_matter","amount":2}],"outputs":[{"resource":"energy","amount":2}],"time":2},{"id":"p002_epic","name":"Advanced Energy Extraction","type":"physical","rarity":"epic","inputs":[{"resource":"raw_matter","amount":2}],"outputs":[{"resource":"energy","amount":3}],"time":2.5},{"id":"p003_rare","name":"Efficient Iron Refining","type":"physical","rarity":"rare","inputs":[{"resource":"raw_matter","amount":3}],"outputs":[{"resource":"iron","amount":1}],"time":0.5},{"id":"p003_legendary","name":"Master Iron Forging","type":"physical","rarity":"legendary","inputs":[{"resource":"raw_matter","amount":2}],"outputs":[{"resource":"iron","amount":1}],"time":0.5},{"id":"a001_unusual","name":"Improved Mana Conjuring","type":"arcane","rarity":"unusual","inputs":[{"resource":"time_energy","amount":1}],"outputs":[{"resource":"mana","amount":2}],"time":2},{"id":"a001_epic","name":"Mass Mana Conjuring","type":"arcane","rarity":"epic","inputs":[{"resource":"time_energy","amount":1}],"outputs":[{"resource":"mana","amount":3}],"time":2},{"id":"o001_rare","name":"Deep Thought Manifestation","type":"other","rarity":"rare","inputs":[{"resource":"hokma_points","amount":1}],"outputs":[{"resource":"thought","amount":2}],"time":3.5},{"id":"o001_legendary","name":"Enlightened Thought Stream","type":"other","rarity":"legendary","inputs":[{"resource":"hokma_points","amount":1}],"outputs":[{"resource":"thought","amount":3}],"time":2.5},{"id":"p005_epic","name":"Perfect Crystallization","type":"physical","rarity":"epic","inputs":[{"resource":"energy","amount":3}],"outputs":[{"resource":"crystal","amount":1}],"time":1},{"id":"p005_mythic","name":"Quantum Crystal Formation","type":"physical","rarity":"mythic","inputs":[{"resource":"energy","amount":2}],"outputs":[{"resource":"crystal","amount":1}],"time":1},{"id":"a002_rare","name":"Concentrated Essence","type":"arcane","rarity":"rare","inputs":[{"resource":"mana","amount":3}],"outputs":[{"resource":"essence","amount":1}],"time":1},{"id":"a002_legendary","name":"Pure Essence Distillation","type":"arcane","rarity":"legendary","inputs":[{"resource":"mana","amount":2}],"outputs":[{"resource":"essence","amount":1}],"time":1},{"id":"o002_epic","name":"Paradox Breakthrough","type":"other","rarity":"epic","inputs":[{"resource":"thought","amount":4}],"outputs":[{"resource":"paradox","amount":1}],"time":0.5},{"id":"o002_transcendent","name":"Paradox Singularity","type":"other","rarity":"transcendent","inputs":[{"resource":"thought","amount":3}],"outputs":[{"resource":"paradox","amount":1}],"time":0.5},{"id":"p006d_legendary","name":"Philosopher's Gold","type":"physical","rarity":"legendary","inputs":[{"resource":"silver","amount":1},{"resource":"energy","amount":2}],"outputs":[{"resource":"gold","amount":1}],"time":0.5},{"id":"p006d_transcendent","name":"Alchemical Perfection","type":"physical","rarity":"transcendent","inputs":[{"resource":"copper","amount":1},{"resource":"energy","amount":3}],"outputs":[{"resource":"gold","amount":1}],"time":0.5},{"id":"p016_mythic","name":"Chrono Reversal","type":"physical","rarity":"mythic","inputs":[{"resource":"quantum_foam","amount":2},{"resource":"energy","amount":5}],"outputs":[{"resource":"temporal_fragment","amount":1}],"time":0.5},{"id":"o005_mythic","name":"Dream Time Capture","type":"other","rarity":"mythic","inputs":[{"resource":"dream_dust","amount":2}],"outputs":[{"resource":"temporal_fragment","amount":1}],"time":1.5}],"rarities":[{"name":"common","color":"#cccccc","efficiency_multiplier":1},{"name":"unusual","color":"#7cfc00","efficiency_multiplier":1.2},{"name":"rare","color":"#4169e1","efficiency_multiplier":1.5},{"name":"epic","color":"#9370db","efficiency_multiplier":2},{"name":"legendary","color":"#ffa500","efficiency_multiplier":3},{"name":"mythic","color":"#ff1493","efficiency_multiplier":5},{"name":"transcendent","color":"#00ffff","efficiency_multiplier":10},{"name":"celestial","color":"#ffd700","efficiency_multiplier":25}]};

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
