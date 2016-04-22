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

QUnit.test("Target Number Properly has appended x for multiplication", function(assert) {
	GameInstance.targetOp[1] = true;
	assert.ok(Multiplayer.makeTarget(1).indexOf("x") >= -1);
});

QUnit.test("Target Number Properly has appended + for addition", function(assert) {
	GameInstance.targetOp[1] = false;
	assert.ok(Multiplayer.makeTarget(1).indexOf("+") >= -1);
});


QUnit.test("Testing setTargetOp/getTargetOp with good input", function(assert) {
	GameInstance.myID = 1;
	GameInstance.setTargetOp(true);
	assert.ok(GameInstance.getTargetOp());
	GameInstance.setTargetOp(false);
	assert.ok(!GameInstance.getTargetOp());
});

QUnit.test("Testing setTargetOp/getTargetOp with bad input", function(assert) {
	GameInstance.myID = 1;
	GameInstance.setTargetOp(null);
	assert.ok(!GameInstance.getTargetOp());
});
