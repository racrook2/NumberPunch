var Multiplayer;
(function () {
    var GAMETYPE = 5023;
    var socket = io.connect("ctw.firecaster.com:80");
    var players = new Array();
    var gameStarter =false;
    var readyPlayers  = 0;
    function createGame() {
        gameStarter  = true;
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
        handleOrder(data);
    });
    socket.on('orders', function (data) {
        console.log("Got orders", data);
    });
    socket.on('youjoined', function () {
        console.log("youjoined");
    });
    socket.on('start', function (data) {
        console.log("Game is starting ", data);
        GameInstance.startGameHandle(data, Multiplayer.players);
    });
    socket.on('players', function (data) {
        console.log("Players:", data);
        Multiplayer.players = data;
    });

    function joinGame(id) {
        socket.emit('joingame', id);
    }
    function leaveGame() {
        socket.emit('leavegame');
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
        console.log("start");
        if(readyPlayers === 2)
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
      console.log("readying the game");

      if(gameStarter)
      {
        readyPlayers = readyPlayers+1;
      }
      else
      {
        console.log("ready from joined player");
        socket.emit("shout",{type:"ready" , playerid: Multiplayer.players[1]});
        console.log("ranSend");
      }

      console.log(readyPlayers);
      console.log(Multiplayer.players);

    }
    function handleOrder(data) {
      var orderType = data['type'];
      var playerID = data['playerid'];
      var myID = GameInstance.myID;
      var isMine = (myID == playerID);
      switch(orderType) {
        case "selectnum":
          var num = data['num'];
          var retCode = GameInstance.selectNumHandle(playerID, num);

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
          GameInstance.resetTarNumHandle(playerID);
          var tarNum = GameInstance.targetNum[playerID];
          GameInterface.reset(tarNum, isMine);
          break;

        case "ready":
          if(playerID === Multiplayer.players[1] && gameStarter)
          {
            console.log("got ready from joined");
            readyPlayers = readyPlayers+1;
          }
          
          
          console.log(readyPlayers);
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
        startGameCheck: startGameCheck
    }
})();
