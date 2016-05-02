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

/**
 * Modal open
 */
QUnit.test("Did Preferences Modal Open:", function (assert) {
    var modalDisplay = $('.modal').css('display');
    assert.equal(modalDisplay, 'none');
    openModal('.modal');
    modalDisplay = $('.modal').css('display');
    assert.equal(modalDisplay, 'block');
});

/**
 * Theme change: purple
 */
QUnit.test("Did Theme Change to Purple:", function (assert) {
    changeButtonTheme(purpleTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(102, 0, 102)');
	var bgColor = $('body').css('background-color');
	assert.equal(bgColor, 'rgb(153, 51, 153)');
});

/**
 * Theme change: orange
 */
QUnit.test("Did Theme Change to Orange:", function (assert) {
    changeButtonTheme(orangeTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(255, 102, 0)');
	var bgColor = $('body').css('background-color');
	assert.equal(bgColor, 'rgb(255, 165, 0)');
});

/**
 * Theme change: black
 */
QUnit.test("Did Theme Change to Black:", function (assert) {
    changeButtonTheme(blackTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(0, 0, 0)');
	var bgColor = $('body').css('background-color');
	assert.equal(bgColor, 'rgb(31, 31, 31)');
});


/**
 * Theme change: red
 */
QUnit.test("Did Background change to Red:", function (assert) {
    changeBackgroundColor('red');
    var bgColor = $('body').css('background-color');
    assert.equal(bgColor, 'rgb(255, 0, 0)');
});

/**
 * Name change
 */
QUnit.test("Did Name change to TestName:", function (assert) {
    changeName('TestName');
    var user = db.getValue('Username');
    assert.equal(user, 'TestName');
});

/**
 * Font size change: small
 */
QUnit.test("Did Font Size change to Small:", function (assert) {
    changeFontSize('small');
    var fontsize = $('#buttons').css('font-size');
    assert.equal(fontsize, '13px');
});

/**
 * Font size change: large
 */
QUnit.test("Did Font Size change to Large:", function (assert) {
    changeFontSize('x-large');
    var fontsize = $('#buttons').css('font-size');
    assert.equal(fontsize, '24px');
});

/**
 * Background change: Charizard
 */
QUnit.test("Did Background Change to Charizard:", function (assert) {
    changeBackground('bg1');
    var bgImage = $('#main').css('background-image');
	bgImage = bgImage.slice(-9, -2);
    assert.equal(bgImage, "bg1.png");
});

/**
 * Background change: Greninja
 */
QUnit.test("Did Background Change to Greninja:", function (assert) {
    changeBackground('bg2');
    var bgImage = $('#main').css('background-image');
	bgImage = bgImage.slice(-9, -2);
    assert.equal(bgImage, "bg2.png");
});

/**
 * Can't have empty name
 */
QUnit.test("Did Name Not Change when Empty:", function (assert) {
    changeName("");
	var name = $('#greeting').html();
	assert.equal(name, 'Hello, guest');
});

/**
 * Can have a name
 */
QUnit.test("Did Name Change when Not Empty:", function (assert) {
    changeName("Ran");
	var name = $('#greeting').html();
	assert.equal(name, 'Hello, Ran');
});
