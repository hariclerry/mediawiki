const { saveVideo } = require( 'playwright-video' );
const path = require( 'path' ),
	logPath = process.env.LOG_DIR || path.resolve( __dirname, '..', 'log' );

describe( 'Page', () => {
	it( 'should display sub title correctly', async () => {
		const captureVideo = await saveVideo( page, `${logPath}/recording.mp4` );
		await page.goto( 'https://www.wikipedia.org/' );
		await page.screenshot( {
			path: `${logPath}/screenshot.png`
		} );

		// eslint-disable-next-line one-var
		const subTitleText = await page.innerText( '.localized-slogan' );
		expect( subTitleText ).toEqual( 'The Free Encyclopedia' );

		await captureVideo.stop();
		await browser.close();
	} );
} );
