const {
	DeletePage,
	EditPage,
	HistoryPage,
	RestorePage,
	UndoPage,
	UserLoginPage
} = require( '../pageobjects' );
const { Api, Util: { getTestString } } = require( '../helpers' );

describe( 'Page', () => {
	let content, name, bot;

	beforeAll( async () => {
		bot = await Api.bot();
	} );

	beforeEach( async () => {
		let cookies = await global.page.cookies();
		await global.page.deleteCookie( ...cookies );
		content = getTestString( 'beforeEach-content-' );
		name = getTestString( 'BeforeEach-name-' );
	} );

	it( 'should be previewable', async () => {
		await EditPage.preview( name, content );

		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent(),
			isDisplayedAndNoConflict = await EditPage.checkDisplayAndNoConflict();

		expect( headingText ).toEqual( 'Creating ' + name );
		expect( displayedContent ).toEqual( content );
		expect( isDisplayedAndNoConflict ).toEqual( true );
	} );

	it( 'should be creatable', async () => {
		await EditPage.edit( name, content );
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();
		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	it( 'should be re-creatable', async () => {
		let initialContent = getTestString( 'initialContent-' );

		// create and delete
		await bot.edit( name, initialContent, 'create for delete' );
		await bot.delete( name, 'delete prior to recreate' );

		// re-create
		await EditPage.edit( name, content );

		// check
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toEqual( content );
	} );

	it( 'should be editable', async () => {
		// create
		await bot.edit( name, content, 'create for edit' );

		// edit
		let editContent = getTestString( 'editContent-' );
		await EditPage.edit( name, editContent );

		// check
		const headingText = await EditPage.getHeadingText(),
			displayedContent = await EditPage.getDisplayedContent();

		expect( headingText ).toEqual( name );
		expect( displayedContent ).toContain( editContent );
	} );

	it( 'should have history', async () => {
		// create
		await bot.edit( name, content, `created with "${content}"` );

		// check
		await HistoryPage.open( name );
		const commentText = await HistoryPage.getCommentText();

		expect( commentText ).toEqual( `created with "${content}"` );
	} );

	it( 'should be deletable', async () => {
		// create
		await bot.edit( name, content, 'create for delete' );

		// login
		await UserLoginPage.loginAdmin();

		// delete
		await DeletePage.delete( name, 'delete reason' );

		// check
		const displayedContent = await DeletePage.getDisplayedContent();
		expect( displayedContent ).toContain( `"${name}" has been deleted. See deletion log for a record of recent deletions.` );
	} );

	it( 'should be restorable', async () => {
		// create and delete
		await bot.edit( name, content, 'create for delete' );
		await bot.delete( name, 'delete for restore' );

		// login
		await UserLoginPage.loginAdmin();

		// restore
		await RestorePage.restore( name, 'restore reason' );

		// check
		const displayedContent = await RestorePage.getDisplayedContent();
		expect( displayedContent ).toContain( name + ' has been restored' );
	} );

	it( 'should be undoable', async () => {
		let displayedContent, previousRev, undoRev;

		// edit
		await bot.edit( name, content, 'create to edit and undo' );

		// edit
		const response = await bot.edit( name, getTestString( 'editContent-' ) );
		previousRev = response.edit.oldrevid;
		undoRev = response.edit.newrevid;

		await UndoPage.undo( name, previousRev, undoRev );

		displayedContent = await EditPage.getDisplayedContent();

		expect( displayedContent ).toEqual( content );
	} );
} );
