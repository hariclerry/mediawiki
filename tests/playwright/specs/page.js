/* eslint-disable mediawiki/valid-package-file-require */
const Util = require( 'wdio-mediawiki/Util' );
const { EditPage } = require( '../pageobjects' );
const { Api } = require( '../helpers' );

describe( 'Page', () => {
	let content, name, bot;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		content = Util.getTestString( 'beforeEach-content-' );
		name = Util.getTestString( 'BeforeEach-name-' );
	} );

	it( 'should be editable', async () => {
		// create
		await bot.edit( name, content, 'create for edit' );

		// edit
		let editContent = Util.getTestString( 'editContent-' );
		await EditPage.edit( name, editContent );

		// check
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-editableable.png`
		} );

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toContain( editContent );
	} );

	afterAll( async () => {
		await browser.close();
	} );
} );
