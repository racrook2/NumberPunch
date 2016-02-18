# Simple Node Server
1. Install Node.js: http://nodejs.org (add to PATH if necessary)
2. Open shell/cmd
3. `cd` to this directory and run `node .`
4. http://127.0.0.1:3000/

Unfortunately opening the socket.io requests to Firecaster is protected by remote origin policies so it doesn't actually work right now.


NumberPunch
===========

Number Punch for CS 429

# CTW Documentation

## Actions

### Create Game
```javascript
	socket.emit("creategame", {
		title:"The Title",
		type: 1234,
		max: 2,
		syncOrders: false
	});
```
title - String, the title

type - Integer, the game type

max - Integer, the number of players the game can old

syncOrders - Boolean, true sends out an order packet every 30 ms. Otherwise just mirrors orders as they come in. Just set to false

### Refresh Game List
	socket.emit('listgames');

### Join Game
	socket.emit('joingame', id);
id - String, game id

### Start Game
	socket.emit("startgame");
Starts the game, can only be called by the client that created the game

### Order
	socket.emit("order",data);
data - Object, some data to be sent to everyone in game


## Events
"listgames"
"youjoined"
"players"
"start"
"order"
