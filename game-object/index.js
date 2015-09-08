var Vector = require("../vector");
var EventEmitter = require("event-emitter");
var util = require("util");



var GameObject = function(position, dimensions, angle, rotationCenter) {
  this._super().call(this);
  
  this.position = position || new Vector();
  this.dimensions = dimensions|| new Vector();
  this.angle = angle || 0;
  this.children = [];
  this.parent = null;
  this.collider = null;
  
  return this;
}

util.inherits(GameObject, EventEmitter);


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
    cb(this.children.length, i, this.children);
  }
  
  return this;
}



module.exports = GameObject;