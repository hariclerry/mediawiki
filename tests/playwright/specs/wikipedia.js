let { chromium } = require("playwright");
const assert = require("assert");

(async () => {
	const browser = await chromium.launch({ headless: false });
	
	const page = await browser.newPage();
	await page.goto("https://www.wikipedia.org/");

	const text = await page.innerText(".localized-slogan");
	assert(text === "The Free Encyclopedia");
	await browser.close();
})();