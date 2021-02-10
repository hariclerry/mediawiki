const Page = require( './page' );

class RecentChangesPage extends Page {

	constructor() {
		super();
		this.changesList = '.mw-changeslist';
		this.changeListTitles = '.mw-changeslist-title';
	}

	async getTitles() {
		await global.page.waitForSelector( this.changesList );
		return await ( await global.page.$( this.changesList ) )
			.$$eval( this.changeListTitles, el => el[ 0 ].innerText );
	}

	async open() {
		await this.openTitle( 'Special:RecentChanges' );
	}

}

module.exports = new RecentChangesPage();
