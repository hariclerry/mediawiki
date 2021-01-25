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
		await page.waitForSelector( this.reason );
		await page.type( this.reason, reason );
		await page.click( this.submit );
	}

	async getDisplayedContent() {
		await page.waitForSelector( this.displayedContent );
		return await page.$eval(
			this.displayedContent,
			( $content ) => $content.innerText
		);
	}
}

module.exports = new DeletePage();
