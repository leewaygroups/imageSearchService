'use strict';

/**
 * From: https://github.com/vadimdemedes/google-images/blob/master/index.js
 * ADJUSTEMENTS:
 * 1. Downgraded to ES5
 * 2. Generalised to support multi search types.
 */

const qs = require('querystring');
const got = require('got');

  function _buildResponse(res) {
	  return res.body.items || [];
	}

function Client(id, apiKey) {
    var self = this;
		this.endpoint = 'https://www.googleapis.com';
		this.apiKey = apiKey;
		this.id = id;

	  this.search = function(query, options) {
		if (!query) {
			throw new TypeError('Expected a query');
		}

    /**Local methods */
    var _buildOptions = function(query, options) {
		if (!options) {
			options = {};
		}

		var result = {
			q: query.replace(/\s/g, '+'),
			cx: self.id,
			key: self.apiKey
		};

		!options.searchType ? options.searchType = 'image' : null;

    if (options.page) {
			result.start = options.page;
		}

		if (options.size) {
			result.imgSize = options.size;
		}

		if (options.type) {
			result.imgType = options.type;
		}

		if (options.dominantColor) {
			result.imgDominantColor = options.dominantColor;
		}

		if (options.colorType) {
			result.imgColorType = options.colorType;
		}

		if (options.safe) {
			result.safe = options.safe;
		}

		return qs.stringify(result);
	}

		return got(this.endpoint + '/customsearch/v1?' + _buildOptions(query, options), {
			json: true
		});
	}
}

module.exports = Client;