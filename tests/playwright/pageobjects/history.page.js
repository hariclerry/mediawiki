/* eslint-disable mediawiki/valid-package-file-require */
const Page = require( './page' );

class HistoryPage extends Page {
	constructor() {
		super();
		this.heading = '#firstHeading';
		this.comment = '#pagehistory .comment';
		this.rollback = '.mw-rollback-link';
		this.rollbackLink = '.mw-rollback-link a';
		this.rollbackConfirmable = '.mw-rollback-link .jquery-confirmable-text';
		this.rollbackConfirmableYes =
			'.mw-rollback-link .jquery-confirmable-button-yes';
		this.rollbackConfirmableNo =
			'.mw-rollback-link .jquery-confirmable-button-no';
		this.rollbackNonJsConfirmable =
			'.mw-htmlform .oo-ui-fieldsetLayout-header .oo-ui-labelElement-label';
		this.rollbackNonJsConfirmableYes =
			'.mw-htmlform .mw-htmlform-submit-buttons button';
	}

	async open( title ) {
		await this.openTitle( title, { action: 'history' } );
	}

	async getCommentText() {
		await global.page.waitForSelector( this.comment );
		return await global.page.$eval(
			this.comment,
			( $comment ) => $comment.innerText
		);
	}
}

module.exports = new HistoryPage();
