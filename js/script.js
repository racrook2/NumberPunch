// Generate random number on page load
window.onload=reset();

// Selects or deselects a number button
function select(id) {
	// Get right button index
	var buttonWrapper = document.getElementsByClassName("button-wrapper player-button")[id.slice(-2) - 1];
	if (!buttonWrapper){
		return false;
	}
	if (!buttonWrapper.classList.contains("selected")&&!buttonWrapper.classList.contains("used")) {
		// If not selected, activate light
		buttonWrapper.classList.add("selected");
	}
	else if (buttonWrapper.classList.contains("selected")&&!buttonWrapper.classList.contains("used")) {
		// If selected, deactivate light
		buttonWrapper.classList.remove("selected")
	}
	return true;
};

// Deselects all buttons and generates new number
function reset() {
	// Generate and display random number
	//TODO: replace with call to game logic function
	var number = document.getElementById("playerTarget");
	if(number) {
		number.innerHTML = Math.floor(Math.random() * 100) + 1;
	}
	// Deactivate all lights
	var wrappers = document.getElementsByClassName("button-wrapper player-button");
	for (i = 0; i < wrappers.length; i++) {
		wrappers[i].classList.remove("selected");
	}
};

function checkKey(e) {
	charCode = (e.which)? e.which : e.keyCode;
	switch (charCode) {
		case 32:
			reset();
			break;
		case 48:
			select("number10");
			break;
		case 49:
			select("number01");
			break;
		case 50:
			select("number02");
			break;
		case 51:
			select("number03");
			break;
		case 52:
			select("number04");
			break;
		case 53:
			select("number05");
			break;
		case 54:
			select("number06");
			break;
		case 55:
			select("number07");
			break;
		case 56:
			select("number08");
			break;
		case 57:
			select("number09");
			break;
		default:
			break;
	}
}


$(document).keypress(
	function(evt) {
		checkKey(evt);
	}
)
