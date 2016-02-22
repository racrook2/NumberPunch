var Multiplayer;
(function () {
    var GAMETYPE = 5023;
    var socket = io.connect("ctw.firecaster.com");
    function createGame() {
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
    });
    socket.on('orders', function (data) {
        console.log("Got orders", data);
    });
    socket.on('youjoined', function () {
        console.log("youjoined");
    });
    socket.on('start', function (data) {
        console.log("Game is starting", data);
    });
    socket.on('players', function (data) {
        console.log("Players:", data);
    });
    function joinGame(id) {
        socket.emit('joingame', id);
    }
    function leaveGame() {
        socket.emit('leavegame');
    }
    function sendOrder(data) {
        socket.emit("order", data);
    }
    function refreshGameList() {
        socket.emit('listgames');
    }
    function startGame() {
        socket.emit("startgame");
    }
    Multiplayer = {
        socket: socket,
        createGame: createGame,
        joinGame: joinGame,
        sendOrder: sendOrder,
        refreshGameList: refreshGameList,
        startGame: startGame,
        leaveGame: leaveGame
    }
})();
