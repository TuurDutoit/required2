var events = require("../events");


var Scene = function() {
  this.children = [];
  this.cameras = [];
  this.ids = {};
  this.classes = {};
  
  return this;
}

Scene.prototype.insertChild = function(child, index) {
  this.children.splice(index, 0, child);
  
  return this;
}

Scene.prototype.appendChild = function(child) {
  this.children.push(child);
  
  return this;
}

Scene.prototype.prependChild = function(child) {
  this.children.unshift(child);
  
  return this;
}

Scene.prototype.insertBefore = function(child, reference) {
  var index = this.getChildIndex(reference);
  
  if(index > -1) {
    this.children.insertChild(child, index);
  }
  
  return this;
}

Scene.prototype.insertAfter = function(child, reference) {
  var index = this.ghetChildIndex(reference);
  
  if(index > -1) {
    this.children.insertChild(child, index+1);
  }
  
  return this;
}

Scene.prototype.removeChild = function(child) {
  var index = this.getChildIndex(child);
  this.removeChildAt(index);
  
  return this;
}

Scene.prototype.removeChildAt = function(index) {
  if(index > -1) {
    this.children.splice(index, 1);
  }
  
  return this;
}

Scene.prototype.replaceChild = function(child, old) {
  var index = this.getChildIndex(old);
  
  if(index > -1) {
    this.splice(index, 1, child);
  }
  
  return this;
}

Scene.prototype.getChildIndex = function(child) {
  return this.children.indexOf(child);
}

Scene.prototype.forEachChild = function(cb) {
  for(var i = 0; i < this.children.length; i++) {
    cb(this.children[i], i, this.children);
  }
  
  return this;
}

Scene.prototype.forEachCamera = function(cb) {
  for(var i = 0; i < this.cameras.length; i++) {
    cb(this.cameras[i], i, this.cameras);
  }
  
  return this;
}

Scene.prototype.addCamera = function(camera){
  this.cameras.push(camera);
}


Scene.prototype.init = function() {
  this.forEachChild(function(child) {
    child.init();
  });
  
  return this;
}

Scene.prototype.update = function() {
  this.forEachChild(function(child) {
    child.update();
  });
  this.forEachCamera(function(camera){
    camera.update();
  });
  
  return this;
}

Scene.prototype.draw = function() {
  var self = this;
  self.forEachCamera(function(camera){
    self.forEachChild(function(child) {
      child.draw(camera);
    });
    camera.draw();
  });
  
  return this;
}

module.exports = Scene;



