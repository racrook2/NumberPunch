
QUnit.module("User Preferences Test", {
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

QUnit.test("Did Background change to Red:", function (assert) {
    changeBackgroundColor('red');
    var bgColor = $('body').css('background-color');
    assert.equal(bgColor, 'rgb(255, 0, 0)');
});

QUnit.test("Did Name change to TestName:", function (assert) {
    changeName('TestName');
    var user = db.getValue('Username');
    assert.equal(user, 'TestName');
});

QUnit.test("Did Font Size change to Small:", function (assert) {
    changeFontSize('small');
    var fontsize = $('#buttons').css('font-size');
    assert.equal(fontsize, '13px');
});
QUnit.test("Did Font Size change to Large:", function (assert) {
    changeFontSize('x-large');
    var fontsize = $('#buttons').css('font-size');
    assert.equal(fontsize, '24px');
});


