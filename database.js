function DB(defaultValues){
	var data = defaultValues;
	var _this = this;
	if (typeof data != "object")
		data = {};
	for (var key in data){
		if (localStorage.hasOwnProperty(key)){
			data[key] = JSON.parse(localStorage.getItem(key));
		}
	}
	_this.setValue = function(key, value){
		data[key] = value;
		localStorage.setItem(key,JSON.stringify(value));
	}
	_this.getValue = function(key){
		return data[key];
	}
	_this.generateGUI = function(){
		var gui = document.createElement("div");
		gui.className = "preferences";
		for (var key in data){
			gui.appendChild(generateField(key));
		}
		return gui;
	}
	function generateField(key){
		var div = document.createElement("div");
		var input = generateInput(key);
		div.innerText = key + ":"
		div.appendChild(input);
		div.onclick = function(){
			input.focus();
		}
		div.className ="preference-field";
		return div;
	}
	function generateInput(key){
		var input = document.createElement("input");

		switch (typeof data[key]){
			case "string":
				input.type = "text";
				break;
			case "number":
				input.type = "number";
				break;
			case "boolean":
				input.type = "checkbox";
				break;
		}
		switch (typeof data[key]){
			case "string":
			case "number":
				input.value = data[key];
				input.onchange = function(){
					_this.setValue(key,input.value);
				}
				input.onkeypress = function(){
					setTimeout(function(){
						_this.setValue(key,input.value);
					},0);
				}
				break;
				
			case "boolean":
				input.checked = data[key];
				input.onchange = function(){
					_this.setValue(key,input.checked);
				}
				break;
		}
		return input;
	}
}
