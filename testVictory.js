JsHamcrest.Integration.QUnit();
JsMockito.Integration.QUnit();

$.ajax({
    url: "./index.html",
    dataType: "html",	
    success: function(html) {
	console.log("success!");
        var exit = $(html).find("#exit");
        $("#qunit-fixture").append(exit);
        var leavegame = $(html).find("#leaveGame");
        $("#qunit-fixture").append(leavegame);
	var creategame = $(html).find("#createGame");
        $("#qunit-fixture").append(creategame);
        var refresh = $(html).find("#refresh");
        $("#qunit-fixture").append(refresh);
	var preferences = $(html).find("#preferences");
        $("#qunit-fixture").append(preferences);
        var ready = $(html).find("#ready");
        $("#qunit-fixture").append(ready);
	var startgame = $(html).find("#startGame");
        $("#qunit-fixture").append(startgame);
        QUnit.start();
    },

    error: function(xhr, status, error) {
    console.log(error);
    var message = eval("(" + xhr.responseText + ")");
    alert(message.Message);
    }
})


QUnit.test("Exit Button hidden on launch", function (assert) {
    var buttonCSS = $('#exit').css('display');
    assert.equal(buttonCSS, 'none');
});

QUnit.test("Leave Button hidden on launch", function (assert) {
    var buttonCSS = $('#leaveGame').css('display');
    assert.equal(buttonCSS, 'none');
});

QUnit.test("Create Game Button Visible on launch", function (assert) {
    var buttonCSS = $('#createGame').css('display');
    assert.equal(buttonCSS, 'block');
});

QUnit.test("Refresh Button Visible on launch", function (assert) {
    var buttonCSS = $('#refresh').css('display');
    assert.equal(buttonCSS, 'block');
});

QUnit.test("Preferences Button Visible on launch", function (assert) {
    var buttonCSS = $('#preferences').css('display');
    assert.equal(buttonCSS, 'block');
});

QUnit.test("Ready Button hidden on launch", function (assert) {
    var buttonCSS = $('#ready').css('display');
    assert.equal(buttonCSS, 'none');
});

QUnit.test("Start Game Button hidden on launch", function (assert) {
    var buttonCSS = $('#startGame').css('display');
    assert.equal(buttonCSS, 'none');
});

QUnit.test("declareWinner can be called", function (assert) {
    var ret_state = GameInstance.declareWinner(1);
    assert.equal(ret_state, true);
});

/*QUnit.test("Mock Integration Base", function (assert) {
    // How does this work ;_;

    var mockedGame = mock(GameInstance);
	
	//mockedGame.method()
	mockDeclare  = mockFunction();
    //when(mockDeclare).call(anything()).thenReturn(anything());
    when(mockDeclare).call(anything()).thenReturn(1);
  	var simUser = 1;
    // -- start code under test --
    mockDeclare(simUser);
    // -- end code under test --
  
    assert.equal(mockDeclare(simUser),1);

	//mockDeclare  = mockFunction();
});*/


QUnit.test("Mock Game Victory", function (assert) {
    // Mock an instance of the game
    var mockedGame = mock(GameInstance);
	// These are some of the class variables
	mockedGame.myID = 0.1;
	mockedGame.inProgress = false;
	mockedGame.winner = 0.2;
	mockedGame.userIDs = [0.1,0.2];
	mockedGame.penaltyThreshold = 0;
	mockedGame.gameRule = 0;
	declareWinner  = mockFunction();
    when(declareWinner).call(anything()).then(function(arg){return mockedGame.winner;});

  	var winUser = mockedGame.winner;
    declareWinner(winUser);
    assert.equal(declareWinner(winUser),winUser);

    // ^ so this is working I think

	//mockDeclare  = mockFunction();
});
