var clock = require("../clock");
var events = require("../events");
var util = require("util");


var ColliderAnimation = function(frames, time) {
  EventEmitter.apply(this, arguments);
  this.frames = frames;
  this.time = time;
  this.timeRunning = 0;
  this.running = false;
  this.currentFrameIndex = 0;
  this.currentFrame = this.frames[0];
  this.len = this.frames.length;
  
  return this;
}

util.inherits(ColliderAnimation, EventEmitter);


ColliderAnimation.prototype.update = function() {
  this.timeRunning += clock.deltaTime.update;
  var currentIndex = (this.timeRunning / this.time) % this.len;
  
  if(currentIndex !== this.currentFrameIndex) {
    var old = this.currentFrame;
    this.currentFrameIndex = currentIndex;
    this.currentFrame = this.frames[currentIndex];
    
    this.switchCollider(old, this.currentFrame);
  
    this.emit("update", [this.currentFrame, old]);
  }
  
  return this;
}

ColliderAnimation.prototype.current = function() {
  return this.currentFrame;
}

ColliderAnimation.prototype.currentIndex = function() {
  return this.currentFrameIndex;
}

ColliderAnimation.prototype.start = function() {
  if(!this.running) {
    this.running = true;
    events.on("loop:update", this.update, this);
    this.emit("start");
  }
  
  return this;
}

ColliderAnimation.prototype.pause = function() {
  if(this.running) {
    this.running = false;
    event.off("loop:update", this.update);
    this.emit("pause");
  }
  
  return this;
}

ColliderAnimation.prototype.stop = function() {
  this.pause();
  this.timeRunning = 0;
  this.emit("stop");
  
  return this;
}

ColliderAnimation.prototype.switchCollider(old, current) {
  old.remove();
  current.insert();
  
  return this;
}



module.exports = ColliderAnimation;