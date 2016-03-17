var db = new DB({
    Username: "Guest",
    blueOrange: true,
    blackWhite: false
})


//themes
var blueOrangeTheme = {
    name : 'blueOrange',
    bgColor : 'orange',
    fontColor : 'blue'
};
var blackWhiteTheme = {
    name : 'blackWhite',
    bgColor : 'black',
    fontColor : 'white'
};

function changeName(name) {
    //change user's name
};

/* openModal
 * fades the user preferences modal dialog into view
 */
function openModal() {
    $(".modal").css("marginTop", "0");
    $(".modal").css("marginLeft", ($(window).width() - $(".modal").width())/2);
    $(".modal-bg").fadeIn();
    $(".modal").fadeIn();
}

/* closeModal
 * fades the user preferences modal dialog out from view
 */
function closeModal() {
    $(".modal-bg").fadeOut();
    $(".modal").fadeOut();
}

/* changeButtonTheme
 * changes visual appearance (bg color, text color) of div containing buttons
 * @input theme the JSON theme object to change to
 */
function changeButtonTheme(theme) {
    $('#buttons div').css("color", theme.fontColor);
    $('#buttons div').css("background-color", theme.bgColor);
};

function changeFontSize(font_size) {
    $('body').css("font-size", font_size);
}

function changeBackgroundColor(color) {
    $('body').css("background-color", color);
}

function applySettings(settings) {
    changeButtonTheme(settings.buttonTheme);
}

$(document).ready(function() {
    
    //handle clicking preferences button
    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
        openModal();
    });

    //handle preference submit
    $('#settingsForm').on('submit', function(event) {
        var checkedTheme = $('input[name=theme]:radio:checked').val();
        if(checkedTheme == 'blueOrange') {
            changeButtonTheme(blueOrangeTheme);
        } else if (checkedTheme == 'blackWhite') {
            changeButtonTheme(blackWhiteTheme);
        }
    	var checkedFont = $('input[name=font]:radio:checked').val();
    	if(checkedFont == 'largeFont') {
    		
    	} else if (checkedFont == 'mediumFont'){
    		
    	} else if (checkedFont == 'smallFont') {
    		
    	}
    	var checkedColor = $('input[name=bcolor]:radio:checked').val();
    	console.log(checkedColor);
    	if(checkedColor == 'white'){
    		changeBackgroundColor('WHITE');
    	} else if(checkedColor == 'red'){
    		changeBackgroundColor('RED');
    	} else if(checkedColor == 'blue'){
    		changeBackgroundColor('BLUE');
    	} else if(checkedColor == 'green'){
    		changeBackgroundColor('GREEN');
    	}
        closeModal();
        event.preventDefault();
    });
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(){
        closeModal();
    });

});






