module.exports = {
	preset: 'jest-playwright-preset',
	testMatch: [ '**/tests/playwright/specs/**/*.js' ],
	testTimeout: 60000,
	verbose: true
};
