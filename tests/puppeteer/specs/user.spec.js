const { CreateAccountPage, UserLoginPage } = require( '../pageobjects' );
const { Api, Util: { getTestString } } = require( '../helpers' );

describe( 'User', () => {
	let bot, username, password;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		let cookies = await global.page.cookies();
		await global.page.deleteCookie( ...cookies );
		username = getTestString( 'User-' );
		password = getTestString();
	} );

	it( 'should be able to create account', async () => {
		await CreateAccountPage.createAccount( username, password );
		const heading = await CreateAccountPage.getHeadingText();
		expect( heading ).toEqual( `Welcome, ${username}!` );
	} );

	it( 'should be able to login', async () => {
		await Api.createAccount( bot, username, password );
		await UserLoginPage.login( username, password );
		const actualUsername = await UserLoginPage.getUserPageText();
		expect( actualUsername ).toEqual( username );
	} );
} );
