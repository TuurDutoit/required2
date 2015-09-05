var clock = require("../clock");

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

if(! requestAnimationFrame) {
  var vendors = ["ms", "moz", "webkit", "o"];
  for(var i = 0, len = vendors.length; i < len && !requestAnimationFrame; i++) {
    requestAnimationFrame = window[vendors[i]+'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame'] 
                               || window[vendors[i]+'CancelRequestAnimationFrame'];
  }
  
  
  if(! requestAnimationFrame) {
    var lastTime = 0;
    requestAnimationFrame = function(callback, element) {
      var currTime = clock.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    }
    cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}


module.exports = {
  request: function(cb) {
    requestAnimationFrame.call(window, cb);
  },
  cancel: function(id) {
    cancelAnimationFrame.call(window, id);
  }
}