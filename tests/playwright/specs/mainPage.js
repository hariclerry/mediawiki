const MainPage = require( '../pageobjects/mainPage.js' );

describe( 'Main Page', () => {
	it( 'should display main heading correctly', async () => {
		await page.goto( 'http://localhost:8080/w' );

		const heading = await MainPage.getHeadingText();
		expect( heading ).toEqual( 'Main Page' );

		await browser.close();
	} );
} );
