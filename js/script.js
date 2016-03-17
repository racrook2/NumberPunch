

var GameInterface;
(function() {
	function select(num, isYours) {
		var buttonWrappers;
		if(isYours) {
			buttonWrappers = document.getElementsByClassName("button-wrapper player-button");
		} else {
			buttonWrappers = document.getElementsByClassName("button-wrapper opponent-button");
		}

		var buttonWrapper = buttonWrappers[num-1];
		if(!buttonWrapper) return false;
		buttonWrapper.classList.add("selected");
	};

	function deselect(num, isYours) {
		var buttonWrappers;
		if(isYours) {
			buttonWrappers = document.getElementsByClassName("button-wrapper player-button");
		} else {
			buttonWrappers = document.getElementsByClassName("button-wrapper opponent-button");
		}

		var buttonWrapper = buttonWrappers[num-1];
		if(!buttonWrapper) return false;
		buttonWrapper.classList.remove("selected");
	};

	function reset(newTarget, isYours) {
		var tarNum;
		var wrappers;
		if(isYours) {
			tarNum = document.getElementById("playerTarget");
			wrappers = document.getElementsByClassName("button-wrapper player-button");
		} else {
			tarNum = document.getElementById("opponentTarget");
			wrappers = document.getElementsByClassName("button-wrapper opponent-button");
		}

		if(tarNum) {
			tarNum.innerHTML = newTarget;
		}

		for(var i = 0; i < wrappers.length; i++) {
			wrappers[i].classList.remove("selected");
		}
	};

	function makeUnavail(isYours) {
		var wrappers;
		if(isYours) {
			wrappers = document.getElementsByClassName("button-wrapper player-button selected");
		} else {
			wrappers = document.getElementsByClassName("button-wrapper opponent-button selected");
		}

		console.log(wrappers);

		for(var i = 0; i < wrappers.length; i++) {
			wrappers[i].classList.add("unavail");
			//wrappers[i].classList.add("unavail");
		}
		
		for(var i = 0; i < wrappers.length; i++) {
			wrappers[i].classList.remove("selected");
			//wrappers[i].classList.add("unavail");
		}
	};

	GameInterface = {
		select: select,
		deselect: deselect,
		reset: reset,
		makeUnavail: makeUnavail
	};
})();

// Generate random number on page load
window.onload=GameInterface.reset();

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


/*$(document).keypress(
	function(evt) {
		checkKey(evt);
	}
)*/
