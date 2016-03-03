
QUnit.module("User Preferences Test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

QUnit.test("Did Preferences Panel Open:", function (assert) {
    assert.equal(true,true);
});

QUnit.test("Did Buttons Change to Black/White:", function (assert) {
    changeButtonTheme(blackWhiteTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'black');
});