//updateGamesList recieves a list of games passed in and adds them to the games list on index. If no games are available, the div displays "No Available Games"
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

	var c = document.getElementById("gameCanvas"); //Sample game canvas. Will be replaced by the game itself upon creation.
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();

	//Hide leave game and game upon loading as they are not needed until a game is starting.
	$('#leaveGame').css('display', 'none');
	$('#settings').css('display', 'none');
	$('#gameCanvas').css('display', 'none');

	//Refresh when refresh button is clicked.
	$('#refresh').on('click', function() {
		console.log("Clicked Refresh");
		Multiplayer.refreshGameList();
		return false;
	});
	
	//Upon clicking "Create Game", the backend will recieve an order to create the game and both the create game and refresh buttons will disappear, being replaced by "Leave game".
	$('#createGame').on('click', function() {
		console.log("Clicked Create");
		Multiplayer.createGame();
		
		$('#leaveGame').css('display', 'inline-block');
		$('#gameCanvas').css('display', 'block');
		$('#createGame').css('display', 'none');
		$('#refresh').css('display', 'none');
		$('#gamesList').css('display', 'none');
		$('#preferences').css('display', 'none');

		return false;
	});
	/*
	$('#preferences').on('click', function() {
		console.log("Clicked Preferences");
		
		$('#createGame').css('display', 'none');
		$('#refresh').css('display', 'none');
		$('#preferences').css('display', 'none');
		$('#gamesList').css('display', 'none');
		$('#settings').css('display', 'block');
	});*/
	
	//Upon clicking "Leave game" the backend wil recieve an order to leave the game and the leave game button will disappear, being replaced by create game and refresh.
	$('#leaveGame').on('click', function() {
		console.log("Clicked Leave");
		Multiplayer.leaveGame();

		$('#leaveGame').css('display', 'none');
		$('#gameCanvas').css('display', 'none');
		$('#createGame').css('display', 'inline-block');
		$('#refresh').css('display', 'inline-block');
		$('#gamesList').css('display', 'block');
		$('#preferences').css('display', 'inline-block');

		return false;
	});

	//TODO: figure out why this deprecated function works and "onclick" doesnt
	//Upon clicking a game, the backend will recieve an order to join the game clicked. The create game and refresh buttons will disappear, being replaced by leave game.
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
