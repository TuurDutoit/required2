var Vector = require("../vector");
var EventEmitter = require("event-emitter");
var util = require("util");




var GameObject = function(position, dimensions, angle) {
  EventEmitter.call(this);
  this.position = position || new Vector();
  this.dimensions = dimensions|| new Vector();
  this.angle = angle || 0;
  this.children = [];
  this.parent = null;
  this.collider = null;
  
  return this;
}

util.inherits(GameObject, EventEmitter);


GameObject.prototype.move = function(v){
  this.position.add(v);
  
  return this;
}

GameObject.prototype.rotate = function(angle) {
  this.angle += angle;
  
  return this;
}

GameObject.prototype.rotateAround = function(v, angle) {
  var pos = this.position;
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  
  pos.sub(v);
  pos.x = pos.x * c - pos.y * s;
  pos.y = pos.x * s + pos.y * c;
  pos.add(v);
  this.rotate(angle);
  
  return this;
}

GameObject.prototype.absolutePosition = function() {
  return this.relativeToAbsolute(this.position);
}

GameObject.prototype.relativeToAbsolutePosition = function(v) {
  return this.parent.absolutePosition().clone().add(v);
}

GameObject.prototype.absoluteToRelativePosition = function(v) {
  return v.clone().sub(this.absolutePosition());
}

GameObject.prototype.absoluteAngle = function() {
  return this.parent.absoluteAngle() + this.angle;
}

GameObject.prototype.relativeToAbsoluteAngle = function(angle) {
  return this.parent.absoluteAngle() + angle;
}

GameObject.prototype.absoluteToRelativeAngle = function(angle) {
  return angle - this.absoluteAngle();
}

GameObject.prototype.insertChild = function(child, index) {
  this.children.splice(index, 0, child);
  
  return this;
}

GameObject.prototype.appendChild = function(child) {
  this.children.push(child);
  
  return this;
}

GameObject.prototype.prependChild = function(child) {
  this.children.unshift(child);
  
  return this;
}

GameObject.prototype.insertBefore = function(child, reference) {
  var index = this.getChildIndex(reference);
  
  if(index > -1) {
    this.children.insertChild(child, index);
  }
  
  return this;
}

GameObject.prototype.insertAfter = function(child, reference) {
  var index = this.ghetChildIndex(reference);
  
  if(index > -1) {
    this.children.insertChild(child, index+1);
  }
  
  return this;
}

GameObject.prototype.removeChild = function(child) {
  var index = this.getChildIndex(child);
  this.removeChildAt(index);
  
  return this;
}

GameObject.prototype.removeChildAt = function(index) {
  if(index > -1) {
    this.children.splice(index, 1);
  }
  
  return this;
}

GameObject.prototype.replaceChild = function(child, old) {
  var index = this.getChildIndex(old);
  
  if(index > -1) {
    this.splice(index, 1, child);
  }
  
  return this;
}

GameObject.prototype.getChildIndex = function(child) {
  return this.children.indexOf(child);
}

GameObject.prototype.forEachChild = function(cb) {
  for(var i = 0; i < this.children.length; i++) {
    cb(this.children[i], i, this.children);
  }
  
  return this;
}

GameObject.prototype.init = function() {
  return this;
}

GameObject.prototype.update = function() {
 return this; 
}

GameObject.prototype.draw = function(camera) {
  return this;
}




module.exports = GameObject;