var clock = require("../clock");
var events = require("../events");
var util = require("util");


var ColliderCollection = function(colliders) {
  this.addChildren(colliders);
  EventEmitter.apply(this, arguments);
  
  return this;
}

util.inherits(ColliderCollection, GameObject);

ColliderCollection.prototype.insert = function() {
  this.forEachChild(function(child){
    child.insert();
  });
}

ColliderCollection.prototype.update = function() {
  return this;
}


module.exports = ColliderCollection;