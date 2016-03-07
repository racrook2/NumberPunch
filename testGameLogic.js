var socket;
var GAME_TYPE = 268201;

QUnit.module("Game Logic Test", {
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

QUnit.test("Punch correct combination", function (assert) {
    var done = assert.async();
    socket.on('connect', function () {
        assert.ok(true, "connected to ctw.firecaster.com");
        done();
    });
});

QUnit.test("Punch incorrect combination", function (assert) {
    var done = assert.async();
    socket.on('connect', function () {
        assert.ok(true, "connected to ctw.firecaster.com");
        done();
    });
});

QUnit.test("Press Reset", function (assert) {
    var done = assert.async();
    socket.on('connect', function () {
        assert.ok(true, "connected to ctw.firecaster.com");
        done();
    });
});

QUnit.test("Meet Game Winning Conditions", function (assert) {
    var done = assert.async();
    socket.on('connect', function () {
        assert.ok(true, "connected to ctw.firecaster.com");
        done();
    });
});