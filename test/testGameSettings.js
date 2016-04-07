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


QUnit.test("Did Theme Change to Orange:", function (assert) {
    changeButtonTheme(orangeTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(255, 102, 0)');
    var bgColor = $('body').css('background-color');
    assert.equal(bgColor, 'rgb(255, 165, 0)');
});

QUnit.test("Did Theme Change to Black:", function (assert) {
    changeButtonTheme(blackTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(0, 0, 0)');
    var bgColor = $('body').css('background-color');
    assert.equal(bgColor, 'rgb(31, 31, 31)');
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


QUnit.test("Did Background Change to Charizard:", function (assert) {
    changeBackground('bg1');
    var bgImage = $('#main').css('background-image');
    bgImage = bgImage.slice(-9, -2);
    assert.equal(bgImage, "bg1.png");
});

QUnit.test("Did Background Change to Greninja:", function (assert) {
    changeBackground('bg2');
    var bgImage = $('#main').css('background-image');
    bgImage = bgImage.slice(-9, -2);
    assert.equal(bgImage, "bg2.png");
});

QUnit.test("Did Name Not Change when Empty:", function (assert) {
    changeName("");
    var name = $('#greeting').html();
    assert.equal(name, 'Hello, guest');
});

QUnit.test("Did Name Change when Not Empty:", function (assert) {
    changeName("Ran");
    var name = $('#greeting').html();
    assert.equal(name, 'Hello, Ran');
});
