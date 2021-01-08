/* eslint-disable mediawiki/valid-package-file-require */
const { CreateAccountPage } = require( '../pageobjects' );
const Util = require( 'wdio-mediawiki/Util' );

describe( 'User', () => {
	let username, password;

	beforeEach( async () => {
		username = Util.getTestString( 'User-' );
		password = Util.getTestString();
	} );

	it( 'should be able to create account', async () => {
		await CreateAccountPage.createAccount( username, password );
		await page.screenshot( {
			path: `${global.logPath}/userAccountCreation.png`
		} );
		const heading = await CreateAccountPage.getHeadingText();
		expect( heading ).toEqual( `Welcome, ${username}!` );
	} );

	afterEach( async function () {
		await browser.close();
	} );
} );
