'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

chrome.contextMenus.create({
  title : 'Test',
  contexts: ['editable'],
  onclick: function(info, tab) {
    console.log(info);
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, 'aaaaa');
  }
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
