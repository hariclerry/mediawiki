const path = require( 'path' );

module.exports = {
	globals: {
		baseUrl:
			( process.env.MW_SERVER || 'http://localhost:8080' ) +
			( process.env.MW_SCRIPT_PATH || '/w' ),
		display: process.env.DISPLAY,
		logpath: process.env.LOG_DIR || path.join( __dirname, 'log' ),
		mwUser: process.env.MEDIAWIKI_USER || 'Admin',
		mwPwd: process.env.MEDIAWIKI_PASSWORD || 'dockerpass'
	},
	preset: 'jest-puppeteer-preset',
	roots: [ 'specs' ],
	verbose: true,
	globalSetup: './env/global/setup.js',
	globalTeardown: './env/global/teardown.js',
	setupFilesAfterEnv: [ './env/jest.setup.js' ],
	testEnvironment: './env/testEnvironment.js',
	testRunner: 'jest-jasmine2',
	testTimeout: 300000
};
