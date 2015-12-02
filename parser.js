'use strict';

var ESLParser = function() {

	console.log('\x1b[36m', 'Started parsing ESL Podcast pages... This may take some time.' ,'\x1b[0m');
	
	this.actualPage = 1;
	this.episodes = [];
	var that = this;

	ESLParser.prototype.request = function(url, fromEpisode, toEpisode, callback) {
		url = url || constants.BASE_URL;
		this.fromEpisode = this.fromEpisode || fromEpisode;
		this.toEpisode = this.toEpisode || toEpisode;
		this.callback = this.callback || callback;

		var request = require('request');
		request(url, function(error, response, html) {
			if(!error) {
				that.parse(html);
			} else {
				throw new Error();
			}
		});
	}

	ESLParser.prototype.parse = function(html) {
		var cheerio = require('cheerio');

		var $ = cheerio.load(html),
			mainContentTD = $('body > table:nth-child(2) > tr > td:nth-child(3) > table > tr:nth-child(2) > td:nth-child(2)');

		var totalEpisodes = $('b', $('table', mainContentTD).first()).first().text(),
			nextPageUrl = $('a:contains("next")', $('table', mainContentTD).first()).last().attr('href') || '',
			episodesTables = $('table', mainContentTD).first().nextAll('table[cellpadding!="1"]');

		var mapEpisodes = (function(){
			var slug = require('slug');	

			episodesTables.map(function(index, episodeTable) {
				var obj = {},
					title = slug($('.podcast_title', episodeTable).text()),
					link = $('a[href$=".mp3"]', episodeTable).attr('href') || null;

				obj.title = title;
				obj.link = link;
				that.storeEpisode(obj);
			});
		})();

		this.paginateTo(nextPageUrl);
	}

	ESLParser.prototype.storeEpisode = function(episode) {
		this.episodes.push(episode);
	}

	ESLParser.prototype.paginateTo = function(nextPageUrl) {
		var episodeNumber = nextPageUrl.replace(/.*=(\d+)$/, '$1');
		
		if(nextPageUrl && this.episodes.length <= this.toEpisode) {
			console.log('Requesting page ', constants.BASE_URL + episodeNumber);
			this.request(constants.BASE_URL + episodeNumber);
		} else {
			console.info('\x1b[36m', 'Parse completed. ' + this.episodes.length + ' episodes crawled' ,'\x1b[0m');
			this.callback(this.episodes);
		}
	}
};

module.exports = new ESLParser();