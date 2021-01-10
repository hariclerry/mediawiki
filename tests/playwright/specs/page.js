/* eslint-disable mediawiki/valid-package-file-require */
const Util = require( 'wdio-mediawiki/Util' );
const { HistoryPage } = require( '../pageobjects' );
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

	it( 'should have history', async () => {
		// create
		await bot.edit( name, content, `created with "${content}"` );

		// check
		await HistoryPage.open( name );
		const commentText = await HistoryPage.getCommentText();
		await page.screenshot( {
			path: `${global.logPath}/Page-should-have-history.png`
		} );

		expect( commentText ).toEqual( `created with "${content}"` );
	} );

	afterEach( async () => {
		await browser.close();
	} );
} );
