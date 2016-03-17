var Multiplayer;

socket = socket.socket.connect("ctw.firecaster.com:80");

QUnit.test("Test startGameCheck true", function(assert) {
    Multiplayer.players = [1,2];
    Multiplayer.readyPlayers = 2;
    assert.ok("No one has pressed ready");   
});