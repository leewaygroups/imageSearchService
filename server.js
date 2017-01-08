var express = require('express');
var app = express();
var port = process.env.PORT || 4000;

/**
 * Its adviceable to keep api code as lean as possible.
 * All logics/data manipulations should be kept in a separate module/file
 * All CRUD operations should be keep in a saprate module/file as well
 *
 * BENEFITS:
 * 1. Saparation of concern
 * 2. Makes debuging easier
 * 3. You can easilier swap in/out modules
 * 4. Possible reusability across projects
 * 5. In real-life and larger projects, implementing module specific security security would be less complicated, etc.
 */

app.use('/api', require('./app'));

app.get('/', function (req, res) {
  res.json({Message: "Welcome to freecode-camp 'Image Search Abstraction Layer' project"});
});

app.listen((process.env.PORT || 4000), function () {
  console.log('urlshortener service listening at port  ' + port);
});



