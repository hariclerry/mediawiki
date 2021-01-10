/* eslint-disable mediawiki/valid-package-file-require */
const Util = require( 'wdio-mediawiki/Util' );
const { UserLoginPage, RestorePage } = require( '../pageobjects' );
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

	it( 'should be restorable', async () => {
		// create and delete
		await bot.edit( name, content, 'create for delete' );
		await bot.delete( name, 'delete for restore' );

		// login
		await UserLoginPage.loginAdmin();

		// restore
		await RestorePage.restore( name, 'restore reason' );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-restoreable.png`
		} );

		// check
		const displayedContent = await RestorePage.getDisplayedContent();
		expect( displayedContent ).toContain( name + ' has been restored' );
	} );

	afterEach( async () => {
		await browser.close();
	} );
} );
