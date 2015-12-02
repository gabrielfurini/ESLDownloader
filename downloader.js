'use strict';

var ESLDownloader = function() {

	this.episodes = null;
	var that = this;

	function filterEpisodes(episodes, fromEpisode, toEpisode) {
		if(fromEpisode >= 0 && toEpisode < episodes.length) {
			return episodes.slice(fromEpisode, toEpisode);
		}
		return episodes;
	}

	ESLDownloader.prototype.download = function(episodes, fromEpisode, toEpisode) {
		this.episodes = filterEpisodes(episodes, fromEpisode, toEpisode);
		this.startDownload(this.episodes[0]);
	}

	ESLDownloader.prototype.startDownload = function(episode) {
		var spawn = require('child_process').spawn;

		console.log('started ', episode.title);

		var wget = spawn('wget', ['-P', './episodes', episode.link]);
		wget.on('close', function (code) {
			if(code == 0) {
				that.finishDownload(episode);
				console.log('finished ' + episode.title);
			}
		});

		// WGET doesn't handle well big files without this listener
		wget.stderr.on('data', function(data){})
	}

	ESLDownloader.prototype.finishDownload = function(episode) {
		this.episodes.shift();
		
		if(this.episodes.length) {
			this.download(this.episodes);
		}
	}
	
};

module.exports = new ESLDownloader();