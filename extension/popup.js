chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    window.open("https://contentify.herokuapp.com/scrape?url=" + url);
});
