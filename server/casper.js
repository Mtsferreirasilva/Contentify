var casper = require('casper').create();
var links;

function getLinks() {
// Scrape the links from top-right nav of the website
    var links = document.querySelectorAll('p');
    return Array.prototype.map.call(links, function (e) {
        return e.innerText
    });
}

// Opens casperjs homepage
casper.start('http://www.nytimes.com/interactive/2016/06/22/world/americas/panama-canal.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news');

casper.then(function () {
    links = this.evaluate(getLinks);
});

casper.run(function () {
    for(var i in links) {
        console.log(links[i]);
        console.log();
    }
    casper.done();
});
