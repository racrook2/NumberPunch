// Generate random number on page load
window.onload = reset();

// Selects or deselects a number button
function select(id) {
	// Get right button index
	var light = document.getElementsByTagName("div")[id.slice(-1) - 1];
	if (light.style.backgroundColor != "lime") {
		// If not selected, activate light
		light.style.backgroundColor = "lime";
	}
	else {
		// If selected, deactivate light
		light.style.backgroundColor = "red";
	}
};

// Deselects all buttons and generates new number
function reset() {
	// Generate and display random number
	var number = document.getElementById("randomNumber");
    number.innerHTML = Math.floor(Math.random() * 100) + 1;;
	// Deactivate all lights
	var lights = document.getElementsByTagName("div");
	for (i = 0; i < lights.length; i++) {
		lights[i].style.backgroundColor = "red";
	}
};