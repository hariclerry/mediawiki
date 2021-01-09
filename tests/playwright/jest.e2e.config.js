const path = require( 'path' );

module.exports = {
	globals: {
		baseUrl:
			( process.env.MW_SERVER || 'http://localhost:8080' ) +
			( process.env.MW_SCRIPT_PATH || '/w' ),
		logPath: process.env.LOG_DIR || path.join( __dirname, 'log' ),
		mwUser: process.env.MEDIAWIKI_USER || 'Admin',
		mwPwd: process.env.MEDIAWIKI_PASSWORD || 'dockerpass'
	},
	preset: 'jest-playwright-preset',
	testMatch: [ '**/tests/playwright/specs/**/*.js' ],
	verbose: true,
	testTimeout: 120000
};
