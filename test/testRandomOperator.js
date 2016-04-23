QUnit.config.autostart = false;
$.ajax({
    url: "../interface.html",
    dataType: "html",
    success: function(html) {
        var opField = $(html).find("#my-operators");
        $("#qunit-fixture").append(opField);
        console.log(opField);
        Multiplayer.createGame();
        Multiplayer.readyPlayers = 2;
        GameInstance.gameRule = 2;
        Multiplayer.startGame();

        QUnit.start();
    }
})

QUnit.module("Random Operator Test", {
  beforeEach: function() {
    Multiplayer.createGame();
    Multiplayer.readyPlayers = 2;
    GameInstance.gameRule = 2;
    Multiplayer.startGame();
  }
});

QUnit.test("Random Operator Div filled on Random game rule", function(assert) {
  var opField = document.getElementById("my-operators");
  var opContents = opField.innerHTML;

  // Assert that the div was populated on Random being chosen
  assert.ok(opContents.length > 0, "Div populated when Random is chosen");
});

QUnit.test("Test operator div contents reflect operators", function(assert) {
  Multiplayer.sendShout({
    'type': 'showOperators',
    'operators': [0, 2, 1]
  });

  var done = assert.async();
  setTimeout(function() {
    var opField = document.getElementById("my-operators");
    var opContents = opField.innerHTML;

    assert.ok(opContents.indexOf("+  *  -") >= 0, 
      "Preset operators reflects in div when front end received it");
    
    done();
  }, 2000);
});

QUnit.test("Mock win conditions with operators", function(assert) {
  var wincall = false;
  GameInstance.declareWinner = function mockDeclareWinner(){
    wincall = true;
  }
  GameInstance.gameRule = 2;
  GameInstance.operators = [0, 1, 2];
  GameInstance.myID = 0;
  GameInstance.targetNum[0] = 12;
  GameInstance.availNum[0] = [];
  GameInstance.unavailNum[0] = [];
  GameInstance.selectedNum[0] = [4,2,6];
  GameInstance.evaluateUser(0);
  assert.equal(wincall, true);
});

QUnit.test("Mock win conditions with operators and wrapping around", function(assert) {
  var wincall = false;
  GameInstance.declareWinner = function mockDeclareWinner(){
    wincall = true;
  }
  GameInstance.operators = [0, 1, 2];
  GameInstance.myID = 0;
  GameInstance.targetNum[0] = 20;
  GameInstance.availNum[0] = [];
  GameInstance.unavailNum[0] = [];
  GameInstance.selectedNum[0] = [4,2,6,8];
  GameInstance.evaluateUser(0);
  assert.equal(wincall, true);
});

QUnit.test("Test combination over target number does NOT reset the selected pool numbers", function(assert) {
  GameInstance.operators = [0, 2, 2];
  GameInstance.myID = 0;
  GameInstance.targetNum[0] = 1;
  GameInstance.availNum[0] = [];
  GameInstance.unavailNum[0] = [];
  GameInstance.selectedNum[0] = [3, 4, 5, 9];
  GameInstance.evaluateUser(0);

  assert.ok(GameInstance.selectedNum[0].length == 4, 
    "Selected nums stay the same after overshooting target in this mode");
  assert.ok(GameInstance.unavailNum[0].length == 0,
    "Unavail Nums stays empty if overshooting");
});