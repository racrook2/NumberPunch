
var blueOrangeTheme = {
    name : 'blueOrange',
    bgColor : 'blue',
    fontColor : 'orange'
};
var blackWhiteTheme = {
    name : 'blackWhite',
    bgColor : 'black',
    fontColor : 'white'
};

function changeName(name) {
    //change user's name
};


function changeTheme(theme) {
    $('body').css("background-color", theme.bgColor);
    $('body').css("color", theme.fontColor);
    $('#buttons div').css("color", theme.bgColor);
    $('#buttons div').css("background-color", theme.fontColor);
};


$(document).ready(function() {

    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
        $('#settings').toggle();
    });

    //handle preference submit
    $('#settingsForm').on('submit', function(event) {
        var checked = $('input[type=radio]:checked').val();
        if(checked == 'blueOrange') {
            changeTheme(blueOrangeTheme);
        } else if (checked == 'blackWhite') {
            changeTheme(blackWhiteTheme);
        }
        event.preventDefault();
    });
});






