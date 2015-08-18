'use strict';

function copyToClipboard(str) {
	document.oncopy = function(event) {
		event.clipboardData.setData('text/plain', str);
		event.preventDefault();
	};
	document.execCommand('Copy', false, null);
}

function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return i;
		}
	}
	return null;
}

function nearestElement(el, selector) {
	var nearest = null;
	var elemenets;
	var p,l,r,rr,c,d,e;

	if (!selector.indexOf('#')) {
		nearest = document.querySelector(selector);
	} else {
		p = el.parentNode;
		while (p) {
			elemenets = p.querySelectorAll(selector);
			d = contains(elemenets, el);
			if(d === null && elemenets.length > 0) {
				nearest = elemenets[0];
				break;
			} else if(elemenets.length > 1) {
				c = false;
				e = false;
				l = d-1;
				r = d+1;
				if(l < 0) {
					e = true;
				}
				if(r < elemenets.length) {
					c = true;
					rr = elemenets.length - r;
				}
				if(c && rr <= l) {
					nearest = elemenets[r];
				} else if(!e) {
					nearest = elemenets[l];
				} else if(c) {
					nearest = elemenets[r];
				}
			}
			if (nearest !== null) {
				break;
			}
			p = p.parentNode;
		}
		return nearest;
	}
}

function completeOtherPasswordField(elemenet) {
	var typeOfElement = elemenet.getAttribute('type');
	if(typeOfElement && typeOfElement === 'password'){
		var n = nearestElement(elemenet, 'input[type=password]');
		n.value = elemenet.value;
	}
}

chrome.runtime.onMessage.addListener(function(request) {
	if(request.name && request.name === 'password') {
		var password = request.password;
		var currentElement = document.activeElement;
		currentElement.value = password;
		copyToClipboard(password);
		completeOtherPasswordField(currentElement);
	}
});
