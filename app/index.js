var router = require('express').Router();
var searchHelper = require('./searchHelper');

/**Routes */
router.get('/imagesearch/latest/:offset?', searchHelper.verifyFreqSearches, function (req, res) {
  searchHelper.latestSearches(req, res);
});

router.get('/imagesearch/:searchTerm/:offset', searchHelper.verifyTerms, function (req, res) {
  searchHelper.search(req, res);
});

module.exports = router;