module.exports = {
	launchOptions: {
		headless: process.env.HEADLESS !== 'false'
	},
	browsers: [ process.env.DISPLAY || 'chromium' ]
};
