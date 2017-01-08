var mongoose = require('mongoose');

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/test';
mongoose.connect(mongoUri);

var SearchLogSchema = mongoose.Schema({
  searchTerm: String,
  dateTimeSubmitted: { type: Date}
});

var SearchLog = mongoose.model('Url', SearchLogSchema);

var log = function (searchTerm) {
  var SearchLogInstance = new SearchLog({
    searchTerm: searchTerm,
    dateTimeSubmitted : new Date()
  });

  SearchLogInstance.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('log passed');
    }
  });
}

var getRecentLogs = function(limit){
    limit = parseInt(limit);
    limit = Number.isInteger(limit) ? limit : 10;
    return SearchLog.find({}).sort({dateTimeSubmitted: -1}).limit(limit).exec();
}

module.exports = {
  log: log,
  getRecentLogs: getRecentLogs
};