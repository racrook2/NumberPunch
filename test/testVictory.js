JsHamcrest.Integration.QUnit();
JsMockito.Integration.QUnit();

QUnit.test("Button hidden on launch", function (assert) {
    assert.equal(true, true);
    //<script src="../js/lobby.js"></script>
    var buttonCSS = $('.modal').css('display');
    assert.equal(buttonCSS, 'none');
});

QUnit.test("declareWinner can be called", function (assert) {
    var ret_state = GameInstance.declareWinner(1);
    assert.equal(ret_state, true);
});

QUnit.test("Mock Integration Base", function (assert) {
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
});


QUnit.test("Advanced Mock Integration Test", function (assert) {
    // Mock an instance of the game
    var mockedGame = mock(GameInstance);
	// These are some of the class variables
	mockedGame.myID = 1;
	//mockedGameseed = 0.4;
	mockedGame.inProgress = false;
	mockedGame.winner = 2;
	mockedGame.userIDs = [1,2];
	mockedGame.penaltyThreshold = 0;
	mockedGame.gameRule = 0;

	declareWinner  = mockFunction();
    when(declareWinner).call(anything()).then(function(arg){return arg;});

  	var winUser = mockedGame.winner;
    declareWinner(winUser);
    assert.equal(declareWinner(winUser),winUser);

    // ^ so this is working I think

	//mockDeclare  = mockFunction();
});