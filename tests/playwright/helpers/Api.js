const MWBot = require( 'mwbot' );

module.exports = {
	/**
	 * Get a logged-in instance of `MWBot` with edit token already set up.
	 * Default username, password and base URL is used unless specified.
	 *
	 * @param {string} username - Optional
	 * @param {string} password - Optional
	 * @param {string} baseUrl - Optional
	 * @return {Object} Promise for MWBot
	 */
	async bot(
		username = global.mwUser,
		password = global.mwPwd,
		baseUrl = global.baseUrl
	) {
		const bot = new MWBot();

		await bot.loginGetEditToken( {
			apiUrl: `${baseUrl}/api.php`,
			username: username,
			password: password
		} );
		return bot;
	}
};
