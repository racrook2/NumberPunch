
QUnit.module("User Preferences Test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

QUnit.test("Did Preferences Panel Open:", function (assert) {
    changeButtonTheme(blackWhiteTheme);
    var buttonBgColor = $('body').css('background-color');
    assert.equal(buttonBgColor, 'rgba(0, 0, 0, 0)');
});