chrome.tabs.onUpdated.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {
        "file": "contentscript.js"
    }, function () {
        console.log("Script Executed .. ");
    });
});