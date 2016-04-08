QUnit.test("Button hidden on launch", function (assert) {
    assert.equal(true, true);
    //<script src="../js/lobby.js"></script>
    var buttonCSS = $('.modal').css('display');
    assert.equal(buttonCSS, 'none');
});