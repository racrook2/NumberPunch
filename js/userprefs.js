var db = new DB({
    Username: "Guest"
    //blueOrange: true,
    //blackWhite: false
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
    db.setValue('Username', name);
    updateName();
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
    $('#buttons').css("font-size", font_size);
    $('#gamesList').css("font-size", font_size);
    $('#gameSpace').css("font-size", font_size);
}

function changeBackgroundColor(color) {
    $('body').css("background-color", color);
}

function updateName() {
    $('#username').text(db.getValue('Username'));
}

function applySettings(settings) {
    changeButtonTheme(settings.buttonTheme);
}

$(document).ready(function() {

    updateName();
    
    //handle clicking preferences button
    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
        openModal();
    });

    //handle preference submit
    $('#settingsForm').on('submit', function(event) {

        changeName($('input[type=text]').val());

        var checkedTheme = $('input[name=theme]:radio:checked').val();
        if(checkedTheme == 'blueOrange') {
            changeButtonTheme(blueOrangeTheme);
        } else if (checkedTheme == 'blackWhite') {
            changeButtonTheme(blackWhiteTheme);
        }
    	var checkedFont = $('input[name=font]:radio:checked').val();
    	if(checkedFont == 'largeFont') {
    		changeFontSize('x-large');
    	} else if (checkedFont == 'mediumFont'){
    		changeFontSize('medium');
    	} else if (checkedFont == 'smallFont') {
    		changeFontSize('small');
    	}
    	var checkedColor = $('input[name=bcolor]:radio:checked').val();
    	console.log(checkedColor);
        changeBackgroundColor(checkedColor);

        closeModal();
        event.preventDefault();
    });
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(){
        closeModal();
    });

});






