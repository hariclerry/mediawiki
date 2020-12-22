const { saveVideo } = require( 'playwright-video' );
const path = require( 'path' ),
	LOGPATH = process.env.LOG_DIR || path.resolve( __dirname, '..', 'log' );

describe( 'Page', () => {
	it( 'should display sub title correctly', async () => {
		let capture;
		await page.goto( 'https://www.wikipedia.org/' );

		capture = await saveVideo( page, `${LOGPATH}/recording.mp4` );
		await page.screenshot( {
			path: `${LOGPATH}/screenshot.png`
		} );

		const subTitleText = await page.innerText( '.localized-slogan' );
		expect( subTitleText ).toEqual( 'The Free Encyclopedia' );

		await capture.stop();
		await browser.close();
	} );
} );
