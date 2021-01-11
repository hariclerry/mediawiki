/* eslint-disable mediawiki/valid-package-file-require */
/* eslint-disable one-var */
'use strict';
const Api = require( '../helpers/Api' );

describe( 'Special:RecentChanges', function () {
	it( 'shows page creation', async () => {
		const content = 'content-Iñtërnâtiônàlizætiøn';
		const name = 'Name-Iñtërnâtiônàlizætiøn';
		const bot = await Api.bot();

		const changesList = '.mw-changeslist';
		const changeListTitles = '.mw-changeslist-title';

		await bot.edit( name, content );
		await page.goto(
			`${global.baseUrl}/index.php?title=Special:RecentChanges`
		);
		await page.screenshot( {
			path: `${global.logPath}/Special-recent-changes-show-page.png`
		} );

		await page.waitForSelector( changesList, { state: 'visible' } );
		const title = await ( await page.$( changesList ) ).$$eval(
			changeListTitles,
			( el ) => el[ 0 ].innerText
		);
		expect( title ).toEqual( name );
	} );
} );
