'use strict';
console.log('Ahoj');

chrome.runtime.onMessage.addListener(function(password) {
  document.activeElement.value = password;
});
