var socket;
var GAME_TYPE = 268201;

QUnit.module("Server Test", {
    beforeEach: function () {
        if (socket) {
            socket.socket.connect();
        }
        else {
            socket = io.connect("ctw.firecaster.com:80");
        }
    },
    afterEach: function () {
        socket.removeAllListeners();
        socket.disconnect();
    }
});

/**
 * Can connect ot server
 */
QUnit.test("Did we connect", function (assert) {
    var done = assert.async();
    socket.on('connect', function () {
        assert.ok(true, "connected to ctw.firecaster.com");
        done();
    });
});

/**
 * Can get game list
 */
QUnit.test("Test listgames", function (assert) {

    socket.emit("listgames");
    var done = assert.async();
    socket.on('listgames', function (data) {
        assert.ok(true, "Got listgames packet");
        assert.ok(Array.isArray(data), "The data is an array");
        done();
    });
});


/**
 * Can create and join a game
 */
QUnit.test("Test create/join game", function (assert) {

    var title = "Test creategame title";
    socket.emit("creategame", {
        type: GAME_TYPE,
        title: title,
        max: 2
    });
    var done = assert.async();
    socket.emit("listgames");
    socket.on('listgames', function (data) {
        assert.ok(true, "Got listgames packet");
        assert.ok(Array.isArray(data), "The data is an array");
        for (var i = 0; i < data.length; i++) {
            if (data[i].title === title && data[i].max == 2) {
                assert.ok(true, "Our game was listed")
            }
        }
        done();
    });
});


/**
 * Can start a game
 */
QUnit.test("Test startgame", function (assert) {
    var title = "Test startgame title";
    socket.emit("creategame", {
        type: GAME_TYPE,
        title: title,
        max: 2
    });
    var done = assert.async();
    socket.on("start", function (data) {
        assert.ok(true, "Got start packet");
        assert.ok(data.pc === 1, "Player count should be 1");
        assert.ok(data.me === 0, "Id should be 0");
        assert.ok(data.seed, "Should contain a random seed");
        done();
    });
    socket.emit("startgame");
});


/**
 * Can get the player info
 */
QUnit.test("Test players", function (assert) {
    var title = "Test players title";
    socket.emit("creategame", {
        type: GAME_TYPE,
        title: title,
        max: 2,
        syncOrders: false
    });
    var done = assert.async();
    socket.on("players", function (data) {
        assert.ok(Array.isArray(data), "Players data is array");
        assert.ok(data.length === 1, "Players array has one player (me)");
        done();

    });
    socket.emit("startgame");
});

/**
 * Can send an order
 */
QUnit.test("Test order", function (assert) {
    var title = "Test order title";
    socket.emit("creategame", {
        type: GAME_TYPE,
        title: title,
        max: 2,
        syncOrders: false
    });
    var done = assert.async();
    socket.on("start", function (startdata) {
        var orderObj = {
            "some": "silly data"
        }
        socket.emit("order", orderObj);
        socket.on("order", function (data) {

            assert.ok(true, "Got order");
            assert.ok(data["some"] === "silly data", "Got order");
            assert.ok(data.from === startdata.me, "Order is from me");
            done();
        })

    });
    socket.emit("startgame");
});

/**
 * Can leave a game
 */
QUnit.test("Test leavegame", function (assert) {
    var title = "Test leavegame title " + Math.random();
    socket.emit("creategame", {
        type: GAME_TYPE,
        title: title,
        max: 2,
        syncOrders: false
    });
    var done = assert.async();
    socket.on("start", function (data) {
        socket.emit("leavegame");
        socket.emit("listgames");
        socket.on("listgames", function (games) {
            var hasOurGame = false;
            for (var i = 0; i < games.length; i++) {
                if (games.title === title) {
                    hasOurGame = true;
                }
            }
            assert.ok(hasOurGame === false, "Our game is no longer in the list");
            done();
        })

    });
    socket.emit("startgame");
});
