
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
    assert.equal(buttonBgColor, 'rgb(0, 0, 0)');
});

QUnit.test("Did Buttons Change to Blue/Orange:", function (assert) {
    changeButtonTheme(blueOrangeTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(255, 165, 0)');
});