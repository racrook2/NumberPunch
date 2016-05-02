/**
 * Initalize the database
 */
QUnit.test("Can init DB", function (assert) {
    var db = new DB({});
	assert.ok(typeof db == "object", "can make new DB object");
});

/**
 * The database can be given default values
 */
QUnit.test("Can provide default values", function (assert) {
    var db = new DB({
		hey: 52,
		woo: "asdf",
		boolthing: true
	});
	assert.ok(db.getValue("hey") == 52, "default int");
	assert.ok(db.getValue("woo") == "asdf", "default string");
	assert.ok(db.getValue("boolthing") == true, "default bool");
	db.clear();
});

/**
 * Make sure the default values can be overwritten
 */
QUnit.test("Can set and get values", function (assert) {
    var db = new DB({
		hey: 52,
		woo: "asdf",
		boolthing: true
	});
	db.setValue("hey", 63);
	db.setValue("cool", false);
	db.setValue("red", "hello");
	assert.ok(db.getValue("hey") == 63, "set int, default");
	assert.ok(db.getValue("red") == "hello", "set string");
	assert.ok(db.getValue("cool") == false, "set bool");
	db.clear();
});

/**
 * Storage needs to stay even after a new database is made.
 */
QUnit.test("Persistant storage", function (assert) {
    var db = new DB({});
	db.setValue("hey", 26);
	assert.ok(db.getValue("hey") == 26, "set int");
	
	var db2 = new DB({});
	
	assert.ok(db.getValue("hey") == 26, "new db int");
	
	db.clear();
	db2.clear();
});

/**
 * The database can be cleared
 */
QUnit.test("Clear", function (assert) {
    var db = new DB({
		"hey": 52
	});
	db.setValue("hey", 26);
	assert.ok(db.getValue("hey") == 26, "set int");
	
	db.clear();
	assert.ok(db.getValue("hey") == 52, "set int back");
	db.clear();
});

/**
 * A gui can be generated
 */
QUnit.test("GUI", function (assert) {
    var db = new DB({
		hey: 52,
		woo: "asdf",
		boolthing: true
	});
	var gui = db.generateGUI();
	assert.ok(gui.getElementsByTagName("input").length == 3, "Makes 3 input elements");
	assert.ok(gui.className == "preferences", "Makes preferences element");
	assert.ok(gui.getElementsByClassName("preference-field").length == 3, "Makes preference fields");
	var first = gui.getElementsByTagName("input")[0];
	first.value = 72;
	first.onchange();
	assert.ok(db.getValue("hey") == 72, "Can change input values");
	db.clear();
});

