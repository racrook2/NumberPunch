/**
 *	gamelogic.js
 *  
 *  This file defines data structure and logic behind
 *  an instance of the Number Punch game
 */
POOL_NUMBER_COUNT = 15;

/**
 * Data structure defining a game instance
 */

var createGameInstance = function() {

  var myID;
  var seed;

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

  /** 
  * startGameHandle
  *
  * @param data (json) : sent from a 'start' 
  * socket.on to initialize game instance
  */
  var startGameHandle = function(data) {
    this.myID = data['myID'];
    this.seed = data['seed'];
    for(var i = 0; i < data['allIDs'].length; i++) {
      this.addUser(data['allIDs'][i]);
    }
    this.inProgress = true;
    this.winner = null;
  };

  var resetTarNumHandle = function(userID) {
    if(!userID) return false;

    this.targetNum[userID] = Math.floor(Math.random() * POOL_NUMBER_COUNT) + 
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-1)) +
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-2)) + 1;

    this.selectedNum[userID] = [];

    return true;
  };


  var resetTarNum = function() {
    if(!this.inProgress) return;

    Multiplayer.sendOrder({
      "type": "resettar",
      "playerid": this.myID
    });
  }

  /**
   * Add a number to a user's selected numbers array
   * Deselects (removes the number from the array) if already existent
   *
   * @param userID (int)
   * @param num (int) 1<=num<=POOL_NUMBER_COUNT
   */
  var selectNumHandle = function(userID, num) {
    if(!userID) return false;

    // Only accept available numbers
    if(this.unavailNum[userID].indexOf(num) >= 0) {
      return false;
    }

    console.log(this.selectedNum);
    console.log(this.userIDs);
    var i = this.selectedNum[userID].indexOf(num);

    // If num is in the array, then remove it
    if(i != -1) {
      this.selectedNum[userID].splice(i, 1);
    } else {
      this.selectedNum[userID].push(num);
    }

    // Check for combination and other conditions
    this.evaluateUser(userID);
    return true;
  };

  var selectNum = function(num) {
    if(!this.inProgress) return;

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
      this.targetNum[userID] = Math.floor(Math.random() * POOL_NUMBER_COUNT) + 
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-1)) +
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-2)) + 1;

      this.availNum[userID] = new Array();
      this.unavailNum[userID] = new Array();
      this.selectedNum[userID] = new Array();
      console.log("in addUser("+userID+"), ", this.selectedNum);
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
   */
  var evaluateUser = function(userID) {
    var tar = this.targetNum[userID];
    var combination = 0;
    if(this.selectedNum[userID].length > 0) {
      combination = this.selectedNum[userID].reduce( (prev, curr) => prev + curr );
    }
    if(tar === combination) {
      this.resetTarNumHandle(userID);
      for(var i = 0; i < this.selectedNum[userID].length; i++) {
        var n = this.selectedNum[userID][i];
        this.unavailNum[userID].push(n);
        this.availNum[userID].splice(this.availNum[userID].indexOf(n), 1);
      }
      this.selectedNum[userID] = [];
    } else if(tar < combination) {
      this.selectedNum[userID] = [];
    }

    if(this.availNum[userID].length === 0) {
      this.declareWinner(userID);
    }
    return true;
  };

  /**
   * Called when a player wins, emits winner data containing winner's user ID
   *
   * @param userID (int)
   */
  var declareWinner = function(userID) {
    this.inProgress = false;
    this.winner = userID;
  };

  var anInstance = {
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
    selectNumHandle, selectNumHandle,
    addUser: addUser,
    evaluateUser: evaluateUser
  };

  return anInstance;
};

var GameInstance = createGameInstance();