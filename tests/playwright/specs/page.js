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

	it( 'should be previewable', async () => {
		await EditPage.preview( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-previewable.png`
		} );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent(),
			isDisplayedAndNoConflict = await EditPage.checkDisplayAndNoConflict();

		expect( headingText ).toEqual( 'Creating ' + name );
		expect( displayedContent ).toEqual( content );
		expect( isDisplayedAndNoConflict ).toEqual( true );
	} );

	afterAll( async () => {
		await browser.close();
	} );
} );
