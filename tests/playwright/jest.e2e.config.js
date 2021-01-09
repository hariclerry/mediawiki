const path = require( 'path' );

module.exports = {
	globals: {
		baseUrl:
			( process.env.MW_SERVER || 'http://localhost:8080' ) +
			( process.env.MW_SCRIPT_PATH || '/w' ),
		logPath: process.env.LOG_DIR || path.resolve( __dirname, 'log' )
	},
	preset: 'jest-playwright-preset',
	testMatch: [ '**/tests/playwright/specs/**/*.js' ],
	verbose: true,
	testTimeout: 60000
};
