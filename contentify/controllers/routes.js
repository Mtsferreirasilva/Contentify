var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Contentify'});
});

router.get('/reader', function(req, res, next) {
  url = 'https://techcrunch.com/2016/06/23/surgepurge/';
  // url = 'http://www.nytimes.com/interactive/2016/06/22/world/americas/panama-canal.html';
  // url = 'http://google.com/';

  request(url, function(error, response, html){
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var json = {};

      json.url = url;
      json.html = $.html();
      res.send(json);
    }else{
      res.send(error);
    }
  })

  // res.render('reader', { title: 'Contentify - Reader', json: json });
});

module.exports = router;
