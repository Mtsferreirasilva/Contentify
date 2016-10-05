var express = require('express');
var request = require('request');
var scraper = require('../src/scraper.js');
var router = express.Router();

var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contentify' });
});

router.get('/reader', function(req, res, next) {
  var urlTarget = req.param('url');

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    request
      .get({
        url: 'http://' + req.headers.host + '/scrape?url=' + urlTarget
      }, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          res.render('reader', { title: 'Contentify - Reader', data: JSON.parse(html) });
        }else{
          res.render('404', { title: 'Contentify - Page not found', data: error });
        }
      });
  } else {
    res.render('404', { title: 'Contentify - Page not found' });
  }
})

router.get('/scrape', function(req, res, next) {
  console.log(config);
  const READABILITY = {
    KEY: config.readability_key,
    URL: 'https://www.readability.com/api/content/v1/parser'
  };
  var urlTarget = req.param('url');

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    request
      .get({
        url: READABILITY.URL + '?url=' +  urlTarget + '&token=' + READABILITY.KEY
      }, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          scraper.setReadabilityResult(JSON.parse(html));
          res.send(scraper.generate());
        }else{
          res.send('Error when calling Readability');
        }
      });
  } else {
    res.send('Provide URL');
  }
});

module.exports = router;
