const fs = require( 'fs' );
const NodeEnvironment = require( 'jest-environment-node' );
const path = require( 'path' );
const puppeteer = require( 'puppeteer' );
const os = require( 'os' ),

	DIR = path.join( os.tmpdir(), 'jest_puppeteer_global_setup' );

class TestEnvironment extends NodeEnvironment {
	constructor( config ) {
		super( config );
	}

	async setup() {
		await super.setup();
		const wsEndpoint = fs.readFileSync( path.join( DIR, 'wsEndpoint' ), 'utf8' );
		if ( !wsEndpoint ) {
			throw new Error( 'wsEndpoint not found' );
		}

		this.global.browser = await puppeteer.connect( {
			browserWSEndpoint: wsEndpoint
		} );
	}

	async teardown() {
		await super.teardown();
	}

	runScript( script ) {
		return super.runScript( script );
	}
}

module.exports = TestEnvironment;
