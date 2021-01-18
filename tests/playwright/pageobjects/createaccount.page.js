const Page = require( './page' );

class CreateAccountPage extends Page {
	constructor() {
		super();
		this.username = '#wpName2';
		this.password = '#wpPassword2';
		this.confirmPassword = '#wpRetype';
		this.create = '#wpCreateaccount';
		this.heading = '.firstHeading';
	}

	async createAccount( username, password ) {
		await this.openTitle( 'Special:CreateAccount' );
		await page.type( this.username, username );
		await page.type( this.password, password );
		await page.type( this.confirmPassword, password );
		await page.click( this.create );
	}

	async getHeadingText() {
		await page.waitForSelector( this.heading );
		return await page.$eval(
			this.heading,
			( $heading ) => $heading.innerText
		);
	}
}

module.exports = new CreateAccountPage();
