var socket;
var GAME_TYPE = 268201;

QUnit.module("Penalty System Test", {
    beforeEach: function () {
        var pIds = [1,2];
        GameInstance.startGameHandle({
          'me': 0,
          'seed': Math.random(),
          'pc': 2
        }, pIds);
    },
    afterEach: function () {
    	GameInstance.setPenaltyThreshold(0);
    }
});

QUnit.test("Test default penalty threshold", function(assert) {
	assert.equal(GameInstance.getPenaltyThreshold(), 0);
}

QUnit.test("Test set penalty threshold", function(assert) {
	GameInstance.setPenaltyThreshold(1);
    assert.equal(GameInstance.getPenaltyThreshold(), 1);
}

QUnit.test("Test set penalty threshold", function(assert) {
	var userID = 1;
	GameInstance.setPenaltyThreshold(1);
	var availLen = GameInstance.availNum[userID].length;
	var unavailLen = GameInstance.unavailNum[userID].length;
	var num = GameInstance.availNum[userID].pop();
	GameInstance.unavailNum[userID].push(num);
	assert.equal(GameInstance.availNum[userID].length, availLen-1);
	assert.equal(GameInstance.unavailNum[userID].length, unavailLen+1);
	GameInstance.resetTarNumHandle(userID);
	assert.equal(GameInstance.availNum[userID].length, availLen);
	assert.equal(GameInstance.unavailNum[userID].length, unavailLen);
}

/*QUnit.test("Press Reset", function (assert) {
    GameInstance.resetTarNum();
    var done = assert.async();
    setTimeout(function() {
      done();
    },1000);
    assert.ok(1 in GameInstance.targetNum, "User ID exists in game instance target num set");

    highestTarget = (POOL_NUMBER_COUNT*3)-3;
    assert.ok(GameInstance.targetNum[1] > 0 && GameInstance.targetNum[1] <= highestTarget,
        "New target number is within desired ranged");
});*/
