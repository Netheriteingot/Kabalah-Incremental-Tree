// News Ticker System
// Scrolling text displayed at the bottom of the game with various lore snippets

var texts = [
	"Kether lived the first twenty-two years of his life near a small town in the Pigeon Kingdom. The hut he dwelt within stood distant from the village, nestled in a banyan tree upon the edge of a cliff, and he was regarded as something of eccentricity by the children who lived there. Yet he pursued reasoning and beauty, and by the time he turned twenty-two he had learned all there was to know about the Miracle Continent. Thus, after he discovered the Sea of Memories, he constructed a stargazer to chase the stars themselves.",
	"During Kether's seasons of research, he would forsake her even if it meant the woman was left alone in the merciless sea. He aided her only insofar as it interfered not with his research or observations. Still, she always endured: she remade the barrel she had into a lifeboat, and persevered.",
	"Deep within our souls, we are beckoned by pure beauty and the unknown.",
	"Every night, I watch the river of stars spiraling in the heavens, then descending into the deep sea.",
	"A spray of water arcs over the edge of the observatory and then vanishes without trace.",
	"Traverse the brilliant galaxy and immerse yourself in starlight. Eventually, we forget the way home and who we are.",
	"It is said that stars twinkle because of the atmosphere, but those are truly signals that guide me toward the truth.",
	"We praise the eternity of starlight because of our own insignificance.",
	"But the lone stargazer requires no company. We are all bound to the sea of stars.",
	"Even the brightest stars were born in cosmic dust. Billions of fortunate sparks across trillions of years illuminated a sky.",
	"Just as the trail of a star, a human being's destiny can be precisely calculated and manipulated.",
	"And now, Kether travels into the Sea of Memories in which he has immersed himself. None can follow him.",
	"Inspired by the cosmos, its stellar brilliance is undying. Such courage illuminates the heavens with endless exploration.",
	"Youthful fabric adorned with diamond-like sleeves, reflecting a girl's strength and eternal devotion.",
	"Adorned with pearls and gems, this celestial-inspired starlight transcends cliché, emanating a vivid, dreamlike allure.",
	"Gather the soft moonlight upon the lake and weave it into lyre strings that echo through the starry expanse.",
	"Fold the soft starry sky and tell the stars about every meteor that twinkled in fairytale childhood dreams.",
	"A meteor descends and alights upon the lake's surface like a feather.",
	"The lake reflected a gentle illusion, which one dared not touch even within a dream.",
	"If all of this is a dream, please do not let me wake too soon!",
	"I reach toward the shooting stars, only to grasp the cold night.",
	"The meteor did not appear, and the night remained cold and silent as ever.",
	"Angels become musical notes dancing freely within the beautiful melody.",
	"I wish not to keep my long hair anymore. It cannot conceal the scar upon my heart.",
	"Legend whispers that within the delicate and fragile butterfly form, there dwells also the power to summon hurricanes. This butterfly, woven of pure wind, undoubtedly awaits the day when another tempest is summoned.",
	"I shall not expect a shooting star anymore. It is merely an illusion.",
	"I wish not to dwell in a closet so small. What it imprisons is not only my inner beast.",
	"I have endured enough of endless household chores. I wish to stand upon the stage beneath the stars.",
	"I wish not to hide behind anymore; I yearn for my love.",
	"If the sky shall never be mine, I will transform it into my colors.",
	"I wish that this shallow and unkind world revolve around my happiness.",
	"The dusk fades into a rose gradient as stars appear, twinkling upon your dress.",
	"We must distort the fate of destruction through retribution, ascend into the chariot of revival, and bask in the luminescence of the crave wave.",
	"The spheric purse is vivid in color. Open it. There may be peach candies within.",
]

// News ticker animation logic
var p = 50 + (document.body.clientWidth / 2.4)
var l = -50 - (newsText.innerText.length * 20)
var newsTimer = setInterval(function () {
	p -= 1
	if (p <= l) {
		newsText.innerText = texts[Math.floor(Math.random() * texts.length)]
		newsText.style.width = (newsText.innerText.length * 16).toString() + "px"
		l = -50 - (newsText.innerText.length * 16)
		p = 50 + (document.body.clientWidth / 2.4)
	}
	newsText.style.left = p.toFixed(1) + "px"
}, 7)
