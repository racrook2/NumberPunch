/**
 * This code is running on ctw.firecaster.com
 * It is copied here for reference
 */
var game = [];
var games = game;

function Game(e) {
    this.players = [];
    this.orders = [];
    for (var i in e) {
        this[i] = e[i];
    }
    game.push(this);
}
Game.prototype = {
    started: false,
    max: 1,
    players: [],
    type: 0,
    orders: [],
    syncOrders: true,
    title: "Untitled Game",
    addPlayer: function (p) {
        if (this.players.length < this.max && !this.started) {
            if (p.game) {
                p.game.removePlayer(p);
            }
            this.players.push(p);
            p.game = this;
            this.sendPlayers();
            return true;
        }
        return false;
    },
    sendPlayers: function () {
        var p = [];
        for (var i in this.players) {
            p.push(this.players[i].name);
        }
        this.send("players", p);
    },
    removePlayer: function(p){
        removeSplice(this.players, p);
        p.game = false;
        this.sendPlayers();
        if (this.players.length <= 0) {
            remove(games, this);
        }
    },
    send: function (t, d) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].emit(t, d)
        }
    },
    start: function () {
        this.started = true;
        var seed = Math.random();
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].emit('start', {
                pc: this.players.length,
                me: i,
                seed: seed
            });
        }

    },
    order: function (data, socket) {

        if (this.started) {
            for (var i = 0; i < this.players.length; i++) {
                if (socket == this.players[i]) {
                    break;
                }
            }
            data.from = i;
            if (this.syncOrders) {
                this.orders.push(data);
            }
            else {
                this.send("order", data);
            }
        }
    },
    step: function () {
        if (!this.syncOrders)
            return;

        if (this.started) {
            this.orders.push({
                from: -1,
                type: "random",
                number: Math.random()
            });
            this.send("orders", this.orders);
            this.orders = [];
        }
    }
};
var io = require('socket.io').listen(8162);
io.set('log level', 1); // reduce logging
io.sockets.on('connection', function (socket) {
    socket.name = "Guest " + Math.random();
    console.log("somebody connected");
    
    socket.on('disconnect', function () {
        console.log("they left?!?!");
        if (socket.game) {
            socket.game.removePlayer(socket);
        }
    });

    socket.on('leavegame', function () {
        if (socket.game) {
            socket.game.removePlayer(socket);
        }

    });

    socket.on('listgames', function () {
        var titles = [];
        for (var i in games) {
            if (!games[i].started && games[i].players.length < games[i].max) {
                titles.push({
                    title: games[i].title,
                    max: games[i].max,
                    type: games[i].type,
                    players: games[i].players.length,
                    id: i
                });
            }

        }
        socket.emit('listgames', titles);
    });
    socket.on('joingame', function (data) {
        data = parseInt(data);
        if (data || data === 0) {
            if (!game[data].addPlayer(socket)) {
                console.log("error");
                socket.emit('error', 'game is full');
            }
            else {
                console.log("joined");
                socket.emit('youjoined');
            }
        }
    });
    socket.on('creategame', function (data) {
        var syncOrders;
        if (typeof data.syncOrders == 'undefined'){
            syncOrders = Game.prototype.syncOrders;
        }
        else{
            syncOrders = data.syncOrders;
        }
        var g = new Game({
            title: data.title,
            type: data.type,
            syncOrders: syncOrders,
            max: Math.max(data.max,1)
        });
        if (!g.addPlayer(socket)) {
            socket.emit('error', 'game is full');
        }
    });
    socket.on('startgame', function () {
        if (socket.game) {
            if (socket.game.players[0] == socket) {
                if (!socket.game.started) {
                    socket.game.start();
                }
            }
        }
    });
    socket.on('order', function (data) {
        if (socket.game) {
            socket.game.order(data,socket);
        }
    });
	socket.on('shout', function(data){
		if (socket.game){
			socket.game.send('shout',data);
		}
	});
});


function remove(arr, item) {
    var i;
    while ((i = arr.indexOf(item)) !== -1) {
        delete arr[i];
    }
}
function removeSplice(arr, item) {
    var i;
    while ((i = arr.indexOf(item)) !== -1) {
        arr.splice(i,1);
    }
}
setInterval(function () {
    for (var i in games) {
        games[i].step();
    }
}, 33);
