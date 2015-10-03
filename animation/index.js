var renderer = require("../renderer");

var clock = require("../clock");

var Animation = function(sequence, looping, position, dimensions, angle) {
  // [[image, time], [image, time]]
  this.sequence = sequence;
  this.looping = looping || true;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector(1,1);
  this.angle = angle || 0;
  this.currentFrame = 0;
  this.counter = 0;
  
  this.prevTime = clock.now();
  
  this.load();
  
  return this;
}

Animation.prototype.draw = function(position, dimensions, angle) {
  this.counter += (clock.now() - this.prevTime);
  if(this.counter >= this.currentTime()){
    this.counter -= this.currentTime();
    this.advanceFrame();
  }
  
  this.currentImage().draw(position.clone().add(this.position), dimensions.clone().multiply(this.dimensions), angle + this.angle);
  this.prevTime = clock.now();
  
  return this;
}

Animation.prototype.advanceFrame = function() {
  this.currentFrame += 1;
  if(this.currentFrame >= this.sequence.length) {
    if(this.looping) {
      this.currentFrame = 0;
    }
  }
  
  return this;
}

Animation.prototype.currentImage = function() {
  return this.sequence[this.currentFrame][0];
}

Animation.prototype.currentTime = function() {
  return this.sequence[this.currentFrame][1];
}
Animation.prototype.load = function() {
  for(var i = 0; i < this.sequence.length; i++) {
    this.sequence[i][0].load();
  }
  
  return this;
}

Animation.prototype.reset = function() {
  this.currentFrame = 0;
  
  return this;
}



module.exports = Animation;