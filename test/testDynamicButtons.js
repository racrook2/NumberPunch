/**
 * Created by Matthew on 4/19/2016.
 */

QUnit.test("Test setPoolSize() - valid", function(assert) {
    for (var i = 1; i <= 20; i++) {
        GameInstance.setPoolSize(i);
        assert.equal(GameInstance.getPoolSize(), i, "Pool size successfully set to "+i);
    }
});

QUnit.test("Test setPoolSize() - less than minimum", function(assert) {
    for (var i = -1000; i < 1; i++) {
        assert.ok(!GameInstance.setPoolSize(i),"Pool size not set to "+i);
    }
});

QUnit.test("Test setPoolSize() - more than maximum", function(assert) {
    for (var i = 21; i < 1000; i++) {
        assert.ok(!GameInstance.setPoolSize(i),"Pool size not set to "+i);
    }
});

QUnit.test("Test createButtons()", function(assert) {
    for (var i = 1; i <= 20; i++) {
        GameInterface.createButtons(i);
        assert.equal($('.opponent-button').length, i, "Successfully created "+i+" buttons for opponent");
        assert.equal($('.player-button').length, i, "Successfully created "+i+" buttons for player");
    }
});

QUnit.test("Test GameInstance Number Pools - valid", function(assert) {
    for (var i = 1; i <= 20; i++) {
        GameInstance.setPoolSize(i);
        var pIds = [1,2];
        GameInstance.startGameHandle({
            'me': 0,
            'seed': Math.random(),
            'pc': 2
        }, pIds);

        assert.equal(GameInstance.availNum[1].length, i, "Available numbers for player 1 successfully set to 1-"+i);
        assert.equal(GameInstance.availNum[2].length, i, "Available numbers for player 2 successfully set to 1-"+i);

        GameInstance.inProgress=false;
    }
});