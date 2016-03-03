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


function changeButtonTheme(theme) {
    //$('body').css("background-color", theme.bgColor);
    //$('body').css("color", theme.fontColor);
    $('#buttons div').css("color", theme.fontColor);
    $('#buttons div').css("background-color", theme.bgColor);
};


$(document).ready(function() {

    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
		
		$(".modal").css("marginTop", "0");
		$(".modal").css("marginLeft", ($(window).width() - $(".modal").width())/2);
		$(".modal-bg").fadeIn();
		$(".modal").fadeIn();
    });

    //handle preference submit
    $('#settingsForm').on('submit', function(event) {
        var checked = $('input[type=radio]:checked').val();
        if(checked == 'blueOrange') {
            changeButtonTheme(blueOrangeTheme);
        } else if (checked == 'blackWhite') {
            changeButtonTheme(blackWhiteTheme);
        }
		$(".modal-bg").fadeOut();
		$(".modal").fadeOut();
        event.preventDefault();
    });
	
	$(".close-modal").on('click', function(){
		$(".modal-bg").fadeOut();
		$(".modal").fadeOut();
	});
});






