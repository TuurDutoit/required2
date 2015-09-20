var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var renderer = require("../renderer");

var Background = function(animation, position, dimensions, angle) {
  EventEmitter.call(this);
  this.animation = animation;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  
  return this;
}

util.inherits(Background, GameObject);

Background.prototype.update = function() {
  return this;
}

Background.prototype.draw = function(camera) { 
  camera.drawOnScreen(this.animation, this.position, this.dimensions, this.angle)
    //renderer.drawImage(this.animation, this.position, this.dimensions, 0);
  
  return this;
}

module.exports = Background;