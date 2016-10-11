var express = require('express');
var request = require('request');
var router = express.Router();

var scraper = require('../src/scraper.js');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
/* Components */
var Contentify404 = require('../src/components/Contentify404.jsx');
var ContentifyReaderError = require('../src/components/ContentifyReaderError.jsx');
var ContentifyReader = require('../src/components/ContentifyReader.jsx');

var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contentify' });
});

router.get('/reader', function(req, res, next) {
  var urlTarget = req.param('url');
  var html = '<!DOCTYPE html>';

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    request
      .get({
        url: 'http://' + req.headers.host + '/scrape?url=' + urlTarget
      }, function(error, response, context) {
        if (!error && response.statusCode == 200) {
          var props = {
            title: 'Contentify - Reader',
            data: context
          };
          html += ReactDOMServer.renderToString(
            React.createElement(ContentifyReader, props)
          );
        }else{
          var props = {
            title: 'Contentify - Reader Error',
            error: error
          };
          html += ReactDOMServer.renderToString(
            React.createElement(ContentifyReaderError, props)
          );
        }
        res.send(html);
      });
  } else {
    var props = {
      title: 'Contentify - Reader Error',
      error: 'URL not provided.'
    };
    html += ReactDOMServer.renderToString(
      React.createElement(ContentifyReaderError, props)
    );
    res.send(html);
  }
});

router.get('/404', function(req, res, next) {
  var props = {
    title: 'Contentify - Page not found'
  };
  var html = '<!DOCTYPE html>';
  html += ReactDOMServer.renderToString(
    React.createElement(Contentify404, props)
  );
  res.send(html);
});

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
