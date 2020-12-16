module.exports = {
	preset: 'jest-playwright-preset',
	testMatch: [ '**/tests/playwright/specs/**/*.js' ],
	verbose: true,
	testTimeout: 60000
	// globalSetup: './env/global/setup.js',
	// globalTeardown: './env/global/teardown.js',
	// testEnvironment: './env/testEnvironment.js'
};
