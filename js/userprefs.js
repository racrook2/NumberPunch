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
        var checked = $('input[type=radio]:checked').val();
        if(checked == 'blueOrange') {
            changeButtonTheme(blueOrangeTheme);
        } else if (checked == 'blackWhite') {
            changeButtonTheme(blackWhiteTheme);
        }
		closeModal();
        event.preventDefault();
    });
	
	//handle clicking 'x' in modal to exit
	$(".close-modal").on('click', function(){
		closeModal();
	});
});






