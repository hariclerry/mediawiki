const { Api, Util } = require( '../helpers' );
const { UserLoginPage, WatchablePage, WatchlistPage } = require( '../pageobjects' );

describe( 'Special:Watchlist', () => {
	let username, password, bot;

	beforeAll( async () => {
		username = Util.getTestString( 'user-' );
		password = Util.getTestString( 'password-' );
		bot = await Api.bot();
		await Api.createAccount( bot, username, password );
	} );

	beforeEach( async () => {
		await UserLoginPage.login( username, password );
	} );

	it( 'should show page with new edit', async () => {

		let title = Util.getTestString( 'Title-' );
		await bot.edit( title, Util.getTestString() );
		await WatchablePage.watch( title );
		await bot.edit( title, Util.getTestString() );
		await WatchlistPage.open( title );
		const displayedTitle = await WatchlistPage.getTitles();
		expect( displayedTitle ).toEqual( title );
	} );
} );
