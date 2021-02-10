const Page = require( './page' );
class WatchablePage extends Page {
	constructor() {
		super();
		this.confirmWatch = '#mw-content-text button[type="submit"]';
	}
	async watch( title ) {
		await this.openTitle( title, { action: 'watch' } );
		await global.page.waitForSelector( this.confirmWatch );
		await global.page.click( this.confirmWatch );
	}
}
module.exports = new WatchablePage();
