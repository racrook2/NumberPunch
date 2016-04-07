
QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;
Multiplayer.createGame();
//Multiplayer.startGame();
setTimeout(function() {
    QUnit.start();
}, 1000);

var modalID = "#gamesettings";

QUnit.module("Game Settings Test", {
    beforeEach: function () {

        /*var done = assert.async();
        $('#qunit-fixture').load('../index.html');
        $('document').ready(function() {
            done();
        })*/
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

QUnit.test("Did Game Settings Apply on Form Submission:", function (assert) {
    $('input[name=penalties]').val('2');
    $('input[name=op]')[1].checked = true;
    assert.equal($('input[name=op]:radio:checked').val(), 'mult');
    $('#gamesettingsForm').submit();
    setTimeout(function() {
        assert.equal(GameInstance.getPenaltyThreshold(), 2);
        assert.equal(GameInstance.getGameRule(), 1);
    }, 1000);
    
}); 

