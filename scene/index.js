var events = require("../events");
var GameObject = require("../game-object");
var util = require("../util");


var Scene = function() {
  GameObject.call(this);
  this.cameras = [];
  this.ids = {};
  this.classes = {};
  
  this.init();
  
  return this;
}

util.inherits(Scene, GameObject);


Scene.prototype.addCamera = function(camera) {
  this.cameras.push(camera);
  this.emit("camera:insert", [camera]);
  camera.emit("insert", [this]);
  
  return this;
}

Scene.prototype.removeCameraAt = function(index) {
  var camera = this.cameras[index];
  this.cameras.splice(index, 1);
  this.emit("camera:remove", [camera]);
  camera.emit("remove", [this]);
  
  return this;
}


Scene.prototype.forEachCamera = function(cb) {
  for(var i = 0, len = this.cameras.length; i < len; i++) {
    cb(this.cameras[i], i, this.cameras);
  }
  
  return this;
}


Scene.prototype._update = function() {
  this.emit("update");
  
  this.forEachChild(function(child) {
    child._update();
  });
  
  this.forEachCamera(function(camera){
    camera._update();
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



