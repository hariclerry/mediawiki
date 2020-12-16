const { saveVideo } = require( 'playwright-video' );

let capture;

describe( 'Page', () => {
	beforeAll( async () => {

		await page.goto( 'https://www.wikipedia.org/' );

	} );

	beforeEach( async () => {
		capture = await saveVideo(
			page,
			'./tests/playwright/videos/recording.mp4'
		);
		await page.screenshot( {
			path: './tests/playwright/screenshots/screenshot.png'
		} );
	} );

	afterEach( async () => {
		await capture.stop();
	} );

	afterAll( async () => {
		await browser.close();
	} );

	it( 'should display sub title correctly', async () => {
		const subTitleText = await page.innerText( '.localized-slogan' );
		expect( subTitleText ).toEqual( 'The Free Encyclopedia' );
	} );
} );
