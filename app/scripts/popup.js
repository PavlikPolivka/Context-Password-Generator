'use strict';

function byId(id) {
	return document.getElementById(id);
}

function disableInputs(element, enable) {
	var inputs = element.querySelectorAll('input');
	Array.prototype.forEach.call(inputs, function(input){
		input.readOnly = enable;
	});
}

function hide(id) {
	var el = byId(id);
	el.classList.remove('show');
	el.classList.add('hide');
	disableInputs(el, true);
}

function show(id) {
	var el = byId(id);
	el.classList.remove('hide');
	el.classList.add('show');
	disableInputs(el, false);
}

function refreshSymbols() {
	if(byId('symbols').checked) {
		show('specialInput');
	} else {
		hide('specialInput');
	}
}

function showMessage() {
	show('message');
	setTimeout(function(){
		hide('message');
	}, 1500);
}

function saveForm() {
	show('spinner');
	chrome.storage.sync.set({
		uppercase: byId('upperCase').checked,
		numbers: byId('numbers').checked,
		symbols: byId('symbols').checked,
		symbolsChars: byId('symbolsChars').value,
		len: byId('len').value
	},
	function() {
		hide('spinner');
		showMessage();
	});
}

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

byId('upperCase').addEventListener('change',function() {
	saveForm();
},false);

byId('numbers').addEventListener('change',function() {
	saveForm();
},false);

byId('symbols').addEventListener('change',function() {
	refreshSymbols();
	saveForm();
},false);

byId('symbolsChars').addEventListener('input',function() {
	saveForm();
},false);

byId('len').addEventListener('input',function() {
	var len = byId('len');
	if(len.value <= 0) {
		len.value = 1;
	}
	saveForm();
},false);

chrome.storage.sync.get({
  len: 10,
  numbers: true,
  uppercase: true,
  symbols: false,
  symbolsChars: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
}, function(settings) {
	show('spinner');
	byId('upperCase').checked = settings.uppercase;
	byId('numbers').checked = settings.numbers;
	byId('symbols').checked = settings.symbols;
	byId('symbolsChars').value = settings.symbolsChars;
	byId('len').value = settings.len;
	refreshSymbols();
	hide('spinner');
});