/* eslint-disable mediawiki/valid-package-file-require */
/* eslint-disable one-var */
'use strict';
const {
	Api,
	Util: { getTestString }
} = require( '../helpers' );
const { RecentChangesPage } = require( '../pageobjects' );

describe( 'Special:RecentChanges', () => {
	let content, name, bot;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		content = getTestString();
		name = getTestString();
	} );

	it( 'should show page creation', async () => {
		await bot.edit( name, content );
		await RecentChangesPage.open();
		await page.screenshot( {
			path: `${global.logPath}/Special-RecentChanges-should-show-page-creation.png`
		} );
		const title = await RecentChangesPage.getTitles();
		expect( title ).toEqual( name );
	} );

	afterEach( async () => {
		await browser.close();
	} );
} );
