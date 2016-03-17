
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

QUnit.test("Did Theme Change to Purple:", function (assert) {
    changeButtonTheme(purpleTheme);
    var buttonBgColor = $('#createGame').css('background-color');
    assert.equal(buttonBgColor, 'rgb(102, 0, 102)');
	var bgColor = $('body').css('background-color');
	assert.equal(bgColor, 'rgb(153, 51, 153)');
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