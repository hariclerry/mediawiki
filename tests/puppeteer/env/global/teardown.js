const os = require( 'os' );
const path = require( 'path' );
const rimraf = require( 'rimraf' );

let DIR = path.join( os.tmpdir(), 'jest_puppeteer_global_setup' );

module.exports = async () => {

	// close the browser instance
	await global.browser.close();

	// clean-up the wsEndpoint file
	rimraf.sync( DIR );
};
