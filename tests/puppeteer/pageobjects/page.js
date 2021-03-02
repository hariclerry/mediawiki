const querystring = require( 'querystring' );

class Page {

	/**
	 * Navigate the browser to a given page.
	 *
	 * @param {string} title Page title
	 * @param {Object} [query] Query parameter
	 * @param {string} [fragment] Fragment parameter
	 * @return {void} This method runs a browser command.
	 */
	async openTitle( title, query = {}, fragment = '' ) {
		query.title = title;
		await global.page.goto(
			global.baseUrl + '/index.php?' +
			querystring.stringify( query ) +
			( fragment ? ( '#' + fragment ) : '' )
		);
	}
}

module.exports = Page;
