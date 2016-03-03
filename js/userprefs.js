
var blueOrangeTheme = {
    name : 'Blue/Orange',
    bgColor : 'blue',
    fontColor : 'orange'
};

//handle preference submit
$('#settings').on('submit', function(event) {
    var checked = $('input[type=radio]:checked').val();
    if(checked == 'Blue') {
        changeTheme(blueOrangeTheme);
    }
    event.preventDefault();
});

function changeTheme(theme) {
    $('body').css("background-color", theme.bgColor);
    $('body').css("color", theme.fontColor);
};