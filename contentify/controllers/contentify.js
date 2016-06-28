var cheerio = require('cheerio');

var Contentify = (function(){
  function Contentify(){
    this.pageHTML = '';
    this.$;
  }

  Contentify.prototype.hasURLProtocol = function(url){
    return url.match(/^http:\/\/|https:\/\//) !== null;
  }

  Contentify.prototype.setPageHTML = function(html){
    this.pageHTML = html;
    this.loadHTML();
  }

  Contentify.prototype.loadHTML = function(){
    this.$ = cheerio.load(this.pageHTML);
  }

  Contentify.prototype.getHTML = function(){
    return this.pageHTML;
  }

  Contentify.prototype.ogTags = function(){
    var meta = this.$('meta');
    var keys = Object.keys(meta);

    var ogTags = {};

    keys.forEach(function(key){
      if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:type'){
        ogTags.type = meta[key].attribs.content;
      }
    });
    keys.forEach(function(key){
      if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:title'){
        ogTags.title = meta[key].attribs.content;
      }
    });
    keys.forEach(function(key){
      if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:description'){
        ogTags.description = meta[key].attribs.content;
      }
    });
    keys.forEach(function(key){
      if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image'){
        ogTags.image = meta[key].attribs.content;
      }
    });

    return ogTags;
  }

  return Contentify;
})();

var contentify = new Contentify();

module.exports = contentify;
