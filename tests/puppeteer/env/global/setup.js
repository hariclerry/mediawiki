const fs = require( 'fs' );
const mkdirp = require( 'mkdirp' );
const os = require( 'os' );
const path = require( 'path' );
const puppeteer = require( 'puppeteer' );

let DIR = path.join( os.tmpdir(), 'jest_puppeteer_global_setup' );

module.exports = async () => {
	const browser = await puppeteer.launch( {
		headless: process.env.DISPLAY ? false : process.env.HEADLESS !== 'false',
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
	} );

	global.browser = browser;
	global.LOGPATH = process.env.LOG_DIR || path.join( __dirname, '..', '..', 'log' );
	mkdirp( global.LOGPATH );
	mkdirp.sync( DIR );
	fs.writeFileSync( path.join( DIR, 'wsEndpoint' ), browser.wsEndpoint() );
};
