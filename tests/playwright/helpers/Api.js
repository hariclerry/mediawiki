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
	},

	/**
	 * Shortcut for `MWBot#request( { acount: 'createaccount', .. } )`.
	 *
	 * @since 0.1.0
	 * @see <https://www.mediawiki.org/wiki/API:Account_creation>
	 * @param {MWBot} adminBot
	 * @param {string} username New user name
	 * @param {string} password New user password
	 * @return {Object} Promise for API action=createaccount response data.
	 */
	async createAccount( adminBot, username, password ) {
		await adminBot.getCreateaccountToken();

		// Create the new account
		return await adminBot.request( {
			action: 'createaccount',
			createreturnurl: global.baseUrl,
			createtoken: adminBot.createaccountToken,
			username: username,
			password: password,
			retype: password
		} );
	}
};
