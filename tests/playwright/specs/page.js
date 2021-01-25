const {
	EditPage,
	HistoryPage,
	DeletePage,
	UserLoginPage,
	RestorePage,
	UndoPage
} = require( '../pageobjects' );
const {
	Api,
	Util: { getTestString }
} = require( '../helpers' );

describe( 'Page', () => {
	let name, content, bot;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		await jestPlaywright.resetContext();
		content = getTestString( 'beforeEach-content-' );
		name = getTestString( 'BeforeEach-name-' );
	} );

	afterAll( async () => {
		await browser.close();
	} );

	it( 'should be previewable', async () => {
		await EditPage.preview( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-previewable.png`
		} );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( 'Creating ' + name );
		expect( displayedContent ).toEqual( content );
	} );

	it( 'should be creatable', async () => {
		await EditPage.edit( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-creatable.png`
		} );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	it( 'should be re-creatable', async () => {
		let initialContent = getTestString( 'initialContent-' );

		await bot.edit( name, initialContent, 'create for delete' );
		await bot.delete( name, 'delete prior to recreate' );
		await EditPage.edit( name, content );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-re-creatable.png`
		} );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	it( 'should be editable', async () => {
		let editContent = getTestString( 'editContent-' );

		await bot.edit( name, content, 'create for edit' );
		await EditPage.edit( name, editContent );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-editable.png`
		} );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toContain( editContent );
	} );

	it( 'should have history', async () => {
		await bot.edit( name, content, `created with "${content}"` );
		await HistoryPage.open( name );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-have-history.png`
		} );

		const commentText = await HistoryPage.getCommentText();

		expect( commentText ).toEqual( `created with "${content}"` );
	} );

	it( 'should be deletable', async () => {
		await bot.edit( name, content, 'create for delete' );
		await UserLoginPage.loginAdmin();
		await DeletePage.delete( name, 'delete reason' );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-deletable.png`
		} );

		const displayedContent = await DeletePage.getDisplayedContent();

		expect( displayedContent ).toContain(
			`"${name}" has been deleted. See deletion log for a record of recent deletions.`
		);
	} );

	it( 'should be restorable', async () => {
		await bot.edit( name, content, 'create for delete' );
		await bot.delete( name, 'delete for restore' );
		await UserLoginPage.loginAdmin();
		await RestorePage.restore( name, 'restore reason' );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-restorable.png`
		} );

		const displayedContent = await RestorePage.getDisplayedContent();

		expect( displayedContent ).toContain( name + ' has been restored' );
	} );

	it( 'should be undoable', async () => {
		let response, previousRev, undoRev;

		await bot.edit( name, content, 'create to edit and undo' );
		response = await bot.edit( name, getTestString( 'editContent-' ) );
		previousRev = response.edit.oldrevid;
		undoRev = response.edit.newrevid;
		await UndoPage.undo( name, previousRev, undoRev );
		await page.screenshot( {
			path: `${global.logPath}/Page-should-be-undoable.png`
		} );

		const displayedContent = await EditPage.getDisplayedContent();

		expect( displayedContent ).toEqual( content );
	} );

} );
