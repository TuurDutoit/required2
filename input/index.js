var Input;

var self;


Input = {
  keyCodes: {},
  keys: {},
  mapKey: function(keyCode, name){
    Input.keyCodes[keyCode.toString()] = name;
    
    return Input;
  },
  handlerUp: function(event){
    Input.keys[Input.keyCodes[event.keyCode.toString()]] = false;
  
    return Input;
  },
  handlerDown: function(event){
    Input.keys[Input.keyCodes[event.keyCode.toString()]] = true;
  
    return Input;
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

window.addEventListener("keydown", Input.handlerDown);
window.addEventListener("keyup", Input.handlerUp);

module.exports = Input;


