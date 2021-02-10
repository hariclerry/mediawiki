const { toFilepath } = require( './Util' );

module.exports = async ( page, testname, outputDir, before = true ) => {
	let prefix = before ? 'before-' : 'after-',
		screenshotPath = toFilepath( prefix + testname, outputDir, 'png' );
	await page.screenshot( {
		path: screenshotPath
	} );
};
