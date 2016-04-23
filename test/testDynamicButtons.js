/**
 * Created by Matthew on 4/19/2016.
 */
QUnit.module("Dynamic Button Test", {
    beforeEach: function () {
        GameInstance.inProgress=false;
    },
    afterEach: function () {
    }
});

testValidPoolSize = function (size) {
    return QUnit.test("Test setPoolSize("+size+") - valid", function(assert) {
        GameInstance.setPoolSize(size);
        assert.equal(GameInstance.getPoolSize(), size, "Pool size successfully set to "+size);
    });
};

testInvalidPoolSize = function (size) {
    return QUnit.test("Test setPoolSize("+size+") - invalid", function(assert) {
        assert.ok(!GameInstance.setPoolSize(i),"Pool size not set to "+i);
    });
};

testCreateButtonsValid = function (size) {
    return QUnit.test("Test createButtons("+size+") - valid", function(assert) {
        GameInterface.createButtons(size);
        assert.equal($('.opponent-button').length, size, "Successfully created "+size+" buttons for opponent");
        assert.equal($('.player-button').length, size, "Successfully created "+size+" buttons for player");
    });
};

testCreateButtonsInvalid = function (size) {
    return QUnit.test("Test createButtons("+size+") - invalid", function(assert) {
        GameInterface.createButtons(size);
        assert.equal($('.opponent-button').length, 10, "Ignored request for "+size+" buttons for opponent and created 10 instead");
        assert.equal($('.player-button').length, 10, "Ignored request for "+size+" buttons for player and created 10 instead");
    });
};

testNumberPoolsValid = function (size) {
    return QUnit.test("Test Game Instance Number Pools for Pool Size "+size+") - valid", function(assert) {
        GameInstance.setPoolSize(size);
        var pIds = [1,2];
        GameInstance.startGameHandle({
            'me': 0,
            'seed': Math.random(),
            'pc': 2
        }, pIds);

        assert.equal(GameInstance.availNum[1].length, size, "Available numbers for player 1 successfully set to 1-"+size);
        assert.equal(GameInstance.availNum[2].length, size, "Available numbers for player 2 successfully set to 1-"+size);
    });
};

testNumberPoolsInvalid = function (size) {
    return QUnit.test("Test Game Instance Number Pools for Pool Size "+size+" - invalid", function(assert) {
        GameInstance.setPoolSize(size);
        var pIds = [1,2];
        GameInstance.startGameHandle({
            'me': 0,
            'seed': Math.random(),
            'pc': 2
        }, pIds);

        assert.equal(GameInstance.availNum[1].length, 10, "Available numbers for player 1 successfully set to 1-10");
        assert.equal(GameInstance.availNum[2].length, 10, "Available numbers for player 2 successfully set to 1-10");
    });
};

validPoolSizeTests = function (size) {
    testValidPoolSize(size);
    testCreateButtonsValid(size);
    testNumberPoolsValid(size);
};

invalidPoolSizeTests = function (size) {
    testInvalidPoolSize(size);
    testCreateButtonsInvalid(size);
    testNumberPoolsInvalid(size);
}

for (var i = 1; i <= 20; i++) {
    validPoolSizeTests(i);
}

invalidPoolSizeTests(-10);
invalidPoolSizeTests(0);
invalidPoolSizeTests(21);
invalidPoolSizeTests(100);