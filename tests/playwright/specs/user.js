const { CreateAccountPage } = require( '../pageobjects' );
const {
	Util: { getTestString }
} = require( '../helpers' );

describe( 'User', () => {
	let username, password;

	beforeEach( async () => {
		username = getTestString( 'User-' );
		password = getTestString();
	} );
	afterEach( async function () {
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
} );
