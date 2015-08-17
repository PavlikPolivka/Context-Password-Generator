'use strict';
console.log('Ahoj');

function copyToClipboard(str) {
  document.oncopy = function(event) {
    event.clipboardData.setData('text/plain', str);
    event.preventDefault();
  };
  document.execCommand('Copy', false, null);
}

chrome.runtime.onMessage.addListener(function(request) {
  if(request.name && request.name === 'password') {
    var password = request.password;
    document.activeElement.value = password;
    copyToClipboard(password);
  }
});
