const os = require( 'os' );
const path = require( 'path' );
const rimraf = require( 'rimraf' ),

	DIR = path.join( os.tmpdir(), 'jest_playwright_global_setup' );

module.exports = async () => {
	// close the browser instance
	await global.browser.close();
	// clean-up the wsEndpoint file
	rimraf.sync( DIR );
};
