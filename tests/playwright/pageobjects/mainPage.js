class MainPage {
	async getHeadingText() {
		return await page.innerText( '#firstHeading' );
	}
}
module.exports = new MainPage();
