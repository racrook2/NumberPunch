
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


function changeTheme(theme) {
    $('body').css("background-color", theme.bgColor);
    $('body').css("color", theme.fontColor);
};


$(document).ready(function() {
    //handle preference submit
    $('#settings').on('submit', function(event) {
        var checked = $('input[type=radio]:checked').val();
        if(checked == 'blueOrange') {
            changeTheme(blueOrangeTheme);
        } else if (checked == 'blackWhite') {
            changeTheme(blackWhiteTheme);
        }
        event.preventDefault();
    });
};






