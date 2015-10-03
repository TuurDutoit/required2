var Vector = require("../vector");
var renderer = require("../renderer");
var Input;

var self;


Input = {
  keyCodes: {},
  keys: {},
  absoluteMousePosition: new Vector(),
  mapKey: function(keyCode, name){
    Input.keyCodes[keyCode.toString()] = name;
    
    return Input;
  },
  mapKeys: function(CodesAndNames){
    for(var i = 0; i < this.CodesAndNames.length; i++) {
      Input.mapKey(this.CodesAndNames[0],this.CodesAndNames[1]);
    }
  },      
  handlerUp: function(event){
    Input.keys[Input.keyCodes[event.keyCode.toString()]] = false;
  
    return Input;
  },
  handlerDown: function(event){
    Input.keys[Input.keyCodes[event.keyCode.toString()]] = true;
  
    return Input;
  },
  calculateMousePosition: function(evt) {
        var rect = renderer.DOMElement.getBoundingClientRect();
        Input.absoluteMousePosition = new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
    
        return  Input;
  },
  keyStatus: function(key) {
    if(Input.keys[key] === true) {
      return true;
    }
    else{
      return false;
    }
  }
}
window.addEventListener('mousemove', function(evt) { Input.calculateMousePosition(evt); });
window.addEventListener("keydown", Input.handlerDown);
window.addEventListener("keyup", Input.handlerUp);

module.exports = Input;


