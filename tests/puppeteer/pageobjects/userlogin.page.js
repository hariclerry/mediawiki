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
		await global.page.waitForSelector( this.username );
		await global.page.type( this.username, username );
		await global.page.type( this.password, password );
		await global.page.click( this.loginButton );
		await global.page.waitForSelector( this.userPage );
	}
	async loginAdmin() {
		await this.login( global.mwUser, global.mwPwd );
	}
	async getUserPageText() {
		await global.page.waitForSelector( this.userPage );
		return await global.page.$eval( this.userPage, $userPage => $userPage.innerText );
	}
}
module.exports = new UserLoginPage();
