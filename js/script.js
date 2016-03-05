// Generate random number on page load
window.onload = reset();

// Selects or deselects a number button
function select(id) {
	// Get right button index
	var buttonWrapper = document.getElementsByClassName("button-wrapper player-button")[id.slice(-2) - 1];
	//var light = buttonWrapper.getElementsByClassName("light")[0];
	if (!buttonWrapper.classList.contains("selected")&&!buttonWrapper.classList.contains("used")) {
		// If not selected, activate light
		buttonWrapper.classList.add("selected");
	}
	else if (buttonWrapper.classList.contains("selected")&&!buttonWrapper.classList.contains("used")) {
		// If selected, deactivate light
		buttonWrapper.classList.remove("selected")
	}
};

// Deselects all buttons and generates new number
function reset() {
	// Generate and display random number
	//TODO: replace with call to game logic function
	var number = document.getElementById("playerTarget");
    number.innerHTML = Math.floor(Math.random() * 100) + 1;
	// Deactivate all lights
	var lights = document.getElementsByClassName("light");
	for (i = 0; i < lights.length; i++) {
		lights[i].style.backgroundColor = "red";
	}
};