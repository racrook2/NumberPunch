GameInstance.myID = Math.random().toString();

QUnit.module("Stats test", {
    beforeEach: function () {
    },
    afterEach: function () {
    }
});
/**
 * Test persistance
 */
var needed = {
    wins: 7,
    losses: 3
};
(function(){

    var otherID = Math.random().toString();
    var s = GameInstance.gameStats();
    if (s.wins != needed.wins || s.losses != needed.losses){
        localStorage.clear();
        for (var i = s.wins; i < needed.wins; i++){
            GameInstance.gameResult(GameInstance.myID);
        }
        for (var i = s.losses; i < needed.losses; i++){
            GameInstance.gameResult(GameInstance.otherID);
        }
        document.write("Please wait...");
        location.reload();
    }
    else{
        QUnit.test("Persistent stats", function (assert) {
            var s = GameInstance.gameStats();
            assert.equal(s.wins, needed.wins);
            assert.equal(s.losses, needed.losses);
            localStorage.clear();
        });
        runTests();
    }
})();

function runTests(){

    QUnit.test("Loss works", function (assert) {
        
        var otherID = Math.random().toString();
        var s;
        for (var i = 0; i < 1000; i++){
            s = GameInstance.gameStats();
            GameInstance.gameResult(otherID);
            assert.equal(GameInstance.gameStats().losses,s.losses+1);
        }
    });
    QUnit.test("Win works", function (assert) {
        
        var otherID = Math.random().toString();
        var s;
        for (var i = 0; i < 1000; i++){
            s = GameInstance.gameStats();
            GameInstance.gameResult(GameInstance.myID);
            assert.equal(GameInstance.gameStats().wins,s.wins+1);
        }
    });
    QUnit.test("Clear sets to 0", function (assert) {
        localStorage.clear();
        assert.equal(GameInstance.gameStats().wins, 0);
        assert.equal(GameInstance.gameStats().losses, 0);
    });
    QUnit.test("Wins and losses after clear", function (assert) {
        localStorage.clear();
        var otherID = Math.random().toString();
        var s;
        for (var i = 0; i < 1000; i++){
            s = GameInstance.gameStats();
            GameInstance.gameResult(GameInstance.myID);
            GameInstance.gameResult(otherID);
            assert.equal(GameInstance.gameStats().wins,s.wins+1);
            assert.equal(GameInstance.gameStats().losses,s.losses+1);
        }
    });
    
    
}