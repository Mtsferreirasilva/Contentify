var cheerio = require('cheerio');

var Contentify = (function(){
  function Contentify(){
    this.pageHTML = '';
    this.pageBody = '';
    this.pageContent = '';
    this.$;
  }

  Contentify.prototype.isContentTypeText = function(content_type){
    var isTextHtml = false;
    content_type.split(';').forEach(function(element){
      if (element.trim() === 'text/html') {
        isTextHtml = true;
      }
    });
    return isTextHtml;
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

  Contentify.prototype.hasTag = function(tagName){
    return this.$(tagName).length > 0;
  }

  Contentify.prototype.getHTML = function(){
    return this.pageHTML.trim();
  }

  Contentify.prototype.getHead = function(){
    var head = '';
    if (this.hasTag('head')) {
      head = this.$('head').html().trim();
    }
    return head;
  }

  Contentify.prototype.getBody = function(){
    if (this.hasTag('body')) {
      this.pageBody = this.$('body').html().trim();
    }
    return this.pageBody;
  }

  Contentify.prototype.getContent = function(){
    return this.pageContent;
  }

  Contentify.prototype.scrapeContent = function(){
    this.pageContent = this.pageHTML;
    this.pageContent = cheerio.load(this.pageContent);

    // Removing unnecessary nodes
    this.pageContent('script').remove();
    this.pageContent('noscript').remove();
    this.pageContent('style').remove();
    this.pageContent('iframe').remove();

    var nodeResult = this.searchContent(this.pageContent('body').toArray()[0].childNodes);
    console.log(nodeResult);
    var content = this.pageContent.html(nodeResult.tagName + '' + nodeResult.class + ' > p');

    return {
      content: content,
      node: nodeResult.tagName + '' + nodeResult.class + ' > p'
    };
  }

  Contentify.prototype.searchContent = function(nodes, highest){
    var highest = typeof highest !== 'undefined' ? highest : { total: 0 };

    for (var i = 0; i < nodes.length; i++) {
      if (typeof nodes[i].name !== 'undefined') {
        var totalPTags = nodes[i].childNodes.filter(function(el){return el.tagName === 'p'}).length;
        console.log(nodes[i].tagName, nodes[i].attribs.class, totalPTags);
        if (totalPTags > highest.total) {
          highest.total = totalPTags;
          highest.class = nodes[i].attribs.class.length > 0 ? '.' + nodes[i].attribs.class.split(' ').join('.') : '';
          highest.id = nodes[i].attribs.class;
          highest.tagName = nodes[i].tagName;
        }
        if (nodes[i].childNodes.length > 0) {
          highest = this.searchContent(nodes[i].childNodes, highest)
        }
      }
    }
    return highest;
  }

  Contentify.prototype.getTitle = function(){
    var title = '';
    if (this.hasTag('title')) {
      title = this.$('title').text().trim();
    }
    return title;
  }

  Contentify.prototype.getDescription = function(){
    var description = '';
    if (this.hasTag('meta[name=description]')) {
      description = this.$('meta[name=description]').attr('content');
    }
    return description.trim();
  }

  Contentify.prototype.getAuthor = function(){
    var author = '';
    if (this.hasTag('meta[name=author]')) {
      author = this.$('meta[name=author]').attr('content').trim();
    }
    return author;
  }

  Contentify.prototype.getLang = function(){
    var lang = '';
    if (this.hasTag('html[lang]')) {
      lang = this.$('html').attr('lang').trim();
    }
    return lang;
  }

  Contentify.prototype.getOGTags = function(){
    var ogTags = {};

    if (this.hasTag('meta')) {
      var meta = this.$('meta');
      var keys = Object.keys(meta);

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
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:url'){
          ogTags.url = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:site'){
          ogTags.site = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:site_name'){
          ogTags.siteName = meta[key].attribs.content;
        }
      });
    }
    return ogTags;
  }

  Contentify.prototype.getTwitterCards = function(){
    var tcTags = {};

    if (this.hasTag('meta')) {
      var meta = this.$('meta');
      var keys = Object.keys(meta);

      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:card'){
          tcTags.card = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:site'){
          tcTags.site = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:url'){
          tcTags.url = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:title'){
          tcTags.title = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:description'){
          tcTags.description = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:image'){
          tcTags.image = meta[key].attribs.content;
        }
      });
    }
    return tcTags;
  }

  return Contentify;
})();

var contentify = new Contentify();

module.exports = contentify;
