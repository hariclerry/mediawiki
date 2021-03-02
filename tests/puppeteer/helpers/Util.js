const path = require( 'path' );

/**
 *
 * @param {string} s filename
 */
function toFilename( s ) {
	return s.replace( /[^a-z0-9.-]+/gi, '-' );
}

/**
 *
 * @param {string} name filename
 * @param {string} dir dirname
 * @param {string} extension valid file extension
 */
function toFilepath( name, dir, extension ) {
	return path.join( dir, `${toFilename( name )}.${extension}` );
}

function getTestString( prefix = '' ) {
	return prefix + Math.random().toString() + '-Iñtërnâtiônàlizætiøn';
}

/**
 * Wait for a given module to reach a specific state
 *
 * @param {Object} page puppeteer page object
 * @param {string} moduleName The name of the module to wait for
 * @param {string} moduleStatus 'registered', 'loaded', 'loading', 'ready', 'error', 'missing'
 * @param {number} timeout The wait time in milliseconds before the wait fails
 */
async function waitForModuleState( page, moduleName, moduleStatus = 'ready', timeout = 10000 ) {
	await page.waitForFunction( ( status, name ) => {
		return typeof mw !== 'undefined' && mw.loader.getState( name ) === status;
	},
	{
		timeout
	},
	moduleStatus,
	moduleName
	);
}

module.exports = {
	getTestString,
	toFilename,
	toFilepath,
	waitForModuleState
};
