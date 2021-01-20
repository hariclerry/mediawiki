const { EditPage } = require( '../pageobjects' );
const {
	Util: { getTestString }
} = require( '../helpers' );

describe( 'Page', () => {
	let name, content;

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

} );
