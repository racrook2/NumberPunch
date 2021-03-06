

var GameInterface;
(function() {

    /**
     * Make the number buttons
     */
    function createButtons(poolsize) {
        var actual = poolsize;
        if (actual < 1 || actual > 20) {
            actual = 10;
        }
        var opButtons = $('#opponent-buttons');
        opButtons.html("");
        for (var x = 1; x <= actual; x++) {
            $('<div/>', {
                'class': 'button-wrapper opponent-button',
                'html': ('<button disabled>' + x + '</button><div class="light"></div>')
            }).appendTo(opButtons);
        }
        var myButtons = $('#player-buttons');
        myButtons.html("");
        for (var x = 1; x <= actual; x++) {
            $('<div/>', {
                'class': 'button-wrapper player-button',
                'id': 'wrapper' + x,
                'html': ('<button onclick="GameInstance.selectNum(' + x + ')">' + x + '</button><div class="light"></div>')
            }).appendTo(myButtons);
        }
    }

    /**
     * Select a button
     */
    function select(num, isYours) {
        var buttonWrappers;
        if (isYours) {
            buttonWrappers = document.getElementsByClassName("button-wrapper player-button");
        } else {
            buttonWrappers = document.getElementsByClassName("button-wrapper opponent-button");
        }

        var buttonWrapper = buttonWrappers[num - 1];
        if (!buttonWrapper) return false;
        buttonWrapper.classList.add("selected");
    };

    /**
     * Deselect a button
     */
    function deselect(num, isYours) {
        var buttonWrappers;
        if (isYours) {
            buttonWrappers = document.getElementsByClassName("button-wrapper player-button");
        } else {
            buttonWrappers = document.getElementsByClassName("button-wrapper opponent-button");
        }

        var buttonWrapper = buttonWrappers[num - 1];
        if (!buttonWrapper) return false;
        buttonWrapper.classList.remove("selected");
    };

    /**
     * Reset which buttons are selected
     */
    function reset(newTarget, isYours) {
        var tarNum;
        var wrappers;
        if (isYours) {
            tarNum = document.getElementById("playerTarget");
            wrappers = document.getElementsByClassName("button-wrapper player-button");
        } else {
            tarNum = document.getElementById("opponentTarget");
            wrappers = document.getElementsByClassName("button-wrapper opponent-button");
        }

        if (tarNum) {
            tarNum.innerHTML = newTarget;
        }

        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].classList.remove("selected");
        }
    };

    /**
     * Make buttons unavailable.
     */
    function makeUnavail(isYours) {
        var wrappers;
        if (isYours) {
            wrappers = document.getElementsByClassName("button-wrapper player-button selected");
        } else {
            wrappers = document.getElementsByClassName("button-wrapper opponent-button selected");
        }

        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].classList.add("unavail");
        }

        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].classList.remove("selected");
        }
    };

    /**
     * Make buttons available
     */
    function makeAvail(num, isYours) {
        var wrappers;
        if (isYours) {
            wrappers = document.getElementsByClassName("button-wrapper player-button");
        } else {
            wrappers = document.getElementsByClassName("button-wrapper opponent-button");
        }

        if (num > wrappers.length) {
            return;
        }

        wrappers[num - 1].classList.remove("unavail");
    };

    /**
     * Display a message in the chatbox
     */
    function displayMessage(msg, isYours) {


        // Get the chatbox in order to prepend a message to its children
        var chatbox = document.getElementById("chatbox");
        var d = new Date();
        var datetime = d.getDate() + "/" + (d.getMonth() + 1) + "/"
            + d.getFullYear() + " , " + d.getHours() + ":"
            + d.getMinutes() + ":" + d.getSeconds();

        if (isYours) {
            chatbox.innerHTML = "<p>(" + datetime + ") <b>You</b>: " + msg + chatbox.innerHTML + "</p>";
        } else {
            chatbox.innerHTML = "<p>(" + datetime + ") <b>Opponent</b>: " + msg + chatbox.innerHTML + "</p>";
        }
    }

    GameInterface = {
        createButtons: createButtons,
        select: select,
        deselect: deselect,
        reset: reset,
        makeUnavail: makeUnavail,
        makeAvail: makeAvail,
        displayMessage: displayMessage
    };
})();

// Generate random number on page load
window.onload = function() {
    GameInterface.reset("", true);
    GameInterface.reset("", false);
}

