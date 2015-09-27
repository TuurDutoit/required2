var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var Hetti = function(physics){
  EventEmitter.call(this);
  
  this.appendPhysics(physics);
  
  return this;
}

util.inherits(Hetti, GameObject);

Hetti.prototype.init = function(){
  return this;
}

Hetti.prototype.update = function(){
  return this;
}

Hetti.prototype.draw = function(camera){
  return this;
}

Hetti.prototype.appendPhysics = Hetti.prototype.appendChild;

Hetti.prototype.appendPhysicses = Hetti.prototype.appendChildren;

Hetti.prototype.prependPhysics = Hetti.prototype.prependChild;

Hetti.prototype.insertPhysics = Hetti.prototype.insertChild;

Hetti.prototype.insertPhysicsAfter = Hetti.prototype.insertChildAfter;

Hetti.prototype.insertPhysicsAt = Hetti.prototype.insertChildAt;

Hetti.prototype.insertPhysicsBefore = Hetti.prototype.insertChildBefore;

Hetti.prototype.removePhysics = Hetti.prototype.removeChild;

Hetti.prototype.removePhysicsAt = Hetti.prototype.removeChildAt;

Hetti.prototype.replacePhysics = Hetti.prototype.replaceChild;

Hetti.prototype.getPhysics = Hetti.prototype.getChild;

Hetti.prototype.getPhysicsAt = Hetti.prototype.getChildAt;

Hetti.prototype.getPhysicsIndex = Hetti.prototype.getChildIndex;

Hetti.prototype.forEachPhysics = Hetti.prototype.forEachChild;

module.exports = Hetti;