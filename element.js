( function () {
function e(elementType, text, attributes, styles) {
	var newElement = document.createElement(elementType);
	newElement.textContent = text;
	//set the attributes on the tag
	for (var attr in attributes) {
		if (attributes.hasOwnProperty(attr)) {
			newElement.setAttribute(attr, attributes[attr]);
		}
	}
	//set the styles
	for (var style in styles) {
		if (styles.hasOwnProperty(style)) {
			newElement.style[style] = styles[style];
		}
	}
	return newElement;
}

function capitalize(aString) {
	aString = aString.trim();	// Removes whitespaces from the front and end 
	if (!aString) {  			// Checks if argument is empty  
		return;
	}
	var tmpString = "";
	aString = aString.toLowerCase().split(' '); // Converts string to lower case then into an array 
	for (var i in aString) { 
		switch (aString[i]) { 
			case 'the':  
			case 'of':   		// Cases we don't want to capitalize
			case 'and':  		// Break is ! used so every case gets evaluated 
			case 'a':
            case 'is':
			case 'an':
				if (i != 0) {	// Checks if the case is ! the first word in the string  
					tmpString += aString[i].slice(0) + ' ';
					break;		// Break is called inside the true scope to allow a jump to default if the condition is false 
				}
			default:
				tmpString += aString[i][0].toUpperCase() + aString[i].slice(1) + ' ';
				break;
		}
	}							// return is called after the for loop is done reiterating 
	return tmpString.trim();	// Removes the extra whitespace from the end
}

window.e = e;
window.capitalize = capitalize;

} () );