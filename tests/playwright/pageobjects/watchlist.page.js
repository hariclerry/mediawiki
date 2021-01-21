const Page = require( './page' );

class WatchlistPage extends Page {
	constructor() {
		super();
		this.changesList = '.mw-changeslist';
		this.changeListTitles = '.mw-changeslist-line .mw-title';
	}

	async open() {
		await this.openTitle( 'Special:Watchlist' );
	}

	async getTitles() {
		await page.waitForSelector( this.changesList );
		const changesListElements = await page.$( this.changesList );
		return await changesListElements.$$eval(
			this.changeListTitles,
			( el ) => el[ 0 ].innerText
		);
	}
}

module.exports = new WatchlistPage();
