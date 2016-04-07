QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;
Multiplayer.createGame();
Multiplayer.startGame();
setTimeout(function() {
    QUnit.start();
}, 1000);


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

    var modalID = "#gamesettings";
    var modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'none');
    openModal(modalID);
    modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'block');
});

QUnit.test("Did Game Settings Modal Close:", function (assert) {

    var modalID = "#gamesettings";
    var modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'block');
    closeModal(modalID);
    modalDisplay = $(modalID).css('display');
    assert.equal(modalDisplay, 'none');
});

QUnit.test("Did Default Settings Apply When Modal Closed:", function (assert) {

}); 

QUnit.test("Did Game Settings Apply on Form Submission:", function (assert) {

}); 

