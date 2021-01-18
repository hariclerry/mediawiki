const { CreateAccountPage, UserLoginPage } = require( '../pageobjects' );
const {
	Api,
	Util: { getTestString }
} = require( '../helpers' );

describe( 'User', () => {
	let username, password;

	beforeEach( async () => {
		await jestPlaywright.resetContext();
		username = getTestString( 'User-' );
		password = getTestString();
	} );

	afterAll( async function () {
		await browser.close();
	} );

	it( 'should be able to create account', async () => {
		await CreateAccountPage.createAccount( username, password );
		await page.screenshot( {
			path: `${global.logPath}/User-should-be-able-to-create-account.png`
		} );
		const heading = await CreateAccountPage.getHeadingText();
		expect( heading ).toEqual( `Welcome, ${username}!` );
	} );

	it( 'should be able to login', async () => {
		let bot = await Api.bot();
		await Api.createAccount( bot, username, password );
		await UserLoginPage.login( username, password );
		await page.screenshot( {
			path: `${global.logPath}/User-should-be-able-to-login.png`
		} );
		const actualUsername = await UserLoginPage.getUserPageText();
		expect( actualUsername ).toEqual( username );
	} );
} );
