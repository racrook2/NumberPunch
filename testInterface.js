/**
 * Created by Matthew on 3/6/2016.
 */
var NUM_BUTTONS = 10;
QUnit.module("Interface Test", {
    beforeEach: function (assert) {
        var done = assert.async();
        $('#qunit-fixture').load('./interface.html');
        $('document').ready(function() {
            done();
        })
    },
    afterEach: function () {

    }
});

QUnit.test("Test Fixture Load", function(assert) {
    buttonBlocks = document.getElementsByClassName("button-block");
    assert.ok((buttonBlocks.length>0), "Successfully loaded interface");
});

QUnit.test("Test select() First Button", function (assert) {
    select("number01");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[0].classList.contains("selected"), "First player button was selected properly");
    for (i=1; i<playerButtonWrappers.length; i++){
        assert.ok(!playerButtonWrappers[i].classList.contains("selected"), "Non-selected player button not affected");
    }
    for (i=0; i<opponentButtonWrappers.length; i++){
        assert.ok(!opponentButtonWrappers[i].classList.contains("selected"), "Opponent button not affected");
    }
});

QUnit.test("Test select() 4th Button", function (assert) {
    select("number04");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[3].classList.contains("selected"), "Fourth player button was selected properly");
    for (i=0; i<playerButtonWrappers.length; i++){
        if (i!=3) {
            assert.ok(!playerButtonWrappers[i].classList.contains("selected"), "Non-selected player button not affected");
        }
    }
    for (i=0; i<opponentButtonWrappers.length; i++){
        assert.ok(!opponentButtonWrappers[i].classList.contains("selected"), "Opponent button not affected");
    }
});

QUnit.test("Test select() 7th Button", function (assert) {
    select("number07");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[6].classList.contains("selected"), "Seventh player button was selected properly");

});

QUnit.test("Test select() twice 2nd Button", function (assert) {
    select("number02");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[1].classList.contains("selected"), "Second player button was selected properly");
    for (i=0; i<playerButtonWrappers.length; i++){
        if (i!=1) {
            assert.ok(!playerButtonWrappers[i].classList.contains("selected"), "Non-selected player button not affected");
        }
    }
    for (i=0; i<opponentButtonWrappers.length; i++){
        assert.ok(!opponentButtonWrappers[i].classList.contains("selected"), "Opponent button not affected");
    }

    select("number02");

    assert.ok(!playerButtonWrappers[1].classList.contains("selected"), "Second player button was unselected properly");
    for (i=0; i<playerButtonWrappers.length; i++){
        if (i!=1) {
            assert.ok(!playerButtonWrappers[i].classList.contains("selected"), "Non-selected player button not affected");
        }
    }
    for (i=0; i<opponentButtonWrappers.length; i++){
        assert.ok(!opponentButtonWrappers[i].classList.contains("selected"), "Opponent button not affected");
    }


});

QUnit.test("Test select() twice 5th Button", function (assert) {
    select("number05");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[4].classList.contains("selected"), "Fifth player button was selected properly");


    select("number05");

    assert.ok(!playerButtonWrappers[4].classList.contains("selected"), "Fifth player button was unselected properly");

});

QUnit.test("Test select() twice 8th Button", function (assert) {
    select("number08");
    playerButtonWrappers = document.getElementsByClassName("button-wrapper player-button");
    opponentButtonWrappers = document.getElementsByClassName("button-wrapper opponent-button");

    assert.equal(playerButtonWrappers.length, NUM_BUTTONS, "Loaded all player buttons");
    assert.equal(opponentButtonWrappers.length, NUM_BUTTONS, "Loaded all opponent buttons");

    assert.ok(playerButtonWrappers[7].classList.contains("selected"), "Eighth player button was selected properly");

    select("number08");

    assert.ok(!playerButtonWrappers[7].classList.contains("selected"), "Eighth player button was unselected properly");


});

QUnit.test("Test reset()", function (assert) {
    select("number03");
    select("number06");
    select("number09");
    select("number10");

    assert.ok(playerButtonWrappers[2].classList.contains("selected"), "Third player button was selected properly");
    assert.ok(playerButtonWrappers[5].classList.contains("selected"), "Sixth player button was selected properly");
    assert.ok(playerButtonWrappers[8].classList.contains("selected"), "Ninth player button was selected properly");
    assert.ok(playerButtonWrappers[9].classList.contains("selected"), "Tenth player button was selected properly");

    reset();

    assert.ok(!playerButtonWrappers[2].classList.contains("selected"), "Third player button was deselected properly");
    assert.ok(!playerButtonWrappers[5].classList.contains("selected"), "Sixth player button was deselected properly");
    assert.ok(!playerButtonWrappers[8].classList.contains("selected"), "Ninth player button was deselected properly");
    assert.ok(!playerButtonWrappers[9].classList.contains("selected"), "Tenth player button was deselected properly");


});


QUnit.test("Key Press", function (assert) {
    assert.ok(true);
});