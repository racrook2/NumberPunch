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

function openModal() {
	$(".modal").css("marginTop", "0");
	$(".modal").css("marginLeft", ($(window).width() - $(".modal").width())/2);
	$(".modal-bg").fadeIn();
	$(".modal").fadeIn();
}

function closeModal() {
	$(".modal-bg").fadeOut();
	$(".modal").fadeOut();
}

function changeButtonTheme(theme) {
    $('#buttons div').css("color", theme.fontColor);
    $('#buttons div').css("background-color", theme.bgColor);
};


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






