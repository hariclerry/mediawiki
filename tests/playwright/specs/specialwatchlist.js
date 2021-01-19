const {
	UserLoginPage,
	WatchablePage,
	WatchlistPage
} = require( '../pageobjects' );
const {
	Api,
	Util: { getTestString }
} = require( '../helpers' );

describe( 'Special:Watchlist', () => {
	let username, password, bot;

	beforeAll( async () => {
		username = getTestString( 'user-' );
		password = getTestString( 'password-' );
		bot = await Api.bot();
		await Api.createAccount( bot, username, password );
	} );

	beforeEach( async () => {
		await UserLoginPage.login( username, password );
	} );

	it( 'should show page with new edit', async () => {
		let title = getTestString( 'Title-' );
		await bot.edit( title, getTestString() );
		await WatchablePage.watch( title );
		await bot.edit( title, getTestString() );
		await WatchlistPage.open( title );
		await page.screenshot( {
			path: `${global.logPath}/Special-Watchlist-should-show-page-with-new-edit.png`
		} );
		const displayedTitle = await WatchlistPage.getTitles();
		expect( displayedTitle ).toEqual( title );
	} );
} );
