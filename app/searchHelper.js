
/**Google search api wrapper */
const db = require('./db');

const engID = process.env.ENG_ID;
const appKey = process.env.APP_KEY;
const SearchClient = require('./searchAPI');

var searchClientInstance = new SearchClient(engID, appKey);

function search(req, res) {
 searchClientInstance.search(req.params.searchTerm, {start: req.params.offset}).then(function(result){
   db.log(req.params.searchTerm);
   res.json(formatResult(result.body.items) || []);
 });
}

function latestSearches(req, res) {
  db.getRecentLogs(req.params.offset).then(function(logItems) {
    logItems instanceof Array && logItems.length
      ?   res.json(logItems.map(function(item){
            return {
              searchTerm: item.searchTerm,
              dateTimeSubmitted: item.dateTimeSubmitted
            }
          }))
      : res.json({message: 'Either no recent search exists or search exited with an error'});
  });
}

function verifyTerms(req, res, next) {
  console.log("I verify your search terms");

  next();
}

function verifyFreqSearches(req, res, next) {
  console.log("I verify latest searches requests");

  next();
}

function formatResult(result){
  return !result ? [] : result.map(function(item){
    return {
      alternativeText: item.title,
      imageURLs: {
        url: item.pagemap.cse_image ? item.pagemap.cse_image[0].src : null,
        thumbnail: item.pagemap.thumbnail ? item.pagemap.thumbnail[0].src : null
      },
      pageUrl: item.link
    };
  });
}

function logSearch(searchTerm){

}

module.exports = {
  verifyTerms: verifyTerms,
  verifyFreqSearches: verifyFreqSearches,
  search: search,
  latestSearches: latestSearches
};