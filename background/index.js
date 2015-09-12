var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var renderer = require("../renderer");

var Background = function(animation, position, dimensions) {
  EventEmitter.call(this);
  this.animation = animation;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  
  return this;
}

util.inherits(Background, GameObject);

Background.prototype.update = function() {
  
}

Background.prototype.draw = function() { 
  renderer.drawImage(this.animation, this.position, this.dimensions, 0);
}

module.exports = Background;