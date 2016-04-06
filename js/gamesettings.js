$(document).ready(function() {

    $('#gamesettingsForm').on('submit', function(event) {

        var op = 0;
        var checkedOp = $('input[name=op]:radio:checked').val();
        if(checkedOp == 'add') {
            op = 0;
        } else if (checkedOp == 'mult') {
            op = 1;
        } else if (checkedOp == 'rand') {
            op = 2;
        }
    	
		var penThreshold = $('input[name=penalties]').val();
        
        var data = { penalty: penThreshold ,
                     gameRule: op};

        Multiplayer.gameSettings(data);

        closeModal("#gamesettings");
        event.preventDefault();
    });
});
