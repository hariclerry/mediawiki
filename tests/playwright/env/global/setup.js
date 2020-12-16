const fs = require( 'fs' );
const mkdirp = require( 'mkdirp' );
const os = require( 'os' );
const path = require( 'path' );
const playwright = require( 'playwright' );
const { checkBrowserEnv } = require( '../helpers/utils.js' );

let DIR = path.join( os.tmpdir(), 'jest_playwright_global_setup' );

module.exports = async () => {
	const browserType = process.env.BROWSER || 'chromium';
	checkBrowserEnv( browserType );
	// eslint-disable-next-line one-var
	const browser = await playwright[ browserType ].launchServer( {
		headless: process.env.HEADLESS !== 'false',
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
	} );

	global.browser = browser;

	mkdirp.sync( DIR );
	fs.writeFileSync( path.join( DIR, 'wsEndpoint' ), browser.wsEndpoint() );
};
