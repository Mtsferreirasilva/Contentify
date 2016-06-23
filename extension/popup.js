chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    window.open("http://kaidaniels.io/?url=" + url);
});
