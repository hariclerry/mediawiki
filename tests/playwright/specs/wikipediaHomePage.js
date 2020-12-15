describe( 'Page', () => {
	beforeAll( async () => {
		await page.goto( 'https://www.wikipedia.org/' );
	} );

	afterAll( async () => {
		await browser.close();
	} );

	it( 'should display sub title correctly', async () => {
		const subTitleText = await page.innerText( '.localized-slogan' );
		expect( subTitleText ).toEqual( 'The Free Encyclopedia' );
	} );
} );
