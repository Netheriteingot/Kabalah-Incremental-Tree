// News Ticker System
// Scrolling text displayed at the bottom of the game with various lore snippets

var texts = [
	"Kether lived the first 22 years of his life near a small town in the Pigeon Kingdom. The hut he had lived in was a distance from the village, in a banyan tree on the edge of a cliff, and he was regarded as something of a local oddity by children who lived there. However, he lived in pursuit of reasoning and beauty, and by the time he turned 22 he had learned all there was to know about Miraland. Thus, after he discovered the Sea of Memories, he built a stargazer in order to chase the stars.",
	"During Kether's research time, he would abandon her even if it meant the woman was left alone in the harsh sea. He only wanted to help her as long as it didn't interfere with his research or observations. Still, she always survived: she remodeled the barrel she had into a lifeboat, and persevered.",
	"Why can't you reach next sephirah? Because the ranking of last sephirah haven't reach S (920,000 pts).",
	"Deep in our souls, we are tempted by the pure beauty and the unknown.",
	"Every night, I watch the river of stars swirling in the sky then sinking into the deep ocean.",
	"A spray of water shoots over the edge of the observatory and then vanishes without a trace.",
	"Travel through the brilliant galaxy and immerse in starlight. Eventually, we forget the way home and who we are.",
	"It's said that stars twinkle because of the atmosphere, but those are actually signals that guide me towards the truth.",
	"We praise the eternity of starlight because of our insignificance.",
	"But the lonely stargazer doesn't need company. We are all bound to the ocean of stars.",
	"Even the brightest stars were born in the dust. Billions of coincidental sparks in trillions of years lit a sky.",
	"Just like the trail of a star, a human beings destiny can be accurately calculated and manipulated.",
	"And now, Kether travels into the Ocean of Memories in which he indulged himself. Nobody can catch up with him.",
	"Inspired by the cosmos, its stellar brilliance is undying. Such courage lights up the sky with endless exploration.",
	"Youthful fabric with diamond-like sleeves, reflecting a girl's strength and eternal love.",
	"Adorned with pearls and gems, this celestial-inspired starlight avoids clichés, emitting a vivid, dreamy allure.",
	"Pick up the soft moonlight in the lake and wrap it into lyre strings that reverberate in the starry sky.",
	"Fold the soft starry sky and tell the stars about every meteor twinkling in the fairytale childhood dreams.",
	"A meteor falls and stops on the surface of the lake like a feather.",
	"The lake reflected a gentle illusion, which one would not dare touch even in a dream.",
	"If this is a dream, please don't let me wake up too early!",
	"I reach out to the shooting stars, only to grasp the cold night sky.",
	"The meteor didn't appear, and the night remained cold and silent as usual.",
	"Angels become musical notes dancing freely in the beautiful melody.",
	"I don't want to keep my long hair anymore. It can't hide the scar on my heart.",
	"Legend has it that within the delicate and fragile butterfly body, there is also the power to trigger hurricanes. This butterfly, composed of pure wind, is undoubtedly waiting for the day when another storm is summoned",
	"I won't expect a shooting star anymore. It's just an illusion.",
	"I don't want to live in a closet so small. What it traps is not only my inner beast.",
	"I've had enough of endless household chores. I want to stand on the stage under the stars.",
	"I don't want to hide behind anymore; I long for my love.",
	"If the sky is never mine, I will dye it into my colors.",
	"I want this shallow and unkind world to revolve around my happiness.",
	"The dusk fades into a pink gradient as stars appear, twinkling on your dress.",
	"We must distort the fate of destruction through retribution, scramble into the chariot of revival, and enjoy the luminescence of the crave wave.",
	"The spheric purse is lively in color. Open it up. Might have peach candies inside.",
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
