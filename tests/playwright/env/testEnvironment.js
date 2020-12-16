const PlaywrightEnvironment = require( 'jest-playwright-preset/lib/PlaywrightEnvironment' )
	.default;
const fs = require( 'fs' );
const path = require( 'path' );
const playwright = require( 'playwright' );
const os = require( 'os' ),
	DIR = path.join( os.tmpdir(), 'jest_playwright_global_setup' );
const { checkBrowserEnv } = require( '../helpers/utils.js' );

class CustomEnvironment extends PlaywrightEnvironment {
	constructor( config ) {
		super( config );
	}
	async setup() {
		await super.setup();
		// get the wsEndpoint
		const wsEndpoint = fs.readFileSync(
			path.join( DIR, 'wsEndpoint' ),
			'utf8'
		);
		if ( !wsEndpoint ) {
			throw new Error( 'wsEndpoint not found' );
		}
		// eslint-disable-next-line one-var
		const browserType = process.env.BROWSER || 'chromium';
		checkBrowserEnv( browserType );
		this.global.browser = await playwright[ browserType ].connect( {
			browserWSEndpoint: wsEndpoint
		} );
	}

	async teardown() {
		// Your teardown
		await super.teardown();
	}

	async handleTestEvent( event ) {
		if ( event.name === 'test_done' && event.test.errors.length > 0 ) {
			const parentName = event.test.parent.name.replace( /\W/g, '-' ),
				specName = event.test.name.replace( /\W/g, '-' );

			await this.global.page.screenshot( {
				path: `screenshots/${parentName}_${specName}.png`
			} );
		}
	}

	runScript( script ) {
		return super.runScript( script );
	}
}

module.exports = CustomEnvironment;
