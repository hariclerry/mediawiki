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

	afterEach( async () => {
		await browser.close();
	} );

	it( 'should show page creation', async () => {
		await bot.edit( name, content );
		await RecentChangesPage.open();
		await page.screenshot( {
			path: `${global.logPath}/Special-RecentChanges-should-show-page-creation.png`
		} );
		const title = await RecentChangesPage.getLatestTitle();
		expect( title ).toEqual( name );
	} );
} );
