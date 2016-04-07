var db = new DB({
    Username: "Guest"
    //blueOrange: true,
    //blackWhite: false
})

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


/* openModal
 * fades the user preferences modal dialog into view
 */
function openModal(modalToOpen) {
    //$(".modal").css("marginTop", "0");
    $(modalToOpen).css("marginLeft", ($(window).width() - $(modalToOpen).width())/2);
    $(modalToOpen+"-bg").fadeIn();
    $(modalToOpen).fadeIn();
}

/* closeModal
 * fades the user preferences modal dialog out from view
 */
function closeModal(modalToClose) {
    $(modalToClose+"-bg").fadeOut();
    $(modalToClose).fadeOut();
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
function changeName(name) {
    db.setValue('Username', name);
    updateName();
    if (name != "") {
		document.getElementById("greeting").innerHTML = "Hello, " + name;
	}
};

function applySettings(settings) {
    changeButtonTheme(settings.buttonTheme);
}
function changeBackground(src) {
	$('#main').css("background-image", "url('media/" + src + ".png')");
}

$(document).ready(function() {

    updateName();
    
    //handle clicking preferences button
    $('#preferences').on('click', function(event) {
        console.log("Clicked Preferences");
        openModal('#userprefs');
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
		var name = db.getValue("Username");
		changeName(name);
        closeModal("#userprefs");
        event.preventDefault();
    });
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(e){
        closeModal("#"+e.target.parentElement.id);
    });

	
	$(".modal-bg").on('click', function(e){
        closeModal("#"+e.target.id.slice(0, -3)); //-3 for "-bg"
    });
});






