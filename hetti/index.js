var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var Hetti = function(physics){
  GameObject.call(this);
  
  this.velocity = new Vector();
  this.acceleration = new Vector();
  this.maxVelocity  = new Vector(50, 50);
  this.maxAcceleration = new Vector(50, 50);
  
  this.appendMultiplePhysicsPatch(physics);
  
  return this;
}

util.inherits(Hetti, GameObject);

Hetti.prototype.init = function(){
  return this;
}

Hetti.prototype.update = function(){
  this.increaseVelocity(this.acceleration);
  this.parent.moveBy(this.velocity.multiply(standards.speed));
  
  return this;
}

Hetti.prototype.draw = function(camera){
  return this;
}

Hetti.prototype.accelerate = function(v) {  
  this.acceleration.add(v);
  
  if(this.acceleration.x > this.maxAcceleration.x) {
    this.acceleration.x = this.maxAcceleration.x;
  }
  if(this.acceleration.y > this.maxAcceleration.y) {
    this.acceleration.y = this.maxAcceleration.y;
  }
  
  return this;
}

Hetti.prototype.increaseVelocity = function(v){
  
  this.velocity.add(v);
  
  if(this.velocity.x > this.maxVelocity.x) {
    this.velocity.x = this.maxVelocity.x;
  }
  if(this.velocity.y > this.maxVelocity.y) {
    this.velocity.y = this.maxVelocity.y;
  }

  
  return this;
}

Hetti.prototype.appendPhysicsPatch = Hetti.prototype.appendChild;

Hetti.prototype.appendPhysicsPatches = Hetti.prototype.appendChildren;

Hetti.prototype.prependPhysicsPatch = Hetti.prototype.prependChild;

Hetti.prototype.insertPhysicsPatch = Hetti.prototype.insertChild;

Hetti.prototype.insertPhysicsPatchAfter = Hetti.prototype.insertChildAfter;

Hetti.prototype.insertPhysicsPatchAt = Hetti.prototype.insertChildAt;

Hetti.prototype.insertPhysicsPatchBefore = Hetti.prototype.insertChildBefore;

Hetti.prototype.removePhysicsPatch = Hetti.prototype.removeChild;

Hetti.prototype.removePhysicsPatchAt = Hetti.prototype.removeChildAt;

Hetti.prototype.replacePhysicsPatch = Hetti.prototype.replaceChild;

Hetti.prototype.getPhysicsPatch = Hetti.prototype.getChild;

Hetti.prototype.getPhysicsPatchAt = Hetti.prototype.getChildAt;

Hetti.prototype.getPhysicsPatchIndex = Hetti.prototype.getChildIndex;

Hetti.prototype.forEachPhysicsPatch = Hetti.prototype.forEachChild;

module.exports = Hetti;