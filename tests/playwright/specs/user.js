/* eslint-disable mediawiki/valid-package-file-require */
const { UserLoginPage } = require( '../pageobjects/index' );
const Util = require( 'wdio-mediawiki/Util' );
const {
	Api
} = require( '../helpers' );

describe( 'User', () => {
	let bot, username, password;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		// TODO: Fix delete cookies
		// let cookies = await page.cookies();
		// await global.page.deleteCookie( ...cookies );
		username = Util.getTestString( 'User-' );
		password = Util.getTestString();
	} );

	it( 'should be able to login', async () => {
		await Api.createAccount( bot, username, password );
		await UserLoginPage.login( username, password );
		await page.screenshot( {
			path: `${global.logPath}/userLogin.png`
		} );
		const actualUsername = await UserLoginPage.getUserPageText();
		expect( actualUsername ).toEqual( username );
	} );

	afterEach( async function () {
		await browser.close();
	} );
} );
