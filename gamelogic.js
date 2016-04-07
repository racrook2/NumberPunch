/**
 *	gamelogic.js
 *  
 *  This file defines data structure and logic behind
 *  an instance of the Number Punch game
 */
POOL_NUMBER_COUNT = 10;

/**
 * Data structure defining a game instance
 */
var GameInstance;
(function() {

  var myID;
  var seed = 0.4;

  var inProgress = false;
  var winner = null;

  // List of users in the game instance by ID
  var userIDs = [];

  // Mappings between user id's and their target number
  var targetNum = {};

  // Mappings between user id's 
  // and a list of their avail. and unvail. numbers
  var availNum = {};
  var unavailNum = {};

  // Mappings between user id's and their selected numbers
  var selectedNum = {};
  
  // Mappings between user id's and the number of times they've reset
  var resets = {};
  
  // Number of resets before player gets penalized
  var penaltyThreshold = 0;

  var gameRule = 0;

  var setGameRule = function(num)
  {
      if(this.inProgress) return false;
      gameRule = num;
  }

  var getGameRule = function() {
    return gameRule;
  };

  var setPenaltyThreshold = function(num) {
  	if (this.inProgress) return false;
    penaltyThreshold = num;
  };
  
  var getPenaltyThreshold = function() {
    return penaltyThreshold;
  };

  /** 
  * startGameHandle
  *
  * @param data (json) : sent from a 'start' 
  * socket.on to initialize game instance
  */
  var startGameHandle = function(data, players) {
    this.myID = players[data['me']];
    GameInstance.seed = data['seed'];
    console.log("Got start game handle with seed "+data['seed']);

    // Empty fields for new game
    this.userIDs = [];
    this.targetNum = {};
    this.availNum = {};
    this.unavailNum = {};
    this.selectedNum = {};
    this.resets = {};

    // Respective player fields correct re-initialized in addUser calls
    for(var i = 0; i < players.length; i++) {
      this.addUser(players[i]);
    }
    this.inProgress = true;
    this.winner = null;
  };

  var rng = function() {
    GameInstance.seed += 1.0;
    var x = Math.sin(GameInstance.seed)*10000;
    return x - Math.floor(x);
  };

  /**
   * Resets middle number
   * If user resets too many times, unavailable number added back to available pool
   *
   * @param userID (int)
   *
   * Return codes:
   * -1: Nothing happens
   * 0: Default reset behavior
   * >=1: Add unavailable number back to available pool and reset target number
   */
  var resetTarNumHandle = function(userID) {
    console.log("Reset tarNum for ", userID);
    if(!userID) return -1;

    this.targetNum[userID] = Math.floor(rng() * ((POOL_NUMBER_COUNT*3)-3))+1;

    console.log(this.targetNum[userID]);

    this.selectedNum[userID] = [];

    this.resets[userID]++;
    if (penaltyThreshold <= 0) {
      return 0;
    }

    if (this.resets[userID] >= penaltyThreshold) {
      this.resets[userID] = 0;
      var unavailLen = this.unavailNum[userID].length;
      var randInd = Math.floor(rng() * unavailLen);
      var randNum = this.unavailNum[userID].splice(randInd, 1)[0];
      this.availNum[userID].push(randNum);
      
      return randNum;
    }

    return 0;
  };


  var resetTarNum = function() {
    if(!this.inProgress) return;

    Multiplayer.sendOrder({
      "type": "resettar",
      "playerid": this.myID
    });
  }

  var processMessage = function() {
      var input = document.getElementById("user-msg-contents");
      var value = document.getElementById("user-msg-contents").value;
      if (value.length <= 0)
        return;
      input.value = "";
    Multiplayer.sendOrder({
      "type": "message",
      "msg": value,
      "playerid": this.myID
    });
  }

  /**
   * Add a number to a user's selected numbers array
   * Deselects (removes the number from the array) if already existent
   *
   * @param userID (int)
   * @param num (int) 1<=num<=POOL_NUMBER_COUNT
   *
   * Return codes:
   * -1: Nothing happens
   * 1: Selected but available, is de-selected
   * 2: Available and not selected button is selected and evaluation does nothing
   * 3: Selected numbers were correct combination & moved to unavail
   * 4: Selected numbers were over target number & all selected numbers reset
   * 5: Selected numbers were correct and there is a winner
   */
  var selectNumHandle = function(userID, num) {
    if(!userID) return -1;

    // Only accept available numbers
    if(this.unavailNum[userID].indexOf(num) >= 0) {
      return -1;
    }

    var i = this.selectedNum[userID].indexOf(num);

    // If num is in the array, then remove it
    if(i != -1) {
      this.selectedNum[userID].splice(i, 1);
      return 1;
    } else {
      this.selectedNum[userID].push(num);
    }

    // Check for combination and other conditions
    return this.evaluateUser(userID);
  };

  var selectNum = function(num) {
    if(!this.inProgress) return;

    console.log("select num called, this.myID: "+this.myID+", num: "+num);
    Multiplayer.sendOrder({
      'type': 'selectnum',
      'num': num,
      'playerid': this.myID
    });
  }

  /**
   *  Adds a user to this game instance and initializes their values/arrays
   *
   *  @param userID (int)
   */
  var addUser = function(userID) {
    if(this.userIDs.indexOf(userID) < 0) {
      this.userIDs.push(userID);
      this.targetNum[userID] = Math.floor(rng() * ((POOL_NUMBER_COUNT*3)-3))+1;

      this.availNum[userID] = new Array();
      this.unavailNum[userID] = new Array();
      this.selectedNum[userID] = new Array();
      this.resets[userID] = 0;
      // Initialize the user's available numbers
      for(var i = 1; i <= POOL_NUMBER_COUNT; i++) {
        this.availNum[userID].push(i);
      }
      return true;
    } else {
      return false;
    }
  };

  /**
   * Evaluates the current selected numbers to see if they match target
   * Perform necessary post actions and check game-winning conditions
   *
   * @param userID (int)
   *
   * Return codes:
   * 2: Nothing happened upon select
   * 3: Combination was correct
   * 4: Combination was over target
   * 5: Winner declared
   */
  var evaluateUser = function(userID) {
    var tar = this.targetNum[userID];
    var combination = 0;
    if(this.selectedNum[userID].length > 0) {
      combination = this.selectedNum[userID].reduce( (prev, curr) => prev + curr );
    }
    if(tar === combination) {

      	this.resets[userID]--;
      if(userID == this.myID){
        this.resetTarNum();
      }
      
      for(var i = 0; i < this.selectedNum[userID].length; i++) {
        var n = this.selectedNum[userID][i];
        this.unavailNum[userID].push(n);
        this.availNum[userID].splice(this.availNum[userID].indexOf(n), 1);
      }

      this.selectedNum[userID] = [];
      if(this.availNum[userID].length == 0) {
        this.declareWinner(userID);
        console.log("winner:");
        console.log(userID);
        // return 5;
      } 
      return 3;
    } else if(tar < combination) {
      this.selectedNum[userID] = [];
      return 4;
    }

    return 2;
  };

  /**
   * Called when a player wins, emits winner data containing winner's user ID
   *
   * @param userID (int)
   */
  var declareWinner = function(userID) {
    this.inProgress = false;
    this.winner = userID;
        Multiplayer.sendOrder({
      'type': 'winner declared',
      'player': userID
    });
  };

  GameInstance = {
    myID: myID,
    seed: seed,
    inProgress: inProgress,
    winner: winner,
    userIDs: userIDs,
    targetNum: targetNum,
    availNum: availNum,
    unavailNum: unavailNum,
    selectedNum: selectedNum,
    startGameHandle: startGameHandle,
    resetTarNumHandle: resetTarNumHandle,
    resetTarNum: resetTarNum,
    selectNum: selectNum,
    selectNumHandle: selectNumHandle,
    addUser: addUser,
    evaluateUser: evaluateUser,
    setPenaltyThreshold: setPenaltyThreshold,
    resets: resets,
    getPenaltyThreshold: getPenaltyThreshold,
    setGameRule: setGameRule,
    getGameRule: getGameRule,
    processMessage: processMessage,
    declareWinner: declareWinner
  };
})();
