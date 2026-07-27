// Flavor text that displays based on player's essence count
// Used to show comparisons of scale as the player progresses

var displayThings = [
	function () {
		if ((player.points.gte(1444)) && (player.points.lt(8000)))
			return "[1st Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1444"))) + " carbon dioxide molecules."
	}
	, function () {
		if ((player.points.gte("8000")) && (player.points.lt("64000")))
			return "[2nd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8000"))) + " C60 molecules。"
	}
	, function () {
		if ((player.points.gte("64000")) && (player.points.lt("1e9")))
			return "[3rd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("64000"))) + " DNAs"
	}
	, function () {
		if ((player.points.gte("1e9")) && (player.points.lt("8e9")))
			return "[4th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1e9"))) + " hepatitis B virus."
	}
	, function () {
		if ((player.points.gte("8e9")) && (player.points.lt("1.25e12")))
			return "[5th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8e9"))) + " COVID-19 virus."
	}
	, function () {
		if ((player.points.gte("1.25e12")) && (player.points.lt("1.72e15")))
			return "[6th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.25e12"))) + " E. coli."
	}
	, function () {
		if ((player.points.gte("1.72e15")) && (player.points.lt("3.5e20")))
			return "[7th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.72e15"))) + " red cells."
	}
	, function () {
		if ((player.points.gte("3.5e20")) && (player.points.lt("1e21")))
			return "[8th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("3.5e20"))) + " egg cells."
	}
	, function () {
		if ((player.points.gte("1e21")) && (player.points.lt("1e24")))
			return "[9th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1e21"))) + " salt particles."
	}
	, function () {
		if ((player.points.gte("1e24")) && (player.points.lt("1.2e26")))
			return "[10th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1e24"))) + " rice particles."
	}
	, function () {
		if ((player.points.gte("1.2e26")) && (player.points.lt("1e30")))
			return "[11st Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.2e26"))) + " 1 dollar coins."
	}
	, function () {
		if ((player.points.gte("1e30")) && (player.points.lt("1.25e35")))
			return "[12nd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1e30"))) + " basketballs."
	}
	, function () {
		if ((player.points.gte("1.25e35")) && (player.points.lt("1e39")))
			return "[13rd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.25e35"))) + " authors."
	}
	, function () {
		if ((player.points.gte("1e39")) && (player.points.lt("8e42")))
			return "[14th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1e39"))) + " normal shuttlecrafts."
	}
	, function () {
		if ((player.points.gte("8e42")) && (player.points.lt("1.6e47")))
			return "[15th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8e42"))) + " Eiffel Towers."
	}
	, function () {
		if ((player.points.gte("1.6e47")) && (player.points.lt("1.28e48")))
			return "[16th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.6e47"))) + " Mount Qomolangmas."
	}
	, function () {
		if ((player.points.gte("1.28e48")) && (player.points.lt("1.28e51")))
			return "[17th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.28e48"))) + " neutron stars."
	}
	, function () {
		if ((player.points.gte("1.28e51")) && (player.points.lt("1.16e53")))
			return "[18th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.28e51"))) + " Phoebes"
	}
	, function () {
		if ((player.points.gte("1.16e53")) && (player.points.lt("2.19e54")))
			return "[19th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.16e53"))) + " Ceres."
	}
	, function () {
		if ((player.points.gte("2.19e54")) && (player.points.lt("6.64e54")))
			return "[20th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("2.19e54"))) + " Plutos."
	}
	, function () {
		if ((player.points.gte("6.64e54")) && (player.points.lt("3.5e56")))
			return "[21st Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("6.64e54"))) + " Moons."
	}
	, function () {
		if ((player.points.gte("3.5e56")) && (player.points.lt("4.93e59")))
			return "[22nd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("3.5e56"))) + " Earths."
	}
	, function () {
		if ((player.points.gte("4.93e59")) && (player.points.lt("1.61e60")))
			return "[23rd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("4.93e59"))) + " Jupitars."
	}
	, function () {
		if ((player.points.gte("1.61e60")) && (player.points.lt("5.52e62")))
			return "[24th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.61e60"))) + " Proxima Centauris."
	}
	, function () {
		if ((player.points.gte("5.52e62")) && (player.points.lt("2.71e63")))
			return "[25th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("5.52e62"))) + " Suns."
	}
	, function () {
		if ((player.points.gte("2.71e63")) && (player.points.lt("9.36e66")))
			return "[26th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("2.71e63"))) + " Siriuses."
	}
	, function () {
		if ((player.points.gte("9.36e66")) && (player.points.lt("1.02e70")))
			return "[27th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("9.36e66"))) + " Arcturuses."
	}
	, function () {
		if ((player.points.gte("1.02e70")) && (player.points.lt("8.51e71")))
			return "[28th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.02e70"))) + " Eta Carinae A."
	}
	, function () {
		if ((player.points.gte("8.51e71")) && (player.points.lt("1.5e78")))
			return "[29th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8.51e71"))) + " Betelgeuses."
	}
	, function () {
		if ((player.points.gte("1.5e78")) && (player.points.lt("2.6e84")))
			return "[30th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.5e78"))) + " Big mass black holes."
	}
	, function () {
		if ((player.points.gte("2.6e84")) && (player.points.lt("8.77e86")))
			return "[31st Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("2.6e84"))) + " Oort clouds."
	}
	, function () {
		if ((player.points.gte("8.77e86")) && (player.points.lt("8.77e89")))
			return "[32nd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8.77e86"))) + " Orion Cantilevers."
	}
	, function () {
		if ((player.points.gte("8.77e89")) && (player.points.lt("6.49e94")))
			return "[33rd Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("8.77e89"))) + " Milky galaxies."
	}
	, function () {
		if ((player.points.gte("6.49e94")) && (player.points.lt("1.75e100")))
			return "[34th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("6.49e94"))) + " IC 1101s."
	}
	, function () {
		if ((player.points.gte("1.75e100")) && (player.points.lt("3.38e103")))
			return "[35th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.75e100"))) + " Local Superclusters."
	}
	, function () {
		if ((player.points.gte("3.38e103")) && (player.points.lt("1.05e109")))
			return "[36th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("3.38e103"))) + " Sloan Great Walls."
	}
	, function () {
		if ((player.points.gte("1.05e109")) && (player.points.add(1).log10().lt(200)))
			return "[37th Kether Dimension] If every essence has a radius of hydrogen atoms, then they can create " + format(player.points.div(new Decimal("1.05e109"))) + " Observable universes."
	}
	, function () {
		if ((player.points.add(1).log10().gte(200)) && (player.points.add(1).log10().lt(240)))
			return "<text style='color:grey'>[1st Hokma Dimension] If you write 2 numbers per second, writing down your essence amount will need " + formatTime(player.points.add(1).log10().div(2)) + ". During this period, the author has already completed " + format(player.points.add(1).log10().div(2).div(60).mul(32)) + " sit ups."
	}
	, function () {
		if ((player.points.add(1).log10().gte(240)) && (player.points.add(1).log10().lt(494)))
			return "<text style='color:grey'>[2nd Hokma Dimension] If you write 2 numbers per second, writing down your essence amount will need " + formatTime(player.points.add(1).log10().div(2)) + ". During this period, the author has already completed " + format(player.points.add(1).log10().div(2).div(60).div(3.75).mul(100)) + "% of 800m run."
	}
	, function () {
		if ((player.points.add(1).log10().gte(494)) && (player.points.add(1).log10().lt(835)))
			return "<text style='color:grey'>[3rd Hokma Dimension] If you write 2 numbers per second, writing down your essence amount will need " + formatTime(player.points.add(1).log10().div(2)) + ". During this period,  you will have completed " + format(player.points.add(1).log10().div(2).div(835).mul(100)) + "% of the Final Challenge of this game."
	},
	function () {
		if ((player.points.add(1).log10().gte(835)) && (player.points.add(1).log10().lt(1000000)))
			return "<text style='color:grey'>[4th Hokma Dimension] If you write 2 numbers per second, writing down your essence amount will need " + formatTime(player.points.add(1).log10().div(2)) + ". During this period,  you will have completed " + format(player.points.add(1).log10().div(2).div(835)) + " Final Challenges of this game."
	},
]
