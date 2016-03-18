QUnit.test("Test startGameCheck true", function(assert) {
   Multiplayer.createGame();
   var done = assert.async();
    setTimeout(function() {
      done();
    },1000);
   assert.ok(Multiplayer.startGameCheck()==false, "No one is ready");
   Multiplayer.readyGame();
   var done1 = assert.async();
   setTimeout(function() {
    done1();
   },5000);
   assert.equal(Multiplayer.readyPlayers, 1);
   console.log("Checked Ready Players first time");
   assert.ok(Multiplayer.startGameCheck()==false, "One person is ready");
   Multiplayer.socket.emit("shout",{type:"ready"});
   var done2 = assert.async();
   setTimeout(function() {
    done2();
    }, 5000);
   assert.equal(Multiplayer.readyPlayers, 2);
   assert.ok(Multiplayer.startGameCheck(), "Two people are ready");
   
});