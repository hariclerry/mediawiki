'use strict';

const Page = require( './page' );

class BlankPage extends Page {
	constructor() {
		super();
		this.heading = '.firstHeading';
	}

	async open() {
		await this.openTitle( 'Special:BlankPage', { uselang: 'en' } );
	}

	async getHeadingText() {
		await page.waitForSelector( this.heading );
		return await page.$eval( this.heading, ( $heading ) => $heading.innerText );
	}
}

module.exports = new BlankPage();
