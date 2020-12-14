module.exports = {
	preset: 'jest-playwright-preset',
	testMatch: [ '**/tests/playwright/specs/**/*.js' ],
	verbose: true,
	testTimeout: 60000
};
