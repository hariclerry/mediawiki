/* eslint-disable mediawiki/valid-package-file-require */
const Util = require( 'wdio-mediawiki/Util' );
const { EditPage, UndoPage } = require( '../pageobjects' );
const { Api } = require( '../helpers' );

describe( 'Page', () => {
	let content, name, bot;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		content = Util.getTestString( 'beforeEach-content-' );
		name = Util.getTestString( 'BeforeEach-name-' );
	} );

	it( 'should be undoable', async () => {
		let displayedContent, previousRev, undoRev;

		// edit
		await bot.edit( name, content, 'create to edit and undo' );

		// edit
		const response = await bot.edit(
			name,
			Util.getTestString( 'editContent-' )
		);
		previousRev = response.edit.oldrevid;
		undoRev = response.edit.newrevid;

		await UndoPage.undo( name, previousRev, undoRev );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-undoable.png`
		} );

		displayedContent = await EditPage.getDisplayedContent();

		expect( displayedContent ).toEqual( content );
	} );

	afterAll( async () => {
		await browser.close();
	} );
} );
