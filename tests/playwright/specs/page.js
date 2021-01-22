const { EditPage } = require( '../pageobjects' );
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

} );
