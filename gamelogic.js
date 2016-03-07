/**
 *	gamelogic.js
 *  
 *  This file defines data structure and logic behind
 *  an instance of the Number Punch game
 */

var instances = [];

POOL_NUMBER_COUNT = 15;

function GameInstance(e) {
  for(var i in e) {
    this[i] = e[i];
  }
  instances.push(this);
}

/**
 * Data structure defining a game instance
 */
GameInstance.prototype = {
  // List of users in the game instance by ID
  userIDs: [],

  // Mappings between user id's and their target number
  targetNum: {},

  // Mappings between user id's 
  // and a list of their avail. and unvail. numbers
  availNum: {},
  unavailNum: {},

  // Mappings between user id's and their selected numbers
  selectedNum: {},

  /** 
  * Reset a target number for a user
  *
  * @param userID (int)
  */
  resetTarNum: function(userID) {
    this.targetNum[userID] = Math.floor(Math.random() * POOL_NUMBER_COUNT) + 
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-1)) +
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-2)) + 1;

    this.selectNum[userID] = [];

    return true;
  },

  /**
   * Add a number to a user's selected numbers array
   * Deselects (removes the number from the array) if already existent
   *
   * @param userID (int)
   * @param num (int) 1<=num<=POOL_NUMBER_COUNT
   */
  selectNum: function(userID, num) {
    // Only accept available numbers
    if(this.unavailNum[userID].indexOf(num) >= 0) {
      return false;
    }

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
  },

  /**
   *  Adds a user to this game instance and initializes their values/arrays
   *
   *  @param userID (int)
   */
  addUser: function(userID) {
    if(this.userIDs.indexOf(userID) < 0) {
      this.userIDs.push(userID);
      this.targetNum[userID] = Math.floor(Math.random() * POOL_NUMBER_COUNT) + 
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-1)) +
      Math.floor(Math.random() * (POOL_NUMBER_COUNT-2)) + 1;

      this.availNum[userID] = [];
      this.unavailNum[userID] = [];
      this.selectedNum[userID] = [];
      // Initialize the user's available numbers
      for(var i = 1; i <= POOL_NUMBER_COUNT; i++) {
        this.availNum[userID].push(i);
      }
      return true;
    } else {
      return false;
    }
  },

  /**
   * Evaluates the current selected numbers to see if they match target
   * Perform necessary post actions and check game-winning conditions
   *
   * @param userID (int)
   */
  evaluateUser: function(userID) {
    var tar = this.targetNum[userID];
    var combination = 0;
    if(this.selectedNum[userID].length > 0) {
      combination = this.selectedNum[userID].reduce( (prev, curr) => prev + curr );
    }
    if(tar === combination) {
      this.resetTarNum(userID);
      for(var n in this.selectedNum[userID]) {
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
  },

  /**
   * Called when a player wins, emits winner data containing winner's user ID
   *
   * @param userID (int)
   */
  declareWinner: function(userID) {
    //socket.emit('winner', {"winner": userID});
  }
}