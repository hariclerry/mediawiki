const { saveVideo } = require( 'playwright-video' );
const path = require( 'path' ),
	LOGPATH = process.env.LOG_DIR || path.join( __dirname, '..', 'log' );

let capture;

describe( 'Page', () => {
	beforeAll( async () => {
		await page.goto( 'https://www.wikipedia.org/' );
	} );

	beforeEach( async () => {
		capture = await saveVideo(
			page,
			`${LOGPATH}/recording.mp4`
		);
		await page.screenshot( {
			path: `${LOGPATH}/screenshot.png`
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
