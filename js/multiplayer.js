var Multiplayer;
(function () {
    var GAMETYPE = 5023;
    var socket = io.connect("ctw.firecaster.com:80");
    var players = new Array();
    var gameStarter = false;
    var ready = false;
    var inProgress = false;

    function createGame() {
        gameStarter  = true;
        Multiplayer.readyPlayers  = 0;
        socket.emit("creategame", {
            title: "A game",
            type: GAMETYPE,
            max: 2,
            syncOrders: false
        });
    }
    socket.on('listgames', function (games) {
        //data[i].id, data[i].title, data[i].players, data[i].max
        var validGames = [];
        for (var i = 0; i < games.length; i++) {
            if (games[i].type == GAMETYPE && games[i].players < games[i].max) {
                console.log("Available game:", games[i]);
                validGames.push(games[i]);
            }
        }
        updateGamesList(validGames);
        return;
    });
    socket.on('order', function (data) {
        console.log("Got order", data);
        handleOrder(data);
    });
    socket.on('shout', function (data) {
        console.log("Got shout", data);
        handleShout(data);
    });
    socket.on('orders', function (data) {
        console.log("Got orders", data);
    });
    socket.on('youjoined', function () {
        console.log("youjoined");
    });
    socket.on('start', function (data) {
        console.log("Game is starting ", data);

        var myIndex = data['me'];
        inProgress = true;
        GameInstance.startGameHandle(data, Multiplayer.players);
        for(var i=0; i < Multiplayer.players.length; i++){
            GameInterface.reset(GameInstance.targetNum[Multiplayer.players[i]], i===myIndex);
        }
    });
    socket.on('players', function (data) {
        console.log("Players:", data);
        
        var pen = GameInstance.getPenaltyThreshold();
        var gR = GameInstance.getGameRule();
        var pS = GameInstance.getPoolSize();
            
        if(gameStarter) {
          socket.emit('shout', {type : "setting", poolSize: pS, penalty : pen, gameRule: gR });
        }

        Multiplayer.players = data;
    });

    function joinGame(id) {
        socket.emit('joingame', id);
    }
    function leaveGame() {
      if (ready){
        if (inProgress){
          socket.emit('order', {type:'loss', player:GameInstance.myID});
        }
        socket.emit('shout', {type: 'unready'});
      }
      ready = false;
      socket.emit('leavegame');
      Multiplayer.readyPlayers = 0;

    }
    function sendOrder(data) {
        console.log("entered send Order");
        //console.log(data);
        socket.emit("order", data);
        console.log("exited send Order");

    }
    function refreshGameList() {
        socket.emit('listgames');
    }
    function startGame() {
        console.log("start");

        socket.emit("startgame");
    }
    function startGameCheck() {
        console.log("startGame");
        if(Multiplayer.readyPlayers === 2)
        {
            return true;
        }
        else
        {
          console.log("both players not ready");
          return false;
        }
        
    }
    function readyGame(){
      if (ready) return;

      console.log("readying the game");
      
      socket.emit("shout",{type:"ready"});

      console.log(Multiplayer.readyPlayers);
      console.log(Multiplayer.players);

      ready = true;

    }
    function gameSettings(data)
    {
      console.log("in gameSettings");
      socket.emit('shout', {type : "setting", playerid: GameInstance.myID, penalty : data['penalty'], gameRule : data['gameRule'], poolSize: data['poolSize']});
      
    }
    function handleShout (data) {
      var orderType = data['type'];

      switch(orderType){
          
          case "ready":
            Multiplayer.readyPlayers = Multiplayer.readyPlayers+1;
            console.log(Multiplayer.readyPlayers);
            break;
          case "unready":
            Multiplayer.readyPlayers = Multiplayer.readyPlayers-1;
            break;
          case "setting":
            var penalty = data['penalty'];
            var gameRule = data['gameRule'];
            var poolSize = data['poolSize'];
            GameInstance.setPenaltyThreshold(penalty);
            GameInstance.setGameRule(gameRule);
            GameInstance.setPoolSize(poolSize);
            GameInterface.createButtons(GameInstance.getPoolSize());
            //console.log(GameInstance.getPenaltyThreshold());
            break;
          default:
            break;

      }

    }

    function handleOrder(data) {
      var orderType = data['type'];
      var playerID = data['playerid'];
      var myID = GameInstance.myID;
      var isMine = (myID == playerID);
      var retCode = 0;
      switch(orderType) {
        case "selectnum":
          var num = data['num'];
          retCode = GameInstance.selectNumHandle(playerID, num);

          if(retCode == 1) {
            GameInterface.deselect(num, isMine);
          } else if(retCode == 2) {
            GameInterface.select(num, isMine);
          } else if(retCode == 3) {
            GameInterface.select(num, isMine);
            GameInterface.makeUnavail(isMine);
            var newTar = GameInstance.targetNum[playerID];
            GameInterface.reset(newTar, isMine);
          } else if(retCode == 4) {
            var newTar = GameInstance.targetNum[playerID];
            GameInterface.reset(newTar, isMine);
          }
          break;

        case "resettar":
          retCode = GameInstance.resetTarNumHandle(playerID);
          var tarNum = GameInstance.targetNum[playerID];
          GameInterface.reset(tarNum, isMine);
          if(retCode > 0){
            GameInterface.makeAvail(retCode, isMine);
          }
          break;

          case "setting":
            var penalty = data['penalty'];
            var gameRule = data['gameRule'];
            GameInstance.setPenaltyThreshold(penalty);
            GameInstance.setGameRule(gameRule);
            console.log(GameInstance.getPenaltyThreshold());
            break;
        case "message":
          var msg = data['msg'];
          GameInterface.displayMessage(msg, isMine);
          break;
        case "loss":
          console.log("Game ended");
          var losing_player = data['player'];
          console.log(losing_player);
          player_1 = GameInstance.userIDs[0];
          console.log(player_1);
          if (player_1 == losing_player){
            console.log("case 1");
            GameInstance.declareWinner(GameInstance.userIDs[1]);
          }
          else {
            console.log("case 2");
            GameInstance.declareWinner(GameInstance.userIDs[0]);
          }
          break;
          
        case "winner declared":
            if(data['player'] == myID){
             $('#leaveGame').css('display', 'none');
             $('#exit').css('display', 'inline-block');
             $('#gameSpace').load('./winscreen.html');
          }
          break;
        default:
          // Do nothing
          break;
    }
  };
    Multiplayer = {
        socket: socket,
        createGame: createGame,
        players: players,
        joinGame: joinGame,
        sendOrder: sendOrder,
        refreshGameList: refreshGameList,
        startGame: startGame,
        leaveGame: leaveGame,
        readyGame: readyGame,
        startGameCheck: startGameCheck,
        gameSettings: gameSettings
    }
})();
