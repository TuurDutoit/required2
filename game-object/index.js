var Vector = require("../vector");
var EventEmitter = require("../event-emitter");
var events = require("../events");
var util = require("../util");
var Crash = require("../colliders");

var rmove = /^move:/;
var rrotate = /^rotate:/;
var rchild = /^child:/;




var GameObject = function(position, dimensions, angle) {
  EventEmitter.call(this);
  this.position = position || new Vector();
  this.dimensions = dimensions|| new Vector(1,1);
  this.angle = angle || 0;
  this.children = [];
  this.parent = null;
  this.collider = null;
  this._live = false;
  
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

util.inherits(GameObject, EventEmitter);


GameObject.prototype.moveBy = GameObject.prototype.move = function(v, moveCollider){
  /**if(moveCollider !== false && this.collider) {
    this.collider.moveBy(v);
  }**/
  
  this.collider.moveBy(v.x, v.y);
  this.position.add(v);
  
  this.emit("move:by", [v]);
  
  return this;
}

GameObject.prototype.moveAlongAngle = function(v) {
  
  
  this.collider.moveBy(v.clone().rotate(this.angle).x, v.clone().rotate(this.angle).y);
  this.position.add(v.clone().rotate(this.angle));
  
  return this;
}

GameObject.prototype.moveTo = function(v, moveCollider) {
  if(moveCollider !== false && this.collider) {
    var relative = this.absoluteToRelativePosition(this.collider.pos);
    collider.moveTo(v.add(relative));
  }
  
  this.position.copy(v);
  this.emit("move:to", [v]);
  
  return this;
}

GameObject.prototype.moveToBy = function(v, speed) {
  this.position.add(v.clone().sub(this.position).normalize().multiply(speed));
  //this.move(v.clone().sub(this.position).normalize().multiply(speed));
  
  return this;
}
              
GameObject.prototype.rotateBy = GameObject.prototype.rotate = function(angle, moveCollider) {
  if(moveCollider !== false && this.collider && this.collider.setAngle) {
    var diff = this.collider.angle - this.angle;
    this.collider.setAngle(this.collider.angle + angle);
  }
  
  this.angle += angle;
  
  /**this.emit("rotate:by", [angle]);**/
  
  return this;
}

GameObject.prototype.rotateTo = function(angle, moveCollider) {
  if(moveCollider !== false && this.collider && this.collider.setAngle) {
    var diff = this.collider.angle - this.angle;
    this.collider.setAngle(angle + diff);
  }
  
  this.angle = angle;
  /**
  this.emit("rotate:to", [angle]);**/
  
  return this;
}

GameObject.prototype.rotateAround = function(v, angle, moveCollider) {
  this.position.rotateAround(v, angle)
  
  this.rotate(angle);
  // moves collider, if necessary, and emits move:to, move and change events
  /**this.moveTo(pos, moveCollider);
  this.rotateBy(angle, moveCollider);
  this.emit("rotate:around", [v, angle]);**/
  
  return this;
}

GameObject.prototype.rotateAroundMiddle = function(angle) {
  this.rotateAround(this.getMiddle(), angle);
  
  return this;
}

GameObject.prototype.rotateAroundOrigin = function(angle) {
  this.rotateAround(new Vector(), angle);
  
  return this;
}

GameObject.prototype.getMiddle = function(){
  //console.log(this.dimensions.clone().divide(2).add(this.absolutePosition()).rotateAround(this.absolutePosition(), this.angle));
  return this.dimensions.clone().divide(2).add(this.absolutePosition()).rotateAround(this.absolutePosition(), this.angle);
}

GameObject.prototype.absolutePosition = function() {
  return this.relativeToAbsolutePosition(this.position);
}

GameObject.prototype.relativeToAbsolutePosition = function(v) {
  if(this.parent){
    return this.parent.absolutePosition().clone().add(v);
  }
  else{
    return v.clone();
  }
}

GameObject.prototype.absoluteToRelativePosition = function(v) {
  return v.clone().sub(this.absolutePosition());
}

GameObject.prototype.absoluteAngle = function() {
  if(this.parent){
    return this.parent.absoluteAngle() + this.angle;
  }
  else{
    return this.angle;
  }
}

GameObject.prototype.relativeToAbsoluteAngle = function(angle) {
  return this.parent.absoluteAngle() + angle;
}

GameObject.prototype.absoluteToRelativeAngle = function(angle) {
  return angle - this.absoluteAngle();
}


GameObject.prototype.setPhysics = function(physics){
  physics.setObject(this);
  this.physics = physics;
  
  return this;
}

GameObject.prototype.setParent = function(parent){ 
  this.parent = parent;
  
  return this;
}

GameObject.prototype.insertChild = GameObject.prototype.insertChildAt = function(child, index) {
  if(!this.children){
    this.children = [];
  }
  
  child.setParent(this);
  this.children.splice(index, 0, child);
  this.emit("child:insert", [child, index]);
  child._init();
  
  return this;
}

GameObject.prototype.appendChild = function(child) {
  if(!this.children){
    this.children = [];
  }
  
  child.setParent(this);
  this.children.push(child);
  this.emit("child:insert:append", [child]);
  this.emit("child:insert", [child, this.children.length - 1]);
  child._init();
  
  return this;
}

GameObject.prototype.appendChildren = function(children) {
  for(var i = 0; i < children.length; i++) {
    this.appendChild(children[i]);
  }
}

GameObject.prototype.prependChild = function(child) {
  if(!this.children){
    this.children = [];
  }
  child.addParent(this);
  this.children.unshift(child);
  this.emit("child:insert:prepend", [child]);
  this.emit("child:insert", [child, 0]);
  child._init();
  
  return this;
}

GameObject.prototype.insertChildBefore = function(child, reference) {
  var index = this.getChildIndex(reference);
  
  if(index > -1) {
    this.insertChild(child, index);
    this.emit("child:insert:before", [child, reference, index]);
    this.emit("child:insert", [child, index]);
    child._init();
  }
  
  return this;
}

GameObject.prototype.insertChildAfter = function(child, reference) {
  var index = this.ghetChildIndex(reference);
  
  if(index > -1) {
    this.insertChild(child, index+1);
    this.emit("child:insert:after", [child, reference, index]);
    this.emit("child:insert", [child, index]);
    child._init();
  }
  
  return this;
}

GameObject.prototype.removeChild = function(child) {
  var index = this.getChildIndex(child);
  this.removeChildAt(index);
  child._destroy();
  
  return this;
}

GameObject.prototype.removeChildAt = function(index) {
  if(index > -1) {
    var child = this.children[index];
    this.children.splice(index, 1);
    this.emit("child:remove", [child, index]);
    child._destroy();
  }
  
  return this;
}

GameObject.prototype.replaceChild = function(child, old) {
  var index = this.getChildIndex(old);
  
  if(index > -1) {
    this.children.splice(index, 1, child);
    this.emit("child:replace", [child, old, index]);
    this.emit("child:remove", [old, index]);
    this.emit("child:insert", [child, index]);
    child._init();
    old._destroy();
  }
  
  return this;
}

GameObject.prototype.getChildIndex = function(child) {
  return this.children.indexOf(child);
}

GameObject.prototype.getChildAt = GameObject.prototype.getChild = function(index) {
  return this.children[index];
}

GameObject.prototype.forEachChild = function(cb) {
  if(this.children) {
    for(var i = 0; i < this.children.length; i++) {
      cb(this.children[i], i, this.children);
    }
  }
  
  return this;
}




GameObject.prototype.onCollision = function(collider, res, cancel) {
  return this;
}

GameObject.prototype.setCollider = function(collider) {
  
  /**collider.pos.sub(new Vector(-1,-1));
  collider.aabb.x2 += 2;
  collider.aabb.y2 += 2;**/
  
  if(this._live) {
    if(this.collider) {
      this.collider.remove();
    }
    
    collider.insert();
  }
  
  this.collider = collider;
  collider.setData(this);
  
  
  return this;
}







GameObject.prototype.init = function() {
  return this; 
}

GameObject.prototype._init = function() {
  this._live = true;
  
  if(this.init) {
    this.init();
  }
  
  if(this.collider) {
    this.collider.insert();
  }
  
  this.forEachChild(function(child) {
    child._init();
  });
  
  return this;
}

GameObject.prototype._update = function() {
  if(this.update) {
    this.update();
  }
  
  this.forEachChild(function(child) {
    child._update();
  });
  
  return this;
}

GameObject.prototype.update = function() {
  return this;
}

GameObject.prototype._destroy = function() {
  this._live = false;
  
  if(this.destroy) {
    this.destroy();
  }
  
  if(this.collider) {
    this.collider.remove();
  }
  
  this.forEachChild(function(child) {
    child._destroy();
  });
  
  return this;
}

GameObject.prototype.destroy = function() {
  return this;
}

GameObject.prototype.draw = function(camera) {
  if(this.image){
    camera.drawOnScreen(this.image, this.position, this.dimensions, this.angle);
  }
  return this;
}




module.exports = GameObject;