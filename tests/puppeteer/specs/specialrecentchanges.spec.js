const { Api, Util: { getTestString } } = require( '../helpers' );
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
		const title = await RecentChangesPage.getTitles();
		expect( title ).toEqual( name );
	} );
} );
