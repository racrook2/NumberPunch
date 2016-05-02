/**
 * This gets the data from the game settings html structure
 */
$(document).ready(function() {

    $('#gamesettingsForm').on('submit', function(event) {

        var op = 0;
        console.log("in gameSettings");

    	var poolsize = $('input[name=poolsize]').val();
		var penThreshold = $('input[name=penalties]').val();

        var checkedOp = $('input[name=op]:radio:checked').val();
        if(checkedOp == 'add') {
            op = 0;
        } else if (checkedOp == 'mult') {
            op = 1;
        } else if (checkedOp == 'rand') {
            op = 2;
        }

        var data = { poolSize: poolsize, 
                     penalty: penThreshold,
                     gameRule: op};
        
        Multiplayer.gameSettings(data);

        closeModal("#gamesettings");
        event.preventDefault();
    });
});
