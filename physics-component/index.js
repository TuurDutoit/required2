var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");
var standards = require("../standards");

var PhysicsComponent = function(physics){
  GameObject.call(this);
  
  return this;
}

util.inherits(PhysicsComponent, GameObject);

PhysicsComponent.prototype.addParent = function(parent) {
  this.parent = this.physics = parent;
  this.object = this.parent.parent;
  
  return this;
}

PhysicsComponent.prototype.init = function(){
  return this;
}

PhysicsComponent.prototype.update = function(){
  this.physics.accelerate(standards.g);
  
  return this;
}

PhysicsComponent.prototype.draw = function(camera){
  return this;
}

module.exports = PhysicsComponent;