const { screenshot, videorecorder } = require( '../helpers' );

jasmine.getEnv().addReporter( {
	specStarted: result => {
		jasmine.currentTest = result;
	},
	specDone: result => {
		jasmine.currentTest = result;
	}
} );

// we do this to clear cookies from previous spec file
beforeAll( async () => {
	const page = await global.browser.newPage();
	await page.goto( global.baseUrl );
	let cookies = await page.cookies();
	await page.deleteCookie( ...cookies );
	await page.close();
} );

beforeEach( async () => {
	global.page = await global.browser.newPage();
	await global.page.setDefaultTimeout( 3000000 );
	await global.page.goto( global.baseUrl );
	videorecorder.start( jasmine.currentTest.fullName, global.logpath, global.display );
	await screenshot( global.page, jasmine.currentTest.fullName, global.logpath );
} );

afterEach( async () => {
	videorecorder.stop( jasmine.currentTest.fullName, global.logpath );
	await screenshot( global.page, jasmine.currentTest.fullName, global.logpath, false );
	await global.page.close();
} );
