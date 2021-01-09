/* eslint-disable mediawiki/valid-package-file-require */
const { EditPage } = require( '../pageobjects' );
const Util = require( 'wdio-mediawiki/Util' );
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

	it( 'should be re-creatable', async () => {
		let initialContent = Util.getTestString( 'initialContent-' );

		// create and delete
		await bot.edit( name, initialContent, 'create for delete' );
		await bot.delete( name, 'delete prior to recreate' );

		// re-create
		await EditPage.edit( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-recreatable.png`
		} );

		// check
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	afterAll( async () => {
		await browser.close();
	} );
} );
