QUnit.config.autostart = false;
var socket;
var GAME_TYPE = 268201;

$.ajax({
    url: "../interface.html",
    dataType: "html",
    success: function(html) {
        var inputField = $(html).find("#user-msg-contents");
        $("#qunit-fixture").append(inputField);
        var chatbox = $(html).find("#chatbox");
        $("#qunit-fixture").append(chatbox);
        var submitbutton = $(html).find("#user-msg-submit");
        $("#qunit-fixture").append(submitbutton);

        Multiplayer.createGame();
        Multiplayer.readyPlayers = 2;
        Multiplayer.startGame();

        QUnit.start();
    }
})

QUnit.module("Game Chat Test", {
    beforeEach: function (assert) {
    },
    afterEach: function () {
    }
});

/**
 * Make sure the chat section is created
 */
QUnit.test("Chat section created on page load", function(assert) {

    var inputbox = document.getElementById("user-msg-contents");
    assert.ok(inputbox != null, "Input box exists");

    var submitbutton = document.getElementById("user-msg-submit");
    assert.ok(submitbutton != null, "Send button exists");

    var chatbox = document.getElementById("chatbox");
    assert.ok(chatbox != null, 
        "Area for messages to appear created successfully");
});

/**
 * The chatbox should be empty
 */
QUnit.test("Empty message box/chatbox on start", function(assert) {

    var inputField = document.getElementById("user-msg-contents");
    assert.ok(inputField.value.length < 1, 
        "Empty message box on start");

    var chatbox = document.getElementById("chatbox");
    assert.ok(chatbox.childNodes.length < 1, 
        "Empty chatbox on start");
});

/**
 * Test sending a message
 */
QUnit.test("Send first message", function(assert) {
    GameInstance.myID = Multiplayer.players[0];

    var inputField = document.getElementById("user-msg-contents");
    submitTestField(inputField);

    var done = assert.async();
    setTimeout(function() {
      var chatboxFirstMessageChild = document.getElementById("chatbox").firstChild;
      assert.ok(chatboxFirstMessageChild != null, "First message exists in chatbox");
      done();
    }, 2000);
});

/**
 * The user input clears after a message is sent
 */
QUnit.test("User input clears on message send", function(assert) {
    var inputField = document.getElementById("user-msg-contents");
    submitTestField(inputField);
    
    assert.ok(inputField.value.length < 1,
        "User input box clears on message send");
});

/**
 * New messages prepend to existing chatbox
 */
QUnit.test("(Behavioral) New messages prepend to existing chatbox", function(assert) {
    // Get existing state of chatbox
    var chatbox = document.getElementById("chatbox");
    var currInner = chatbox.innerHTML;
    var chatboxChildrenCount = chatbox.childNodes.length;
    
    var newMessage = "test";
    var inputField = document.getElementById("user-msg-contents");
    inputField.value = newMessage;

    var submitbutton = document.getElementById("user-msg-submit");
    submitbutton.click();

    // Check new state of chatbox for correct prepending

    var done1 = assert.async();
    setTimeout(function() {
      var newCount = document.getElementById("chatbox").childNodes.length;
      assert.ok(newCount > chatboxChildrenCount, 
        "Sending message increased chatbox children count");
      done1();
    }, 2000);

    var done2 = assert.async();
    setTimeout(function() {
      var newInner = document.getElementById("chatbox").innerHTML;
      assert.ok(newInner != currInner && newInner.indexOf(currInner) >= 0,
        "New message correctly prepended");
      done2();
    }, 2000);
});

/**
 * Click the submit button
 */
function submitTestField(inputField) {
    inputField.value = "test";

    var submitbutton = document.getElementById("user-msg-submit");
    submitbutton.click();
};