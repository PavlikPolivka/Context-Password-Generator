'use strict';

var elements = document.querySelectorAll('[data-message]');
Array.prototype.forEach.call(elements, function(el){
	var messageName = el.getAttribute('data-message');
	if(messageName) {
		console.log(el);
		var messageText = chrome.i18n.getMessage(messageName);
		console.log(messageText);
		el.innerHTML = messageText;
	}
});