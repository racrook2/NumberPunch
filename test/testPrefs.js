
QUnit.module("User Preferences Test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

QUnit.test("Did Preferences Modal Open:", function (assert) {
    var modalDisplay = $('.modal').css('display');
    assert.equal(modalDisplay, 'none');
    openModal();
    modalDisplay = $('.modal').css('display');
    assert.equal(modalDisplay, 'block');
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