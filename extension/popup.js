chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    window.open("http://localhost:3000/reader?url=" + url);
    // window.open("http://localhost/scrape?url=" + url);
});
