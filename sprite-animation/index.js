var renderer = require("../renderer");
var Vector = require("../vector");
var clock = require("../clock");

var SpriteAnimation = function(location, sequence, looping, position, dimensions, angle) {
  // [[sheetPosition, sheetDimensions, time], [sheetPosition, sheetDimensions, time]]
  this.location = location;
  this.sequence = sequence;
  this.looping = looping || true;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector(1,1);
  this.angle = angle || 0;
  this.loadedSheet = null;
  this.currentFrame = 0;
  this.counter = 0;
  
  this.prevTime = clock.now();
  
  this.load();
  
  return this;
}

SpriteAnimation.prototype.draw = function(position, dimensions, angle) {
  this.counter += (clock.now() - this.prevTime);
  if(this.counter >= this.currentTime()){
    this.counter -= this.currentTime();
    this.advanceFrame();
  }
  
  if(this.loadedSheet) {
    renderer.drawSprite(this.loadedSheet, this.currentSheetPosition(), this.currentSheetDimensions(), position.clone().add(this.position), dimensions.clone().multiply(this.dimensions), angle + this.angle);
  }
  
  this.prevTime = clock.now();
  
  return this;
}

SpriteAnimation.prototype.advanceFrame = function() {
  this.currentFrame += 1;
  if(this.currentFrame >= this.sequence.length) {
    if(this.looping) {
      this.currentFrame = 0;
    }
  }
  
  return this;
}

SpriteAnimation.prototype.currentImage = function() {
  return this.loadedSheet;
}

SpriteAnimation.prototype.currentTime = function() {
  return this.sequence[this.currentFrame][2];
}

SpriteAnimation.prototype.currentSheetPosition = function() {
  return this.sequence[this.currentFrame][0];
}

SpriteAnimation.prototype.currentSheetDimensions = function() {
  return this.sequence[this.currentFrame][1];
}


SpriteAnimation.prototype.load = function() {
  this.loadedSheet = document.getElementById(this.location);
  
  return this;
}

SpriteAnimation.prototype.reset = function() {
  this.currentFrame = 0;
  
  return this;
}



module.exports = SpriteAnimation;