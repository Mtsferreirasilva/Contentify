var express = require('express');
var request = require('request');
var validator = require('validator');
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

    var validatorOptions = {
      protocols: ['http','https'],
      require_protocol: true,
      allow_underscores: true,
    }

    if (validator.isURL(result.url, validatorOptions)){
      result.data = {};

      var options = {
        url: urlTarget,
        followAllRedirects: true,
        jar: true
      }

      request.get(options, function(error, response, html){
        if (!error && response.statusCode == 200) {
          contentify.setPageHTML(html);

          result.statusCode = response.statusCode;

          result.data.title = contentify.getTitle();
          result.data.description = contentify.getDescription();
          result.data.openGraph = contentify.getOGTags();
          result.data.twitterCards = contentify.getTwitterCards();
          result.data.html = contentify.getHTML();

          res.send(result);
        }else{
          result.statusCode = response.statusCode;
          result.error = error;
          res.send(result);
        }
      });
    } else {
      result.error = 'Invalid URL! Looking for something like [http://|https://].example.com';
      res.send(result);
    }
  }else{
    result.error = 'No URL specified';
    res.send(result);
  }
});

module.exports = router;
