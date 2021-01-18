const Page = require( './page' );

class UserLoginPage extends Page {
	constructor() {
		super();
		this.username = '#wpName1';
		this.password = '#wpPassword1';
		this.loginButton = '#wpLoginAttempt';
		this.userPage = '#pt-userpage';
	}
	async login( username, password ) {
		await this.openTitle( 'Special:UserLogin' );
		await page.waitForSelector( this.username );
		await page.type( this.username, username );
		await page.type( this.password, password );
		await page.click( this.loginButton );
	}
	async loginAdmin() {
		await this.login( global.mwUser, global.mwPwd );
	}
	async getUserPageText() {
		await page.waitForSelector( this.userPage );
		return await page.$eval(
			this.userPage,
			( $userPage ) => $userPage.innerText
		);
	}
}
module.exports = new UserLoginPage();
