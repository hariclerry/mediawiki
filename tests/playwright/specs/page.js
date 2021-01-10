/* eslint-disable mediawiki/valid-package-file-require */
const Util = require( 'wdio-mediawiki/Util' );
const { UserLoginPage, DeletePage } = require( '../pageobjects' );
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

	it( 'should be deletable', async () => {
		// create
		await bot.edit( name, content, 'create for delete' );

		// login
		await UserLoginPage.loginAdmin();

		// delete
		await DeletePage.delete( name, 'delete reason' );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-editableable.png`
		} );

		// check
		const displayedContent = await DeletePage.getDisplayedContent();
		expect( displayedContent ).toContain(
			`"${name}" has been deleted. See deletion log for a record of recent deletions.`
		);
	} );

	afterEach( async () => {
		await browser.close();
	} );

} );
