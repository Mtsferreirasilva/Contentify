var Contentify = (function(){
  function Contentify(){}

  Contentify.prototype.hasURLProtocol = function(url) {
    return url.match(/^http:\/\/|https:\/\//) !== null;
  }

  return Contentify;
})();

var contentify = new Contentify();

module.exports = contentify;
