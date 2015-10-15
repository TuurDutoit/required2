var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var renderer = require("../renderer");
var Sprite = require("../sprite");

var DeathBarrier = function(collider) {
  GameObject.call(this);
  
  this.setCollider(collider);
  this.position = collider.pos || new Vector();
  this.dimensions = new Vector(this.collider.aabb.x2, this.collider.aabb.y2);
  //|| new Vector();
  this.angle = 0;
  console.log(this.collider);
  this.image = new Sprite("tileset2", new Vector(16*0, 16*2), new Vector(16,16));
  return this;
}

util.inherits(DeathBarrier, GameObject);

DeathBarrier.prototype.draw = function(camera) { 
  //console.log(this.dimensions);
  //camera.drawOnScreen(this.image, this.position.clone(), this.dimensions, this.angle);

  return this;
}

DeathBarrier.prototype.onCollision = function(collider, res, cancel) {
  
  if(!collider.data.survivesDeathBarrier){
    console.log("Object should have been killed!");
  }
  
  return this;
}

module.exports = DeathBarrier;