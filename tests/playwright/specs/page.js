/* eslint-disable mediawiki/valid-package-file-require */
const EditPage = require( '../pageobjects/edit.page' );
const Util = require( 'wdio-mediawiki/Util' );

describe( 'Page', () => {
	let name, content;

	beforeAll( async () => {} );

	beforeEach( async () => {
		content = Util.getTestString( 'beforeEach-content-' );

		name = Util.getTestString( 'BeforeEach-name-' );
	} );

	it( 'should be creatable', async () => {
		await EditPage.edit( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-creatable.png`
		} );
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();
		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	afterAll( async () => {
		await browser.close();
	} );
} );
