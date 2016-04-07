QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;
Multiplayer.createGame();
Multiplayer.startGame();

$.ajax({
    url: "./interface.html",
    dataType: "html",
    success: function(html) {
        var inputField = $(html).find("#user-msg-contents");
        $("#qunit-fixture").append(inputField);
        var chatbox = $(html).find("#chatbox");
        $("#qunit-fixture").append(chatbox);

        QUnit.start();
    }
})

QUnit.module("Game Chat Test", {
    beforeEach: function (assert) {
        var pIds = [1,2];
        GameInstance.startGameHandle({
          'me': 0,
          'seed': Math.random(),
          'pc': 2
        }, pIds);
    },
    afterEach: function () {
    }
});

QUnit.test("Empty message box/chatbox on start", function(assert) {

    var inputField = document.getElementById("user-msg-contents");
    assert.ok(inputField.value.length < 1, 
        "Empty message box on start");

    var chatbox = document.getElementById("chatbox");
    assert.ok(chatbox.childNodes.length < 1, 
        "Empty chatbox on start");
});