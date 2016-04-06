$(document).ready(function() {

    $('#gamesettingsForm').on('submit', function(event) {

        changeName($('input[type=text]').val());

        var checkedOp = $('input[name=op]:radio:checked').val();
        if(checkedOp == 'add') {
            changeButtonTheme(blueOrangeTheme);
        } else if (checkedOp == 'mult') {
            changeButtonTheme(blackWhiteTheme);
        } else if (checkedOp == 'rand') {
            changeButtonTheme(blackWhiteTheme);
        }
    	
		var penThreshold = $('input[name=penalties]').val();
		changeName(name);
        
        closeModal("#gamesettings");
        event.preventDefault();
    });
    
});
