function updateGamesList(games) {
	$('#gamesList').html('');
	if (games.length<1) {
		$('#gamesList').html('No Available Games');
	}
	for (var i = 0; i < games.length; i++){
		$('#gamesList').append("<div class='game' id='"+games[i].id+"'>"+games[i].id+": Players - "+games[i].players+"</div>");
	}
}

$(document).ready(function() {
	Multiplayer.refreshGameList();

	var c = document.getElementById("gameCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();

	$('#leaveGame').css('display', 'none');
	$('#gameCanvas').css('display', 'none');

	$('#refresh').on('click', function() {
		console.log("Clicked Refresh");
		Multiplayer.refreshGameList();
		return false;
	});

	$('#createGame').on('click', function() {
		console.log("Clicked Create");
		Multiplayer.createGame();
		
		$('#leaveGame').css('display', 'inline-block');
		$('#gameCanvas').css('display', 'block');
		$('#createGame').css('display', 'none');
		$('#refresh').css('display', 'none');
		$('#gamesList').css('display', 'none');

		return false;
	});

	$('#leaveGame').on('click', function() {
		console.log("Clicked Leave");
		Multiplayer.leaveGame();

		$('#leaveGame').css('display', 'none');
		$('#gameCanvas').css('display', 'none');
		$('#createGame').css('display', 'inline-block');
		$('#refresh').css('display', 'inline-block');
		$('#gamesList').css('display', 'block');

		return false;
	});

	$(document.body).delegate('.game', 'click' ,function(){
		console.log("Clicked a Game");
		Multiplayer.joinGame($(this).attr('id'));

		$('#leaveGame').css('display', 'inline-block');
		$('#gameCanvas').css('display', 'block');
		$('#createGame').css('display', 'none');
		$('#refresh').css('display', 'none');
		$('#gamesList').css('display', 'none');

		return false;
	});

});

