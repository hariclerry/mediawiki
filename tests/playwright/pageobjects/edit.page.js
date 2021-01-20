const Page = require( './page' );

class EditPage extends Page {
	constructor() {
		super();
		this.content = '#wpTextbox1';
		this.displayedContent = '.mw-parser-output';
		this.heading = '.firstHeading';
		this.previewButton = '#wpPreview';
	}

	async openForEditing( title ) {
		await this.openTitle( title, {
			action: 'edit',
			vehidebetadialog: 1,
			hidewelcomedialog: 1
		} );
	}

	async preview( name, content ) {
		await this.openForEditing( name );
		await page.type( this.content, content );
		await page.click( this.previewButton );
	}

	async getHeadingText() {
		await page.waitForSelector( this.heading );
		return await page.$eval( this.heading, ( $heading ) => $heading.innerText );
	}

	async getDisplayedContent() {
		await page.waitForSelector( this.displayedContent );
		return await page.$eval(
			this.displayedContent,
			( $displayedContent ) => $displayedContent.innerText
		);
	}
}

module.exports = new EditPage();
