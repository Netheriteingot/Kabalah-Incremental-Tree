# Backward Clock Crafting System

A comprehensive crafting system for creating the ultimate goal: the **Backward Clock**.

## Overview

This system consists of:
- **34 resources** (plus 3 infinite currencies)
- **149 recipes** distributed across three types and eight rarities
- A balanced time/value economy where recipes with higher rarities have better efficiency
- **8 rarity tiers** with efficiency multipliers from 1× to 25×

## Rarity System

### Rarity Tiers

The game features **8 rarity tiers** that determine recipe efficiency:

| Rarity | Color | Efficiency Multiplier | Count | Description |
|--------|-------|----------------------|-------|-------------|
| **Common** | Gray (#cccccc) | 1.0× | 28 | Basic gathering and simple conversions |
| **Unusual** | Green (#7cfc00) | 1.2× | 19 | Improved basic recipes and intermediate processing |
| **Rare** | Blue (#4169e1) | 1.5× | 25 | Advanced conversions and efficient alternatives |
| **Epic** | Purple (#9370db) | 2.0× | 28 | Complex transformations and powerful recipes |
| **Legendary** | Orange (#ffa500) | 3.0× | 24 | Quantum and void-level processes |
| **Mythic** | Pink (#ff1493) | 5.0× | 13 | Temporal and causality manipulation |
| **Transcendent** | Cyan (#00ffff) | 10.0× | 9 | Advanced component creation |
| **Celestial** | Gold (#ffd700) | 25.0× | 3 | Final clock assembly recipes |

### How Rarities Work

1. **Efficiency Scaling**: Higher rarity recipes complete faster for the same value gain, or produce more output for the same input.

2. **Duplicate Recipes**: Many recipes have multiple rarity variants:
   - Example: "Generate Raw Matter" exists as common (1 output) and rare (2 output) versions
   - Example: "Mana Conjuring" has unusual (2 mana) and epic (3 mana) variants
   - Example: "Energy Extraction" can output 1, 2, or 3 energy depending on rarity

3. **Time Balancing**: All recipe times are calculated using the formula:
   ```
   time = net_value / (base_efficiency × rarity_multiplier)
   ```
   Where base_efficiency = 1.5 value/second

4. **Progressive Discovery**: Players start with common recipes and unlock higher rarities through gameplay progression.

### Example Rarity Comparison

**Energy Extraction Comparison:**
- **Common (p002)**: 2 Raw Matter → 1 Energy in 0.5s (efficiency: 1.0×)
- **Rare (p002_rare)**: 2 Raw Matter → 2 Energy in 1.0s (efficiency: 1.5×)
- **Epic (p002_epic)**: 2 Raw Matter → 3 Energy in 1.5s (efficiency: 2.0×)

**Mana Conjuring Comparison:**
- **Common (a001)**: 1 Time Energy → 1 Mana in 0.5s
- **Unusual (a001_unusual)**: 1 Time Energy → 2 Mana in 1.0s (1.2× better)
- **Epic (a001_epic)**: 1 Time Energy → 3 Mana in 1.5s (2.0× better)

## Resources

### Currencies (Infinite)
- **Kether Points**: Divine energy for physical creation
- **Time Energy**: Harvested temporal energy for arcane creation  
- **Hokma Points**: Wisdom energy for abstract creation

### Physical Resources (19)

#### Basic Materials (11)
| Resource | Value | Description |
|----------|-------|-------------|
| Raw Matter | 1 | Basic physical substance |
| Dirt | 0.5 | Common earth and soil |
| Wood | 2 | Natural timber from trees |
| Stone | 2 | Solid rock material |
| Water | 1 | Pure H2O liquid |
| Sand | 1 | Fine granular material |
| Clay | 2 | Malleable earth material |
| Coal | 3 | Combustible black rock |
| Ash | 1 | Residue from burning |
| Glass | 4 | Transparent solid material |
| Fiber | 2 | Thin thread-like material |

#### Metals (6)
| Resource | Value | Description |
|----------|-------|-------------|
| Energy | 3 | Pure energy extracted from matter |
| Iron | 4 | Common ferrous metal |
| Copper | 5 | Reddish conductive metal |
| Cobalt | 7 | Blue-tinted transition metal |
| Silver | 8 | Lustrous precious metal |
| Gold | 10 | Valuable yellow noble metal |
| Platinum | 12 | Dense silvery-white precious metal |

#### Advanced Physical (2)
| Resource | Value | Description |
|----------|-------|-------------|
| Crystal | 12 | Crystalline structure with high energy density |
| Quantum Foam | 20 | Unstable quantum particles |

### Arcane Resources (5)
| Resource | Value | Description |
|----------|-------|-------------|
| Mana | 2 | Raw magical essence |
| Essence | 8 | Concentrated magical essence |
| Rune | 15 | Mystical symbol with power |
| Ether | 25 | Pure arcane substance |
| Void Shard | 40 | Fragment of the void between worlds |

### Abstract/Other Resources (10)
| Resource | Value | Description |
|----------|-------|-------------|
| Thought | 4 | Crystallized conscious thought |
| Dream Dust | 10 | Residue from the realm of dreams |
| Paradox | 18 | Logical impossibility made manifest |
| Temporal Fragment | 30 | Captured moment of time |
| Infinity Shard | 35 | A piece of infinity itself |
| Causality Chain | 50 | Linked cause and effect |
| Reverse Gear | 80 | Mechanism that moves backward |
| Chrono Spring | 100 | Spring wound by time itself |
| **Backward Clock** | **1000** | **A clock that runs backward through time** |

## Recipe Categories

### Recipe Distribution by Type and Rarity

**By Type:**
- Physical recipes: ~45 (30%)
- Arcane recipes: ~30 (20%)
- Other/Abstract recipes: ~74 (50%)

**By Rarity:**
- Common: 28 recipes (basic gameplay)
- Unusual: 19 recipes (early-mid game)
- Rare: 25 recipes (mid game)
- Epic: 28 recipes (mid-late game)
- Legendary: 24 recipes (late game)
- Mythic: 13 recipes (endgame)
- Transcendent: 9 recipes (final components)
- Celestial: 3 recipes (ultimate goal)

### Notable Recipe Chains by Rarity

**Common Tier (Starting Recipes):**
- Basic gathering: Kether Points → Raw Matter, Dirt, Wood, Stone, Water
- Simple processing: Wood → Energy + Ash, Dirt → Sand
- Basic metals: Raw Matter → Iron, Copper

**Unusual-Rare Tier (Early Progression):**
- Improved gathering: Better output ratios for basic resources
- Metal progression: Iron → Copper → Silver
- Basic magic: Mana → Essence

**Epic-Legendary Tier (Mid-Late Game):**
- Advanced metals: Silver → Gold → Platinum
- Quantum physics: Energy + Crystal → Quantum Foam
- Void magic: Ether + Rune → Void Shard
- Abstract concepts: Thought → Paradox → Infinity Shard

**Mythic-Transcendent Tier (Endgame):**
- Temporal manipulation: Quantum Foam → Temporal Fragment
- Causality chains: Paradox + Temporal Fragment → Causality Chain
- Component creation: Metals + Temporal Fragments → Reverse Gear, Chrono Spring

**Celestial Tier (Victory):**
- Final assembly: Components → Backward Clock

## Creating the Backward Clock

There are **3 different recipes** to create the ultimate Backward Clock, all at **Celestial** rarity:

The clock is a terminal sink (always 1 clock out). The three recipes trade **input cost against time**: the cheap recipe makes you pay in time (a long 60s ritual), while the expensive recipe finishes almost instantly (6s). Costlier pile → much shorter craft. Players who over-invest in resources are rewarded with a near-instant finale.

### Recipe 1: Assemble Backward Clock (c001) — the patient path
- **Rarity**: Celestial
- **Time**: 60 seconds (longest — you pay in time)
- **Requirements**: 8 Reverse Gear + 5 Chrono Spring + 6 Causality Chain
- **Total Input Value**: 1440 (only 24 value/s — cheapest pile)
- **Best for**: Reaching the goal with the fewest resources

### Recipe 2: Ultimate Temporal Assembly (c002) — the balanced path
- **Rarity**: Celestial
- **Time**: 20 seconds
- **Requirements**: 12 Reverse Gear + 8 Chrono Spring + 15 Temporal Fragment + 8 Infinity Shard
- **Total Input Value**: 2490 (124 value/s)
- **Best for**: A middle ground of cost and speed

### Recipe 3: Paradoxical Clock (c003) — the power path
- **Rarity**: Celestial
- **Time**: 6 seconds (near-instant — costliest pile)
- **Requirements**: 15 Reverse Gear + 10 Chrono Spring + 30 Paradox + 10 Causality Chain
- **Total Input Value**: 3240 (540 value/s — highest throughput)
- **Best for**: Cashing in a huge stockpile for an almost-immediate win

## Long "Batch/Ritual" Recipes

A subset of high-tier recipes have been converted into **long batch operations** (10–12.5 seconds). These scale both inputs *and* outputs by an integer factor, but their time is reduced by a **1.2× efficiency bonus** — so a batch produces output **20% faster per second** than crafting the same items one at a time. This rewards committing to large, satisfying bulk rituals over rapid-fire single crafts.

| Recipe | Rarity | Time | Batch | Recipe |
|--------|--------|------|-------|--------|
| Thermodynamic Reversal (p016) | Legendary | 10s | ×24 | 72 Quantum Foam + 240 Energy → 24 Temporal Fragment |
| Mechanical Assembly (p018) | Mythic | 10s | ×12 | 120 Iron + 60 Copper + 36 Crystal → 12 Reverse Gear |
| Chrono-Mechanical Spring (p020) | Transcendent | 10s | ×24 | 120 Gold + 72 Platinum + 48 Temporal Fragment → 24 Chrono Spring |
| Void Ritual (a010) | Legendary | 12.5s | ×15 | 45 Ether + 75 Rune → 15 Void Shard |
| Void Tempering (a017) | Mythic | 10s | ×24 | 72 Void Shard + 192 Rune → 24 Temporal Fragment |
| Infinite Recursion (o004) | Rare | 10s | ×8 | 16 Paradox → 8 Infinity Shard |
| Paradoxical Causality (o016) | Mythic | 10s | ×24 | 72 Paradox + 24 Temporal Fragment → 24 Causality Chain |
| Spring of Dreams (o028) | Transcendent | 10s | ×24 | 288 Dream Dust + 48 Causality Chain → 24 Chrono Spring |
| Metal Gears (m011) | Mythic | 12.5s | ×15 | 180 Iron + 90 Copper + 15 Causality Chain → 15 Reverse Gear |
| Quantum Spring (m012) | Transcendent | 10s | ×24 | 144 Quantum Foam + 48 Causality Chain → 24 Chrono Spring |

These recipes carry `"batch": true` and `"batch_efficiency_bonus": 1.2` flags in the JSON so the UI can render them differently (progress bar, bulk quantities) and surface the efficiency edge. Fast single-craft alternatives for the same outputs remain available, giving players a "commit to a fast bulk ritual vs. flexible single trickle" choice — the bulk path is 20% more efficient as the reward for committing.

## Economy Balancing with Rarities

### Time Calculation Formula

All recipe times are automatically calculated using:
```
time = net_value_gain / (base_efficiency × rarity_multiplier)
```

Where:
- `net_value_gain` = (output value) - (input value)
- `base_efficiency` = 1.5 value/second
- `rarity_multiplier` = 1.0 to 25.0 based on rarity

### Efficiency by Rarity Tier

| Rarity | Base Efficiency (value/sec) | Example Recipe Time |
|--------|----------------------------|---------------------|
| Common | 1.5 | 1 value → 0.67s |
| Unusual | 1.8 | 1 value → 0.56s |
| Rare | 2.25 | 1 value → 0.44s |
| Epic | 3.0 | 1 value → 0.33s |
| Legendary | 4.5 | 1 value → 0.22s |
| Mythic | 7.5 | 1 value → 0.13s |
| Transcendent | 15.0 | 1 value → 0.07s |
| Celestial | 37.5 | 1 value → 0.03s |

### Why Higher Rarities Matter

1. **Speed**: Complete recipes much faster
2. **Efficiency**: Get more output for the same input
3. **Flexibility**: Access to alternative recipe paths
4. **Progression**: Natural sense of advancement as you unlock higher rarities

## Duplicate Recipes Added

The system includes **18 duplicate recipes** at higher rarities:

### Energy & Matter
- `p002_rare`: Efficient Energy Extraction (2→2 energy)
- `p002_epic`: Advanced Energy Extraction (2→3 energy)
- `p003_rare`: Efficient Iron Refining (3 raw matter)
- `p003_legendary`: Master Iron Forging (2 raw matter)

### Arcane Power
- `a001_unusual`: Improved Mana Conjuring (→2 mana)
- `a001_epic`: Mass Mana Conjuring (→3 mana)
- `a002_rare`: Concentrated Essence (3 mana needed)
- `a002_legendary`: Pure Essence Distillation (2 mana needed)

### Abstract Concepts
- `o001_rare`: Deep Thought Manifestation (→2 thought)
- `o001_legendary`: Enlightened Thought Stream (→3 thought)
- `o002_epic`: Paradox Breakthrough (4 thought needed)
- `o002_transcendent`: Paradox Singularity (3 thought needed)

### Advanced Materials
- `p005_epic`: Perfect Crystallization (3 energy)
- `p005_mythic`: Quantum Crystal Formation (2 energy)
- `p006d_legendary`: Philosopher's Gold (1 silver + 2 energy)
- `p006d_transcendent`: Alchemical Perfection (1 copper + 3 energy → gold!)

### Temporal
- `p016_mythic`: Chrono Reversal (2 quantum foam + 5 energy)
- `o005_mythic`: Dream Time Capture (2 dream dust only)

## Progression Guide with Rarities

### Phase 1: Common Era (0-5 minutes)
**Goal**: Establish basic resource gathering
- Focus on **common** recipes to gather dirt, wood, stone, water
- Start metal progression with common iron/copper recipes
- Generate mana and thoughts with common currency recipes
- **Key milestone**: Accumulate 100+ basic resources

### Phase 2: Unusual Discoveries (5-15 minutes)
**Goal**: Unlock and use unusual recipes for better efficiency
- Discover unusual-tier gathering recipes (1.2× efficiency)
- Build up sand, clay, glass production chains
- Start using improved mana/thought generation
- **Key milestone**: Unlock rare-tier recipes

### Phase 3: Rare Mastery (15-30 minutes)
**Goal**: Access rare recipes and establish metal chains
- Use rare recipes for 1.5× efficiency boost
- Complete metal ladder: iron → copper → silver → gold
- Generate essence and dream dust efficiently
- **Key milestone**: First crystal and quantum foam production

### Phase 4: Epic Power (30-50 minutes)
**Goal**: Master epic recipes and complex transformations
- 2× efficiency with epic recipes dramatically speeds progression
- Focus on platinum production and advanced metals
- Create void shards and infinity shards
- Start generating temporal fragments
- **Key milestone**: First temporal fragment

### Phase 5: Legendary Achievements (50-80 minutes)
**Goal**: Access legendary recipes for quantum/void mastery
- 3× efficiency makes high-value recipes viable
- Mass-produce quantum foam and void shards
- Build up temporal fragment stockpile
- Begin causality chain formation
- **Key milestone**: 10+ temporal fragments

### Phase 6: Mythic Ascension (80-120 minutes)
**Goal**: Use mythic recipes for component creation
- 5× efficiency enables rapid component production
- Create reverse gears (80 value each)
- Create chrono springs (100 value each)
- Stockpile causality chains
- **Key milestone**: First reverse gear and chrono spring

### Phase 7: Transcendent Crafting (120-150 minutes)
**Goal**: Mass-produce components with 10× efficiency
- Use transcendent recipes to rapidly build components
- Aim for 5-10 reverse gears
- Aim for 3-7 chrono springs
- Stockpile 4-20 paradoxes or causality chains (depending on final recipe choice)
- **Key milestone**: All components for one clock recipe

### Phase 8: Celestial Completion (150+ minutes)
**Goal**: Assemble the Backward Clock
- Choose your final recipe based on available resources
- Use celestial 25× efficiency for near-instant completion
- **Victory**: Create the Backward Clock!

## Strategy Tips by Rarity

### Early Game Strategy
- Don't ignore common recipes! They're your foundation
- Look for unusual variants as soon as possible (20% efficiency boost adds up)
- Focus on gathering recipes before processing recipes

### Mid Game Strategy
- Prioritize unlocking rare and epic recipes
- Epic recipes (2× efficiency) are a major power spike
- Start exploring all three paths (physical, arcane, other) for synergies

### Late Game Strategy
- Legendary and mythic recipes make expensive conversions viable
- Don't try to force one path—use the best rarity recipes you have access to
- Temporal fragments are the bottleneck—use all available recipes

### Endgame Strategy
- Transcendent recipes make component crafting fast
- Calculate which celestial clock recipe fits your stockpile best
- Recipe c001 (balanced) is usually easiest
- Recipe c003 (paradox-heavy) is hardest but most satisfying

## File Structure

```
D:/Hbc/
├── crafting_system.json         # Complete system definition with rarities
├── crafting_system_backup.json  # Backup before rarity system
├── rebalance_recipes.py         # Script used to add rarities and rebalance
└── README.md                    # This documentation
```

## JSON Structure

The `crafting_system.json` file contains:

```json
{
  "resources": [...],      // Array of all resources with id, name, type, description, value
  "currencies": [...],     // Array of infinite currencies
  "recipes": [...],        // Array of all recipes with inputs, outputs, time, type, rarity
  "rarities": [...]        // Rarity definitions with colors and multipliers
}
```

Each resource has:
- `id`: Unique identifier
- `name`: Human-readable name
- `type`: "physical", "arcane", or "other"
- `description`: Flavor text
- `value`: Numeric value for balancing

Each recipe has:
- `id`: Unique identifier
- `name`: Human-readable name
- `type`: "physical", "arcane", or "other"
- `rarity`: "common", "unusual", "rare", "epic", "legendary", "mythic", "transcendent", or "celestial"
- `time`: Seconds required (auto-calculated based on rarity)
- `inputs`: Array of {resource, amount}
- `outputs`: Array of {resource, amount}

## Statistics

- **Total Resources**: 34 (+ 3 currencies)
- **Physical Resources**: 19
- **Arcane Resources**: 5
- **Other Resources**: 10
- **Total Recipes**: 149 (increased from 93)
- **Average Recipe Time**: ~1.2 seconds (varies widely by rarity)
- **Fastest Recipe**: ~0.5 seconds (common currency generation)
- **Slowest Recipe**: ~5.0 seconds (celestial paradoxical clock)

### Rarity Distribution
- Common: 28 (18.8%)
- Unusual: 19 (12.8%)
- Rare: 25 (16.8%)
- Epic: 28 (18.8%)
- Legendary: 24 (16.1%)
- Mythic: 13 (8.7%)
- Transcendent: 9 (6.0%)
- Celestial: 3 (2.0%)

## Implementation Notes

### For Game Developers

1. **Recipe Discovery System**: Gate higher-rarity recipes behind progression milestones
2. **UI Color Coding**: Use the provided color codes for each rarity tier
3. **Tooltip Display**: Show efficiency multiplier and compare to common variant
4. **Unlock Conditions**: Suggest unlocking recipes of rarity N after crafting X recipes of rarity N-1
5. **Balance Knobs**: Adjust `BASE_EFFICIENCY` in the rebalancing script to tune overall game speed

### Rebalancing

To adjust recipe times:
1. Edit `BASE_EFFICIENCY` in [rebalance_recipes.py](D:/Hbc/rebalance_recipes.py)
2. Modify `RARITY_MULTIPLIERS` if you want different rarity scaling
3. Run `python rebalance_recipes.py` to regenerate times
4. Review changes and test

## Future Expansion Ideas

- **Recipe Evolution**: Upgrade common recipes to higher rarities through gameplay
- **Rarity Crafting**: Combine lower-rarity recipes to create higher-rarity versions
- **Catalyst System**: Special items that temporarily boost recipe rarity
- **Prestige Rarities**: Beyond celestial—cosmic, divine, absolute tiers
- **Rarity Achievements**: Unlock bonuses for crafting X recipes of each rarity
- **Recipe Fusion**: Combine two recipes to create a new higher-rarity hybrid
- **Seasonal Rarities**: Limited-time ultra-rare recipe variants

---

*System designed for balanced progression with multiple viable paths and a deep rarity system.*
*Now featuring 149 recipes across 8 rarity tiers with automatically balanced efficiency scaling.*
*Last updated: 2026-07-27*
