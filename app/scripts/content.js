'use strict';

function copyToClipboard(str) {
	document.oncopy = function(event) {
		event.clipboardData.setData('text/plain', str);
		event.preventDefault();
	};
	document.execCommand('Copy', false, null);
}

function currentElementIndex(array, obj) {
	var i = array.length;
	while (i--) {
		if (array[i] === obj) {
			return i;
		}
	}
	return null;
}

function nearestElement(el, selector) {
	var nearest = null;
	var elemenets,
		node,
		leftElement,
		rightElement,
		rightDistance,
		canRight,
		canLeft,
		elementIndex;

	if (!selector.indexOf('#')) {
		nearest = document.querySelector(selector);
	} else {
		node = el.parentNode;
		while (node) {
			elemenets = node.querySelectorAll(selector);
			elementIndex = currentElementIndex(elemenets, el);
			if(elementIndex === null && elemenets.length > 0) {
				nearest = elemenets[0];
				break;
			} else if(elemenets.length > 1) {
				canRight = false;
				canLeft = false;
				leftElement = elementIndex-1;
				rightElement = elementIndex+1;
				if(leftElement < 0) {
					canLeft = true;
				}
				if(rightElement < elemenets.length) {
					canRight = true;
					rightDistance = elemenets.length - rightElement;
				}
				if(canRight && rightDistance <= leftElement) {
					nearest = elemenets[rightElement];
				} else if(!canLeft) {
					nearest = elemenets[leftElement];
				} else if(canRight) {
					nearest = elemenets[rightElement];
				}
			}
			if (nearest !== null) {
				break;
			}
			node = node.parentNode;
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
