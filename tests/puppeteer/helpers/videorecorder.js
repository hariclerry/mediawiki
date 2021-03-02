/* eslint-disable no-console */
const { spawn } = require( 'child_process' );
const { toFilepath } = require( './Util' );

class Recorder {
	constructor() {
		this.ffmpeg = false;
	}

	logBuffer( buffer, prefix ) {
		const lines = buffer.toString().trim().split( '\n' );
		lines.forEach( function ( line ) {
			console.log( prefix + line );
		} );
	}

	start( test, outputDir, display ) {
		if ( display && display[ 0 ] === ':' ) {
			const videoPath = toFilepath( test, outputDir, 'mp4' );
			this.ffmpeg = spawn( 'ffmpeg', [
				'-f',
				'x11grab', //  grab the X11 display
				'-video_size',
				'1280x1024', // video size
				'-i',
				display, // input file url
				'-loglevel',
				'error', // log only errors
				'-y', // overwrite output files without asking
				'-pix_fmt',
				'yuv420p', // QuickTime Player support, "Use -pix_fmt yuv420p for compatibility with outdated media players"
				videoPath // output file
			] );

			this.ffmpeg.stdout.on( 'data', ( data ) => {
				this.logBuffer( data, 'ffmpeg stdout: ' );
			} );

			this.ffmpeg.stderr.on( 'data', ( data ) => {
				this.logBuffer( data, 'ffmpeg stderr: ' );
			} );
		}
	}

	stop( test, outputDir ) {
		const videoPath = toFilepath( test, outputDir, 'mp4' );
		if ( this.ffmpeg ) {
			console.log( '\n\tVideo location:', videoPath, '\n' );
			this.ffmpeg.kill( 'SIGINT' );
			this.ffmpeg = false;
		}
	}
}

module.exports = new Recorder();
