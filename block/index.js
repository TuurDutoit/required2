var renderer = require("../renderer");
var Vector = require("../vector");
var Crash = require("../colliders");

var Block = function(name, id, texture, offset, dimensions, angle, solid) {
  this.texture = texture;
  this.id = id;
  this.offset = offset || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;

  this.solid = solid || false;
  
  return this;
}

Block.prototype.setCollider = function(collider){
  if(this._live) {
    if(this.collider) {
      this.collider.remove();
    }

    collider.insert();
  }
  
  this.collider = collider;
  //collider.setData(this);  
  collider.data = this;
  //console.log(collider.data);
  
  return this;
}

Block.prototype.init = function(position) {
  if(this.solid){
    this.setCollider(new Crash.Box(position, this.dimensions.x, this.dimensions.y));
    //console.log(position);
  }
  return this;
}

Block.prototype._init = function() {
  if(this.collider) {
    this.collider.insert();
  }
  
  return this;
}

Block.prototype.update = function() {
  
}

Block.prototype.draw = function(camera, position, angle) {
  camera.drawOnScreen(this.texture, position.add(this.offset), this.dimensions, this.angle + angle);
  
  return this;
}

Block.prototype.onCollision = function(collider, res, cancel) {
  //console.log(collider.data);
  //console.log("BLAAAAAAAA");
  return this;
}

module.exports = Block;