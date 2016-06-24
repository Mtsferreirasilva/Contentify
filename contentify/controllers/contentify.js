Contentify.Reader = (function(){
  function Reader(){
    this.url = '';
  }

  Reader.prototype.sayHello = function(){
    console.log("HELLO");
  }

  return Reader;
})();

module.exports = Contentify.Reader;
