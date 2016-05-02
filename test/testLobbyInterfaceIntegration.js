/**
 * Test that we can start the game
 */
QUnit.test("Test startGameCheck true", function(assert) {
   Multiplayer.createGame();


   var done = assert.async();
    setTimeout(function() {
        assert.ok(Multiplayer.startGameCheck()==false, "No one is ready");
        Multiplayer.readyGame();

        setTimeout(function() {
            assert.equal(Multiplayer.readyPlayers, 1);
            console.log("Checked Ready Players first time");
            assert.ok(Multiplayer.startGameCheck()==false, "One person is ready");
            Multiplayer.socket.emit("shout",{type:"ready"});


            setTimeout(function() {
                assert.equal(Multiplayer.readyPlayers, 2);
                assert.ok(Multiplayer.startGameCheck(), "Two people are ready");
                done();
            }, 500);

        },500);

    },500);
   
});