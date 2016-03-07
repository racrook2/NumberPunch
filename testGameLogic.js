var socket;
var gi;
var GAME_TYPE = 268201;

QUnit.module("Game Logic Test", {
    beforeEach: function () {
        if (socket) {
            socket.socket.connect();
        }
        else {
            socket = io.connect("ctw.firecaster.com:80");
        }
        gi = new GameInstance({});
        gi.addUser(1);
    },
    afterEach: function () {
    }
});

QUnit.test("Press Reset", function (assert) {
    gi.resetTarNum(1);
    assert.ok(1 in gi.targetNum, "User ID exists in game instance target num set");

    highestTarget = 15+14+13;
    assert.ok(gi.targetNum[1] > 0 && gi.targetNum[1] <= highestTarget,
        "New target number is within desired ranged");
});

QUnit.test("Select Number", function (assert) {
    // Attempt to select unavailable number
    gi.targetNum[1] = 17;
    gi.unavailNum[1] = [5,15];
    gi.availNum[1] = [1,2,3,4,6,7,8,9,10,11,12,13,14];
    var ret1 = gi.selectNum(1, 5);
    var ret2 = gi.selectNum(1, 15);
    assert.ok((ret1 == ret2) && (ret1 == false),
        "Check select unavailable number case");

    // Check removal of already selected num
    // and addition of not already selected num
    gi.selectNum(1, 4);
    assert.ok(gi.selectedNum[1].indexOf(4) >= 0, 
        "Check addition of newly selected number");
    gi.selectNum(1, 4);
    assert.ok(gi.selectedNum[1].indexOf(4) < 0,
        "Check selection of already selected number");
});

QUnit.test("Add User", function (assert) {
    var ret = gi.addUser(1);
    assert.ok(ret == false, "Attempt to add pre-existing user");

    // Add new user and assert default values
    ret = gi.AddUser(2);
    assert.ok(ret == true, "New user added to instance");
    assert.ok(gi.targetNum[2] > 0 && gi.targetNum[2] <= (15+14+13));
    for(var i = 1; i <= 15; i++) {
        assert.ok(this.availNum[2][i-1] == i);
    }
    assert.ok(gi.userIDs.indexOf(2) >= 0);
});