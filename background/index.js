var Vector = require("../vector");
var GameObject = require("../game-object");
var util = require("../util");

var Background = function(animation, position, dimensions) {
  this._super.call(this, arguments);
  this.animation = animation;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  
  return this;
}

Background.prototype.update = function() {
  
}

Background.prototype.draw = function() {   
  
}

//util.inherits(Background, GameObject);

module.exports = Background;