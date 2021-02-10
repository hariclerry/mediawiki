const Page = require( './page' );

class WatchlistPage extends Page {

	constructor() {
		super();
	}

	async getTitles() {
		await global.page.waitForSelector( '.mw-changeslist' );
		return await ( await global.page.$( '.mw-changeslist' ) )
			.$$eval( '.mw-changeslist-line .mw-title', el => el[ 0 ].innerText );
	}

	async open() {
		await this.openTitle( 'Special:Watchlist' );
	}

}

module.exports = new WatchlistPage();
