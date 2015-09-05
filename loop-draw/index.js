var EventEmitter = require("../event-emitter");
var events = require("../events");
var clock = require("../clock");
var animationFrame = require("../animation-frame");

var staticFps = false;
var fps;
var timeoutTime;
var timer;
var timerIsRAF;


var mod = new EventEmitter();
mod.pipe(events, function(self, other, event, args) {
  var e = event === "draw" ? "loop:draw" : "loop:draw:" + event;
  other.emit(e, args);
});


var timeout = function() {
  if(staticFps) {
    timer = clock.timeout(loop, timeoutTime);
    timerIsRAF = false;
  }
  else {
    timer = animationFrame.request(loop);
    timerIsRAF = true;
  }
}

var clearTimeout = function() {
  if(timerIsRAF) {
    animationFrame.cancel(timer);
  }
  else {
    clock.clearTimeout(timer);
  }
}





var loop = function() {
  mod.emit("draw");
  timeout();
}

var start = function() {
  mod.emit("start");
  loop();
}

var pause = function() {
  mod.emit("pause");
  clearTimeout();
}

var stop = function() {
  mod.emit("stop");
  clearTimeout();
}

var setFps = function(val) {
  if(val === undefined) {
    return fps;
  }
  else if(typeof fps === "number") {
    fps = val;
    timeoutTime = 1000 / fps;
    staticFps = true;
    mod.emit("fps", [true, val]);
  }
  else {
    staticFps = false;
    mod.emit("fps", [false, val]);
  }
}



mod.start = start;
mod.pause = pause;
mod.stop = stop;
mod.setFps = setFps;


module.exports = mod;