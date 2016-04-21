QUnit.module("Multiplication Test", {
    beforeEach: function () {
        var pIds = [1,2];
        GameInstance.startGameHandle({
          'me': 0,
          'seed': Math.random(),
          'pc': 2
        }, pIds);
        GameInstance.inProgress = false;
        GameInstance.setGameRule(1);
    },
    afterEach: function () {
    	GameInstance.setGameRule(0);
    }
});

QUnit.test("Test multiplication with one number", function(assert) {
	GameInstance.targetNum[1] = 3;
	GameInstance.selectedNum[1] = [3];
	GameInstance.evaluateUser(1);
	
	assert.ok(GameInstance.selectedNum[1].length == 0,
        "Selected numbers is empty on correct combo");
    assert.ok(GameInstance.unavailNum[1].indexOf(3) >= 0,
        "Selected numbers moved to unavailable on correct combo");
    assert.ok(GameInstance.availNum[1].indexOf(3) < 0,
        "Selected numbers are removed from available on correct combo");
});

QUnit.test("Test multiplication with two numbers", function(assert) {
	GameInstance.targetNum[1] = 6;
	GameInstance.selectedNum[1] = [2, 3];
	GameInstance.evaluateUser(1);
	
	assert.ok(GameInstance.selectedNum[1].length == 0,
        "Selected numbers is empty on correct combo");
    assert.ok(GameInstance.unavailNum[1].indexOf(2) >= 0 && GameInstance.unavailNum[1].indexOf(3) >= 0,
        "Selected numbers moved to unavailable on correct combo");
    assert.ok(GameInstance.availNum[1].indexOf(2) < 0 && GameInstance.availNum[1].indexOf(3) < 0,
        "Selected numbers are removed from available on correct combo");
});

QUnit.test("Test deselect numbers if going over target", function(assert) {
	GameInstance.targetNum[1] = 6;
	GameInstance.selectedNum[1] = [2, 4];
	GameInstance.evaluateUser(1);
	
	assert.ok(GameInstance.selectedNum[1].length == 0,
        "Selected numbers is empty on correct combo");
    assert.ok(GameInstance.unavailNum[1].indexOf(2) < 0 && GameInstance.unavailNum[1].indexOf(4) < 0,
        "Selected numbers moved to unavailable on correct combo");
    assert.ok(GameInstance.availNum[1].indexOf(2) >= 0 && GameInstance.availNum[1].indexOf(3) >= 0,
        "Selected numbers are removed from available on correct combo");
});

QUnit.test("Test target numbers are divisible by pool number", function(assert) {
	for (var j = 0; j < 1000; j++) {
		var ok = false;
		GameInstance.resetTarNumHandle(1);
		var value = GameInstance.targetNum[1];
		for(var i = 1; i <= GameInstance.availNum[1].length; i++) {
		    if(value % i == 0) {
		        ok = true;
		        break;
		    }
		}
		assert.ok(ok == true, "Target number: " + value);
	}
});

QUnit.test("Test first target number divisible by pool number", function(assert) {
	for (var j = 0; j < 1000; j++) {
		var ok = false;
		var value = GameInstance.targetNum[1];
		for(var i = 1; i <= GameInstance.availNum[1].length; i++) {
		    if(value % i == 0) {
		        ok = true;
		        break;
		    }
		}
		var pIds = [1,2];
        GameInstance.startGameHandle({
          'me': 0,
          'seed': Math.random(),
          'pc': 2
        }, pIds);
        GameInstance.inProgress = false;
        GameInstance.setGameRule(1);
		assert.ok(ok == true, "Target number: " + value);
	}
});
