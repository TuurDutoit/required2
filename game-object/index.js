var Vector = require("../vector");
var EventEmitter = require("../event-emitter");
var events = require("../events");
var util = require("../util");

var rmove = /^move:/;
var rrotate = /^rotate:/;
var rchild = /^child:/;




var GameObject = function(position, dimensions, angle) {
  EventEmitter.call(this);
  this.position = position || new Vector();
  this.dimensions = dimensions|| new Vector();
  this.angle = angle || 0;
  this.children = [];
  this.parent = null;
  this.collider = null;
  
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
  });
  
  this._init();
  
  return this;
}

util.inherits(GameObject, EventEmitter);




GameObject.prototype.moveBy = GameObject.prototype.move = function(v, moveCollider){
  if(moveCollider !== false && this.collider) {
    this.collider.moveBy(v);
  }
  
  this.position.add(v);
  this.emit("move:by", [v]);
  
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

GameObject.prototype.rotateBy = GameObject.prototype.rotate = function(angle, moveCollider) {
  if(moveCollider !== false && this.collider && this.collider.setAngle) {
    var diff = this.collider.angle - this.angle;
    this.collider.setAngle(this.collider.angle + angle);
  }
  
  this.angle += angle;
  this.emit("rotate:by", [angle]);
  
  return this;
}

GameObject.prototype.rotateTo = function(angle, moveCollider) {
  if(moveCollider !== false && this.collider && this.collider.setAngle) {
    var diff = this.collider.angle - this.angle;
    this.collider.setAngle(angle + diff);
  }
  
  this.angle = angle;
  this.emit("rotate:to", [angle]);
  
  return this;
}

GameObject.prototype.rotateAround = function(v, angle, moveCollider) {
  var pos = this.position;
  this.position.rotateAround(v, angle)
  
  // moves collider, if necessary, and emits move:to, move and change events
  this.moveTo(pos, moveCollider);
  this.rotateBy(angle, moveCollider);
  this.emit("rotate:around", [v, angle]);
  
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
  return this.dimensions.clone().divide(2).add(this.position).rotateAround(this.position, this.angle);
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





GameObject.prototype.insertAt = function(parent, index) {
  parent.insertChildAt(this, index);
  
  return this;
}

GameObject.prototype.appendTo = function(parent) {
  parent.appendChild(this);
  
  return this;
}

GameObject.prototype.prependTo = function(parent) {
  parent.prependChild(this);
  
  return this;
}

GameObject.prototype.insertBefore = function(sibling) {
  if(sibling.parent) {
    sibling.parent.insertChildBefore(this, sibling);
  }
  
  return this;
}

GameObject.prototype.insertAfter = function(sibling) {
  if(sibling.parent) {
    sibling.parent.insertChildAfter(this, sibling);
  }
  
  return this;
}

GameObject.prototype.insertSiblingBefore = function(sibling) {
  if(this.parent) {
    this.parent.insertChildBefore(sibling, this);
  }
  
  return this;
}

GameObject.prototype.insertSiblingAfter = function(sibling) {
  if(this.parent) {
    this.parent.insertChildAfter(sibling, this);
  }
  
  return this;
}






GameObject.prototype.insertChild = GameObject.prototype.insertChildAt = function(child, index) {
  if(!this.children){
    this.children = [];
  }
  this.children.splice(index, 0, child);
  this.emit("child:insert", [child, index]);
  child.emit("insert", [this, index]);
  
  return this;
}

GameObject.prototype.appendChild = function(child) {
  if(!this.children){
    this.children = [];
  }
  child.parent = this;
  this.children.push(child);
  
  var index = this.children.length - 1;
  this.emit("child:insert:append", [child]);
  this.emit("child:insert", [child, index]);
  child.emit("insert:append", [this]);
  child.emit("insert", [this, index]);
  
  return this;
}

GameObject.prototype.prependChild = function(child) {
  if(!this.children){
    this.children = [];
  }
  this.children.unshift(child);
  this.emit("child:insert:prepend", [child]);
  this.emit("child:insert", [child, 0]);
  child.emit("insert:prepend", [this]);
  child.emit("insert", [this, 0]);
  
  return this;
}

GameObject.prototype.insertChildBefore = function(child, sibling) {
  var index = this.getChildIndex(sibling);
  
  if(index > -1) {
    this.insertChild(child, index);
    this.emit("child:insert:before", [child, sibling, index]);
    this.emit("child:insert", [child, index]);
    child.emit("insert:before", [this, sibling, index]);
    child.emit("insert", [this, index]);
  }
  
  return this;
}

GameObject.prototype.insertChildAfter = function(child, sibling) {
  var index = this.ghetChildIndex(sibling);
  
  if(index > -1) {
    this.insertChild(child, index+1);
    this.emit("child:insert:after", [child, sibling, index]);
    this.emit("child:insert", [child, index]);
    child.emit("insert:after", [this, sibling, index]);
    child.emit("insert", [this, index]);
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
    var child = this.children[index];
    this.children.splice(index, 1);
    this.emit("child:remove", [child, index]);
    child.emit("remove", [this, index]);
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
    old.emit("replace-by", [this, child, index]);
    old.emit("remove", [this, index]);
    child.emit("replace", [this, old, index]);
    child.emit("insert", [this, index]);
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




GameObject.prototype._appear = function() {
  this.emit("appear");
  
  this.forEachChild(function(child) {
    child._appear();
  });
  
  return this;
}

GameObject.prototype._disappear = function() {
  this.emit("disappear");
  
  this.forEachChild(function(child) {
    child._disappear();
  });
  
  return this;
}

GameObject.prototype._init = function() {
  this.emit("init");
  
  this.forEachChild(function(child) {
    child._init();
  });
}

GameObject.prototype._destroy = function(children) {
  this.emit("destroy");
  
  if(children !== false) {
    this.forEachChild(function(child) {
      child._destroy();
    });
  }
  
  return this;
}

GameObject.prototype._update = function() {
  this.emit("update");
  
  this.forEachChild(function(child) {
    child._update();
  });
  
  return this;
}

module.exports = GameObject;