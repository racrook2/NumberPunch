function makeHotkeys(keys){
    var el, str, index;
    for (var i in keys){
        if (el = document.querySelector(keys[i])){
           index = el.innerHTML.toLowerCase().indexOf(i);
           el.innerHTML = el.innerHTML.substring(0,index) + "<span class=hotkey>" + el.innerHTML.substring(index,index+1) + "</span>" + el.innerHTML.substring(index+1);
        }
    }
    document.addEventListener("keydown",function(e){
        var id;
        if (id = keys[String.fromCharCode(e.which).toLowerCase()]){
            if (document.querySelector(id).offsetParent !== null){
                document.querySelector(id).dispatchEvent(new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                }));
            }
        }
    })
}