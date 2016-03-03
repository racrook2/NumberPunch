
QUnit.module("User Preferences Test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

QUnit.test("Did Preferences Panel Open:", function (assert) {
    changeButtonTheme(blackWhiteTheme);
    var buttonBgColor = document.body.style.backgroundColor;
    assert.equal(buttonBgColor, 'black');
});