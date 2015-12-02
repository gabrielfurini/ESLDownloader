var constants = require('./constants'),
	fs = require('fs'),
	eslParser = require('./parser'),
	eslDownloader = require('./downloader'),
	fromEpisode = process.argv[2] || 0,
	toEpisode = process.argv[3] || 9999;

eslParser.request(constants.BASE_URL, fromEpisode, toEpisode, function(episodes){
	eslDownloader.download(episodes, fromEpisode, toEpisode);
});