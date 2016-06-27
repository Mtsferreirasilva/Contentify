var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var validUrl = require('valid-url');
var router = express.Router();

var contentify = require('./contentify');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contentify' });
});

router.get('/reader', function(req, res, next) {
  res.render('reader', { title: 'Contentify - Reader'});
});

router.get('/scrape', function(req, res, next) {
  var urlTarget = req.param('url');
  var result = {};

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    result.url = urlTarget;

    if (validUrl.isUri(result.url) && contentify.hasURLProtocol(result.url)){
      result.data = {};

      var options = {
        url: urlTarget,
        followAllRedirects: true,
        jar: true
      }

      request.get(options, function(error, response, html){
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);

          result.statusCode = response.statusCode;
          result.data.html = $.html();
          res.send(result);
        }else{
          result.statusCode = response.statusCode;
          result.error = error;
          res.send(result);
        }
      });
    } else {
      result.error = 'Invalid URL. Make sure that you have included http:// or https://'
      res.send(result);
    }
  }else{
    result.error = 'No URL specified';
    res.send(result);
  }
});

module.exports = router;
