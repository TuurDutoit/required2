(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var clock = require("../clock");

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

if(!requestAnimationFrame) {
  var vendors = ["ms", "moz", "webkit", "o"];
  for(var i = 0, len = vendors.length; i < len; i++) {
    requestAnimationFrame = window[vendors[i]+'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame'] 
                               || window[vendors[i]+'CancelRequestAnimationFrame'];
  }
  
  
  if(!requestAnimationFrame) {
    var lastTime = 0;
    requestAnimationFrame = function(callback, element) {
      var currTime = clock.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
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
  request: requestAnimationFrame,
  cancel: cancelAnimationFrame
}
},{"../clock":2}],2:[function(require,module,exports){
var events = require("../events");

var lastUpdateTime;
var lastDrawTime;


var Clock = {
  timeout: function(cb, time) {
    setTimeout(cb, time);
  },
  now: (function() {
    if("performance" in window) {
      return function() {return performance.now();}
    }
    else if("webkitPerformance" in window) {
      return function() {return webkitPerformance.now();}
    }
    else if("now" in Date) {
      return function() {return Date.now();}
    }
    else {
      return function() {return new Date();}
    }
  })(),
  deltaTime: {},
}



var Timer = function(start) {
  this.time = 0;
  this.startTime = 0;
  this.running = false;
  this.started = false;
  this.stopped = false;
  
  if(start) {
    this.start();
  }
}

Timer.prototype.start = function() {
  if(!this.running && !this.stopped) {
    this.startTime = Clock.now();
    this.running = true;
    this.started = true;
  }
  
  return this;
}

Timer.prototype.pause = function() {
  if(this.running && !this.stopped) {
    this.time += Clock.now() - this.startTime;
    this.running = false;
  }
  
  return this;
}

Timer.prototype.stop = function() {
  if(!this.stopped) {
    if(this.running) {
      this.time += Clock.now() - this.startTime;
      this.running = false;
    }
    this.stopped = true;
  }
  
  return this;
}


Clock.Timer = Timer;

Clock.timer = function() {
  return new Timer(true);
}






events.on("loop:update:start", function() {
  lastUpdateTime = Clock.now();
});

events.on("loop:draw:start", function() {
  lastDrawTime = Clock.now();
});

events.on("loop:update", function() {
  Clock.time = Clock.now();
  Clock.deltaTime.update = Clock.time - lastUpdateTime;
});

events.on("loop:draw", function() {
  Clock.time = Clock.now();
  Clock.deltaTime.draw = Clock.time - lastDrawTime;
});



module.exports = Clock;
},{"../events":4}],3:[function(require,module,exports){
var EventEmitter = function() {
  this._eventemitter = {
    events: {},
    proxies: []
  }
}


EventEmitter.prototype.on = function(event, listener, context) {
  var listeners = this._eventemitter.events[event];
  listener.__context__ = context || null;
  if(! listeners) {
    var listeners = this._eventemitter.events[event] = [];
  }
  listeners.push(listener);
  
  return this;
}


EventEmitter.prototype.once = function(event, listener, context) {
  var self = this;
  var cb = function() {
    listener.apply(this, arguments);
    self.off(event, cb);
  }
  this.on(event, cb, context);
  
  return this;
}


EventEmitter.prototype.many = function(event, listener, amount, context) {
  var self = this;
  var count = 0;
  var cb = function() {
    listener.apply(this, arguments);
    count++;
    if(count === amount) {
      self.off(event, cb);
    }
  }
  this.on(event, cb, context);
  
  return this;
}


EventEmitter.prototype.off = function(event, listener) {
  var listeners = this._eventemitter.events[event];
  if(listeners) {
    if(listener) {
      var index = listeners.indexOf(listener);
      if(index !== -1) {
        listeners.splice(index, 1);
      }
    }
    else {
      listeners.length = 0;
    }
  }
  
  return this;
}


EventEmitter.prototype.emit = function(event, args) {
  var listeners = this._eventemitter.events[event];
  if(listeners) {
    for(var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener.apply(listener.__context__ || null, args);
    }
  }
  
  var proxies = this._eventemitter.proxies;
  for(var i = 0, len = proxies.length; i < len; i++) {
    var proxy = proxies[i];
    proxy.exec(this, proxy.other, event, args);
  }
  
  return this;
}


EventEmitter.prototype.listeners = function(event) {
  return this._eventemitter.events[event] || [];
}


EventEmitter.prototype.count = function(event) {
  return this.listeners(event).length;
}


EventEmitter.prototype.pipe = function(other, exec) {
  if(typeof exec === "string") {
    var exec = createPrefixedExec(exec);
  }
  else if(typeof exec !== "function") {
    var exec = defaultExec;
  }
  
  this._eventemitter.proxies.push({other: other, exec: exec});
  
  return this;
}


EventEmitter.prototype.pipeFrom = function(other, exec) {
  other.pipe(this, exec);
  
  return this;
}


EventEmitter.prototype.proxy = function(other, execPush, execFrom) {
  this.pipe(other, execPush);
  other.pipe(this, execFrom || execPush);
  
  return this;
}







function defaultExec(self, other, event, args) {
  other.emit(event, args);
}


function createPrefixedExec(prefix) {
  return function(self, other, event, args) {
    other.emit(prefix+event, args);
  }
}






module.exports = EventEmitter;
},{}],4:[function(require,module,exports){
var EventEmitter = require("../event-emitter");

module.exports = new EventEmitter();
},{"../event-emitter":3}],5:[function(require,module,exports){
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
    clock.animationFrame.cancel(timer);
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
},{"../animation-frame":1,"../clock":2,"../event-emitter":3,"../events":4}],6:[function(require,module,exports){
var EventEmitter = require("../event-emitter");
var events = require("../events");
var clock = require("../clock");

var fps = 60;
var timeoutTime = 1000 / fps;
var staticFps = true;
var timer;
var timerIsRAF;


var mod = new EventEmitter();
mod.pipe(events, function(self, other, event, args) {
  var e = event === "update" ? "loop:update" : "loop:update:" + event;
  other.emit(e, args);
});


var timeout = function() {
  if(staticFps) {
    timer = clock.timeout(loop, timeoutTime);
    timerIsRAF = false;
  }
  else {
    timer = clock.requestAnimationFrame(loop);
    timerIsRAF = true;
  }
}

var clearTimeout = function() {
  if(timerIsRAF) {
    clock.cancelAnimationFrame(timer);
  }
  else {
    clock.clearTimeout(timer);
  }
}





var loop = function() {
  mod.emit("update");
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
},{"../clock":2,"../event-emitter":3,"../events":4}],7:[function(require,module,exports){
var updateLoop = require("../loop-update");
var drawLoop = require("../loop-draw");

module.exports = {
  start: function() {
    updateLoop.start();
    drawLoop.start();
  },
  pause: function() {
    updateLoop.pause();
    drawLoop.pause();
  },
  stop: function() {
    updateLoop.stop();
    drawLoop.stop();
  },
  updateFps: function(val) {
    updateLoop.fps(val);
  },
  drawFps: function(val) {
    drawLoop.fps(val);
  }
}
},{"../loop-draw":5,"../loop-update":6}],8:[function(require,module,exports){
events = require("../events");
var loop = require("../loop");
Game = {
    start: function(){
        loop.start()
    }
}
},{"../events":4,"../loop":7}]},{},[8]);
