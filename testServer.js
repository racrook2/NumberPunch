var socket;
var GAME_TYPE = 268201;

QUnit.module( "Server Test", {
  beforeEach: function() {
      console.log("before");
    // prepare something for all following tests
    if (socket){
        socket.socket.connect();
    }
    else{
        socket = io.connect("ctw.firecaster.com");
    }
  },
  afterEach: function() {
      socket.removeAllListeners();
      socket.disconnect();
  }
});

QUnit.test( "Did we connect", function( assert ) {
    var done = assert.async();
    socket.on('connect',function(){
        assert.ok( true, "connected to ctw.firecaster.com" );
        console.log("we did connect");
        done();
    });
});


QUnit.test( "Test listgames", function( assert ) {

    socket.emit("listgames");
    console.log("listgames");
    var done = assert.async();
    socket.on('listgames',function(data){
        assert.ok( true, "Got listgames packet" );
        assert.ok( Array.isArray(data), "The data is an array" );
        done();
    });
});

QUnit.test( "Test creategame", function( assert ) {

    var title = "Test title";
    socket.emit("creategame",{
        type:GAME_TYPE,
        title:title,
        max:2
    });
    var done = assert.async();
    socket.emit("listgames");
    socket.on('listgames',function(data){
        assert.ok( true, "Got listgames packet" );
        assert.ok( Array.isArray(data), "The data is an array" );
        for (var i = 0; i < data.length; i++){
            if (data[i].title === title && data[i].max == 2){
                assert.ok(true,"Our game was listed")
            }
        }
        done();
    });
});


QUnit.test( "Test startgame", function( assert ) {
    var title = "Test joingame title";
    socket.emit("creategame",{
        type:GAME_TYPE,
        title:title,
        max:2
    });
    var done = assert.async();
    socket.on("start",function(data){
        console.log(data);
        assert.ok(true,"Got start packet");
        assert.ok(data.pc === 1,"Player count should be 1");
        assert.ok(data.me === 0,"Id should be 0");
        assert.ok(data.seed,"Should contain a random seed");
        done();
    });
    socket.emit("startgame");
});
