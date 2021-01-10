/* eslint-disable mediawiki/valid-package-file-require */
const Page = require( './page' );

class DeletePage extends Page {
	constructor() {
		super();
		this.reason = '#wpReason';
		this.watch = '#wpWatch';
		this.submit = '#wpConfirmB';
		this.displayedContent = '#mw-content-text';
	}

	async open( title ) {
		await this.openTitle( title, { action: 'delete' } );
	}

	async delete( title, reason ) {
		await this.open( title );
		await global.page.waitForSelector( this.reason );
		await global.page.type( this.reason, reason );
		await global.page.click( this.submit );
	}

	async getDisplayedContent() {
		await global.page.waitForSelector( this.displayedContent );
		return await global.page.$eval(
			this.displayedContent,
			( $content ) => $content.innerText
		);
	}
}

module.exports = new DeletePage();
