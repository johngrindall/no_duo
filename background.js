//Recieve message from content script to open tab
chrome.runtime.onMessage.addListener(
  function(request) {
  	chrome.tabs.create({url: request.url, active: true});
  	chrome.tabs.highlight({'tabs': request.index}, function() {});
  }
);