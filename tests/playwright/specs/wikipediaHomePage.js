const { chromium } = require( 'playwright' );

describe( 'Wikipedia Home Page', () => {
	let response, browser, page;

	beforeAll( async () => {
		browser = await chromium.launch();
		page = await browser.newPage();
		response = await page.goto( 'https://www.wikipedia.org/' );
	} );

	afterAll( async () => {
		await browser.close();
	} );

	it( 'test if page loads successfully', async () => {
		expect( response.status() ).toBe( 200 );
	} );

	it( 'should check if page sub title is correct', async () => {

		const subTitleText = await page.innerText( '.localized-slogan' );
		expect( subTitleText ).toEqual( 'The Free Encyclopedia' );
	} );
} );
