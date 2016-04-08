
QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;

Multiplayer.createGame();
setTimeout(function() {
    QUnit.start();
}, 1000);

var modalID = "#gamesettings";

QUnit.module("Game Settings Test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

QUnit.test("Did Game Settings Modal Open:", function (assert) {

    var modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'none');
    openModal(modalID);
    modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'block');
});

QUnit.test("Did Default Settings Apply When Modal Closed:", function (assert) {
    closeModal(modalID);
    assert.equal(GameInstance.getPenaltyThreshold(), 0);
    assert.equal(GameInstance.getGameRule(), 0);
}); 

QUnit.test("Did Modified Penalty Settings Apply on Form Submission:", function (assert) {
    $('input[name=penalties]').val('2');
    assert.equal($('input[name=penalties]').val(), 2);
    $('#gamesettingsForm').submit();
    setTimeout(function() {
        assert.equal(GameInstance.getPenaltyThreshold(), 2);
    }, 1000);
}); 

QUnit.test("Did Modified Game Type Settings Apply on Form Submission:", function (assert) {
    $('input[name=op]')[1].checked = true;
    assert.equal($('input[name=op]:radio:checked').val(), 'mult');
    $('#gamesettingsForm').submit();
    setTimeout(function() {
        assert.equal(GameInstance.getGameRule(), 1);
    }, 1000);
}); 

QUnit.test("Did Game Settings Modal Close on Form Submission:", function (assert) {
    
    var modalDisplay = $(modalID).css('display');
    if (modalDisplay == 'none') {
        openModal(modalID);
    }
    modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'block');
    $('#gamesettingsForm').submit();
    setTimeout(function() {
        modalDisplay = $(modalID).css('display');
        assert.equal(modalDisplay, 'none');
    }, 2000);
    
});
