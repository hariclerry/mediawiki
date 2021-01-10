/* eslint-disable mediawiki/valid-package-file-require */
const Page = require( './page' );

class EditPage extends Page {
	constructor() {
		super();
		this.content = '#wpTextbox1';
		this.conflictingContent = '#wpTextbox2';
		this.displayedContent = '.mw-parser-output';
		this.heading = '.firstHeading';
		this.save = '#wpSave';
		this.previewButton = '#wpPreview';
	}

	async openForEditing( title ) {
		await this.openTitle( title, {
			action: 'edit',
			vehidebetadialog: 1,
			hidewelcomedialog: 1
		} );
	}

	async edit( name, content ) {
		await this.openForEditing( name );
		await global.page.type( this.content, content );
		await global.page.click( this.save );
	}

	async getHeadingText() {
		await page.waitForSelector( this.heading );
		return await page.$eval( this.heading, ( $heading ) => $heading.innerText );
	}

	async getDisplayedContent() {
		await global.page.waitForSelector( this.displayedContent );
		return await global.page.$eval(
			this.displayedContent,
			( $displayedContent ) => $displayedContent.innerText
		);
	}
}

module.exports = new EditPage();
