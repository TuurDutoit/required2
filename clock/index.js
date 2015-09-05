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
  lastUpdateTime = Clock.time;
});

events.on("loop:draw", function() {
  Clock.time = Clock.now();
  Clock.deltaTime.draw = Clock.time - lastDrawTime;
  lastDrawTime = Clock.time;
});



module.exports = Clock;