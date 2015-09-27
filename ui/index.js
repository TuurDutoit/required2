var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var renderer = require("../renderer");

var Ui = function(image, position, dimensions, angle) {
  EventEmitter.call(this);
  //this.animation = animation;
  this.image = image;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  this.unaffectedByZoom = true;
  return this;
}

util.inherits(Ui, GameObject);

Ui.prototype.update = function() {
  //this.image.changeText("UIUIUIUUIUIUIUIUUIUIUIUI");
  
  return this;
}

Ui.prototype.draw = function(camera) { 
  //console.log(this.image);
  camera.drawTextOnScreen(this.image, this.absolutePosition(), 30, this.absoluteAngle(), "Georgia", "Black" , this.unaffectedByZoom);
  
  return this;
}

module.exports = Ui;