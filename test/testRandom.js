QUnit.module("Random Test", {
    beforeEach: function () {
        var pIds = [1,2];
        GameInstance.startGameHandle({
          'me': 0,
          'seed': Math.random(),
          'pc': 2
        }, pIds);
        GameInstance.inProgress = false;
        GameInstance.setGameRule(2);
    },
    afterEach: function () {
    	GameInstance.setGameRule(0);
    }
});

/**
 * Need to show x
 */
QUnit.test("Target Number Properly has appended x for multiplication", function(assert) {
	GameInstance.targetOp[1] = true;
	assert.ok(Multiplayer.makeTarget(1).indexOf("x") >= -1);
});

/**
 * Need to show +
 */
QUnit.test("Target Number Properly has appended + for addition", function(assert) {
	GameInstance.targetOp[1] = false;
	assert.ok(Multiplayer.makeTarget(1).indexOf("+") >= -1);
});


/**
 * Can get/set target op
 */
QUnit.test("Testing setTargetOp/getTargetOp with good input", function(assert) {
	GameInstance.myID = 1;
	GameInstance.setTargetOp(true);
	assert.ok(GameInstance.getTargetOp());
	GameInstance.setTargetOp(false);
	assert.ok(!GameInstance.getTargetOp());
});

/**
 * Bad input
 */
QUnit.test("Testing setTargetOp/getTargetOp with bad input", function(assert) {
	GameInstance.myID = 1;
	GameInstance.setTargetOp(null);
	assert.ok(!GameInstance.getTargetOp());
});


/**
 * Win condition with a random operator
 */
QUnit.test("Mock win condition with randomop", function(assert) {
  var wincall = false;
  GameInstance.declareWinner = function mockDeclareWinner() {
    wincall = true;
  }
  GameInstance.myID = 1;
  GameInstance.setTargetOp(true);
  GameInstance.targetNum[1] = 8;
  GameInstance.availNum[1] = [1, 3];
  GameInstance.selectedNum[1] = [2, 4];
  GameInstance.unavailNum[1] = [];
  GameInstance.evaluateUser(1);
  GameInstance.setTargetOp(false);
  GameInstance.selectedNum[1] = [1, 3];
  GameInstance.unavailNum[1] = [];
  GameInstance.evaluateUser(1);
  assert.ok(wincall == true);
});