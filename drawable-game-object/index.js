var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var events = require("../events");
var input = require("../input")
var util = require("../util");
var Image = require("../image");
var rmove = /^move:/;
var rrotate = /^rotate:/;
var rchild = /^child:/;




var DrawableGameObject = function(image, position, dimensions, angle) {
  GameObject.call(this);
  this.image = image || new Image();
  this.position = position || new Vector();
  this.dimensions = dimensions|| new Vector();
  this.angle = angle || 0;
  
  /**
  this.pipe(events, function(self, other, event, args) {
    args.unshift(self);
    other.emit("object:"+event, args);
    
    if(rmove.test(event)) {
      args.unshift(event);
      self.emit("move", args);
      self.emit("change", args);
    }
    else if(rrotate.test(event)) {
      args.unshift(event);
      self.emit("rotate", args);
      self.emit("change", args);
    }
    else if(rchild.test(event)) {
      args.unshift(event);
      self.emit("child", args);
    }
  });**/
  
  return this;
}

util.inherits(DrawableGameObject, GameObject);

DrawableGameObject.prototype.update = function() {
  this.position = input.absoluteMousePosition;
  
  return this;
}

DrawableGameObject.prototype.draw = function(camera) {
  if(this.image){
    camera.drawOnScreen(this.image, this.position, this.dimensions, this.angle);
    /**camera.drawOnCanvas(this.image, this.position, camera.dimensionsOnScreen(this.dimensions), camera.angleOnScreen(this.angle));
  **/
  }
  return this;
}

module.exports = DrawableGameObject;