const Page = require( './page' );

class RestorePage extends Page {

	constructor() {
		super();
		this.reason = '#wpComment';
		this.submit = '#mw-undelete-submit';
		this.displayedContent = '#mw-content-text';
	}

	async open( subject ) {
		await this.openTitle( 'Special:Undelete/' + subject );
	}

	async restore( subject, reason ) {
		await this.open( subject );
		await global.page.type( this.reason, reason );
		await global.page.click( this.submit );
	}

	async getDisplayedContent() {
		await global.page.waitForSelector( this.displayedContent );
		return await global.page.$eval( this.displayedContent, $content => $content.innerText );
	}
}

module.exports = new RestorePage();
