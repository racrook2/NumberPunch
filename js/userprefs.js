//themes
var purpleTheme = {
    name : 'purple',
	bg : '#993399',
    bgColor : '#660066',
    fontColor : 'white'
};
var orangeTheme = {
    name : 'orange',
    bg : 'orange',
	bgColor : '#ff6600',
    fontColor : 'white'
};
var blackTheme = {
    name : 'black',
	bg : '#1f1f1f',
    bgColor : 'black',
    fontColor : 'white'
};

function changeName(name) {
    //change user's name
	if (name != "") {
		document.getElementById("greeting").innerHTML = "Hello, " + name;
	}
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
	$('body').css("background-color", theme.bg);
    $('#buttons div').css("color", theme.fontColor);
    $('#buttons div').css("background-color", theme.bgColor);
	$('.modal').css("background-color", theme.bgColor);
	$('.modal').css("color", theme.fontColor);
};

function changeBackground(src) {
	$('#background').css("background-image", "url('media/" + src + ".png')");
}

$(document).ready(function() {
    
    //handle clicking preferences button
    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
        openModal();
    });

    //handle preference submit
    $('#settingsForm').on('submit', function(event) {
        var checked = $('input[name=theme]:checked').val();
        if (checked == 'purple') {
            changeButtonTheme(purpleTheme);
        }
		else if (checked == 'orange') {
            changeButtonTheme(orangeTheme);
        }
		else if (checked == 'black') {
            changeButtonTheme(blackTheme);
        }
		checked = $('input[name=bg]:checked').val();
        changeBackground(checked);
		var name = $('input[name=name]').val();
		changeName(name);
        closeModal();
        event.preventDefault();
    });
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(){
        closeModal();
    });
	
	$(".modal-bg").on('click', function(){
        closeModal();
    });
});






