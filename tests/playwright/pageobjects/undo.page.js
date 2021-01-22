const Page = require( './page' );

class UndoPage extends Page {
	constructor() {
		super();
		this.save = '#wpSave';
	}

	async undo( title, previousRev, undoRev ) {
		await this.openTitle( title, {
			action: 'edit',
			undoafter: previousRev,
			undo: undoRev
		} );
		await page.click( this.save );
	}
}

module.exports = new UndoPage();
