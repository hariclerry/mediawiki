/* eslint-disable one-var */
const path = require( 'path' );
const logPath = process.env.LOG_DIR || path.resolve( __dirname, '..', 'log' );

describe( 'Main Page', () => {
	it( 'should display main heading correctly', async () => {
		await page.goto( 'http://localhost:8080/w' );
		await page.screenshot( {
			path: `${logPath}/screenshot.png`
		} );

		const heading = await page.innerText( '#firstHeading' );
		expect( heading ).toEqual( 'Main Page' );

		await browser.close();
	} );
} );
