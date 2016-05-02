/**
 * Exit button should be invis when we first start
 */
QUnit.test("Exit Button hidden on launch", function (assert) {
    var buttonCSS = $('#exit').css('display');
    assert.equal(buttonCSS, 'none');
});

/**
 * Can't leave a game you haven't joined yet
 */
QUnit.test("Leave Button hidden on launch", function (assert) {
    var buttonCSS = $('#leaveGame').css('display');
    assert.equal(buttonCSS, 'none');
});

/**
 * Can create a game when we aren't in one
 */
QUnit.test("Create Game Button Visible on launch", function (assert) {
    var buttonCSS = $('#createGame').css('display');
    assert.equal(buttonCSS, 'block');
});

/**
 * Can refresh the list
 */
QUnit.test("Refresh Button Visible on launch", function (assert) {
    var buttonCSS = $('#refresh').css('display');
    assert.equal(buttonCSS, 'block');
});

/**
 * Preferences on launch
 */
QUnit.test("Preferences Button Visible on launch", function (assert) {
    var buttonCSS = $('#preferences').css('display');
    assert.equal(buttonCSS, 'block');
});

/**
 * Can't ready up immediately
 */
QUnit.test("Ready Button hidden on launch", function (assert) {
    var buttonCSS = $('#ready').css('display');
    assert.equal(buttonCSS, 'none');
});

/**
 * Start game not ready immediately
 */
QUnit.test("Start Game Button hidden on launch", function (assert) {
    var buttonCSS = $('#startGame').css('display');
    assert.equal(buttonCSS, 'none');
});

/**
 * Declare a winner
 */
QUnit.test("declareWinner can be called", function (assert) {
    var ret_state = GameInstance.declareWinner(1);
    assert.equal(ret_state, true);
});

/**
 * Evaluate a user
 */
QUnit.test("evaluateUser calls declare winner", function (assert) {
    var wasDeclareWinnerCalled = false;
    GameInstance.declareWinner = function mockDeclareWinner(){
        wasDeclareWinnerCalled = true;
    };
    GameInstance.myID = 0;
    GameInstance.targetNum[0] = 10;
    GameInstance.availNum[0] = [];
    GameInstance.unavailNum[0] = [];
    GameInstance.selectedNum[0] = [1,2,3,4]
    GameInstance.evaluateUser(0);    
    assert.equal(wasDeclareWinnerCalled,true);
});

