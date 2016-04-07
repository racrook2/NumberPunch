$(document).ready(function() {

    $('#gamesettingsForm').on('submit', function(event) {

        var op = 0;
        console.log("in gameSettings");

        var checkedOp = $('input[name=op]:radio:checked').val();
        if(checkedOp == 'add') {
            op = 0;
        } else if (checkedOp == 'mult') {
            op = 1;
        } else if (checkedOp == 'rand') {
            op = 2;
        }

        console.log("in gameSettings2");
    	
		var penThreshold = $('input[name=penalties]').val();
        
        var data = { penalty: penThreshold ,
                     gameRule: op};

        console.log("in gameSettings");
        
        Multiplayer.gameSettings(data);

        closeModal("#gamesettings");
        event.preventDefault();
    });
});
