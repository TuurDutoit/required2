var renderer = require("../renderer");


var gameObject = function(name, type, image, position, dimensions, depth, children, AI){
  this.name = name;
  this.type = type;
  this.image = image;
  this.position = position;
  this.dimensions = dimensions;
  this.depth = depth;
  this.children = children;
  this.AI = AI;

  return this;
}

gameObject.prototype.start = function() {
  
}

gameObject.prototype.fixedUpdate = function() {
  //this.image.update();
  this.AI.update(this);
  return this;
}

gameObject.prototype.addChild = function(name, child){
  if(this.children[name]){
    console.log("Space already occupied.");
  }
  else{
    this.children[name] = child;
  }
}

gameObject.prototype.update = function() {
  
}

gameObject.prototype.draw   = function() {
  renderer.drawRectangle(this.position, this.dimensions);
}

gameObject.prototype.move = function(V) {
  this.position.add(V);
  
  return this;
}

gameObject.prototype.distanceToGameObject = function(obj) {
  return this.position.getDistanceTo(obj.position);
}

gameObject.prototype.distanceToGameObjectCubed = function(obj) {
  return this.position.getDistanceToCubed(obj.position);
}



module.exports = gameObject;