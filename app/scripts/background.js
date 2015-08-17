'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

function seed(s) {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
}

function randomNumber(end, additionalSeed) {
  var random = seed(Date.now() + additionalSeed);
  return Math.floor(seed(random) * end);
}

function passwordGenerator(settings) {
  var length = settings.len;
  var useNumbers = settings.numbers;
  var useUppercase = settings.uppercase;
  var lowercase = 'abcdefghijklmnopqrstuvwxyz';
  var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var symbols = settings.symbols;

  var pool = lowercase;
  pool += symbols;
  if(useUppercase) {
    pool += uppercase;
  }
  if(useNumbers) {
    pool += numbers;
  }
  var password = '';
	for (var i = 0; i < length; i++) {
		password += pool[randomNumber(pool.length,i)];
	}
	return password;
}

chrome.contextMenus.create({
  title : chrome.i18n.getMessage('contextMenu'),
  contexts: ['editable'],
  onclick: function(info, tab) {
    chrome.storage.sync.get({
      len: 10,
      numbers: true,
      uppercase: true,
      symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
    }, function(settings) {
      var password = passwordGenerator(settings);
      console.log(password);
      chrome.tabs.sendMessage(tab.id,{
        name: 'password',
        password: password
      });
    });
  }
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
