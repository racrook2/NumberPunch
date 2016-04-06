 $('#gamesettingsForm').on('submit', function(event) {

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
		var name = $('input[name=name]').val();
		changeName(name);
        closeModal("#userprefs");
        event.preventDefault();
    });
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(){
        closeModal("#userprefs");
    });

	
	$(".modal-bg").on('click', function(){
        closeModal("#userprefs");
    });
});
