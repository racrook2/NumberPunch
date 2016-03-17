QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;
Multiplayer.createGame();
Multiplayer.startGame();
setTimeout(function() {
    QUnit.start();
}, 1000);

QUnit.module("Game Logic Test", {
    beforeEach: function () {
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

QUnit.test("Press Reset", function (assert) {
    GameInstance.resetTarNum();
    var done = assert.async();
    setTimeout(function() {
      done();
    },1000);
    assert.ok(1 in GameInstance.targetNum, "User ID exists in game instance target num set");

    highestTarget = (POOL_NUMBER_COUNT*3)-3;
    assert.ok(GameInstance.targetNum[1] > 0 && GameInstance.targetNum[1] <= highestTarget,
        "New target number is within desired ranged");
});

QUnit.test("Select Number", function (assert) {
    // Attempt to select unavailable number
    GameInstance.targetNum[1] = 17;
    GameInstance.unavailNum[1] = [5,10];
    GameInstance.availNum[1] = [1,2,3,4,6,7,8,9];
    var ret1 = GameInstance.selectNumHandle(1, 5);
    var ret2 = GameInstance.selectNumHandle(1, 10);
    assert.ok((ret1 == ret2) && (ret1 == -1),
        "Check select unavailable number case");

    // Check removal of already selected num
    // and addition of not already selected num
    GameInstance.selectNumHandle(1, 4);
    assert.ok(GameInstance.selectedNum[1].indexOf(4) >= 0, 
        "Check addition of newly selected number");

    GameInstance.selectNumHandle(1, 4);
    assert.ok(GameInstance.selectedNum[1].indexOf(4) < 0,
        "Check selection of already selected number");
});

QUnit.test("Add User", function (assert) {
    var ret = GameInstance.addUser(2);
    assert.ok(ret == false, "Attempt to add pre-existing user");

    // Add new user and assert default values
    ret = GameInstance.addUser(4);
    assert.ok(ret == true, "New user added to instance");
    assert.ok(GameInstance.targetNum[4] > 0 && GameInstance.targetNum[4] <= ((POOL_NUMBER_COUNT*3)-3),
        "Check for valid default target number");
    for(var i = 1; i <= POOL_NUMBER_COUNT; i++) {
        assert.ok(GameInstance.availNum[4][i-1] == i,
            "Check that "+i+" is available by default");
    }
    assert.ok(GameInstance.userIDs.indexOf(4) >= 0,
        "Check that user ID now exists in the instance");
});

QUnit.test("Evaluate User", function (assert) {
    GameInstance.targetNum[1] = 12;
    GameInstance.selectedNum[1] = [2, 10];

    // Evaluate on correctly selected numbers
    GameInstance.evaluateUser(1);
    assert.ok(GameInstance.selectedNum[1].length == 0,
        "Selected numbers is empty on correct combo");
    assert.ok(GameInstance.unavailNum[1].indexOf(2) >= 0 &&
        GameInstance.unavailNum[1].indexOf(10) >= 0,
        "Selected numbers moved to unavailable on correct combo");
    assert.ok(GameInstance.availNum[1].indexOf(2) < 0 &&
        GameInstance.availNum[1].indexOf(10) < 0,
        "Selected numbers are removed from available on correct combo");

    GameInstance.targetNum[1] = 2;
    GameInstance.selectedNum[1] = [1,3];
    GameInstance.evaluateUser(1);
    assert.ok(GameInstance.selectedNum[1].length == 0,
        "Check that a combo larger than target resets selected numbers");
});