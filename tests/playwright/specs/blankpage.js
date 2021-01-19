'use strict';

const { BlankPage } = require( '../pageobjects' );

describe( 'BlankPage', () => {

	it( 'should have its title', async () => {
		let headingText = 'Blank page';
		await BlankPage.open();
		await page.screenshot( {
			path: `${global.logPath}/BlankPage-should-have-its-title.png`
		} );
		const title = await BlankPage.getHeadingText();
		expect( title ).toEqual( headingText );
	} );

} );
