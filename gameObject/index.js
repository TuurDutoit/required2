renderer = require("../rederer")
var gameObject = function(name, position, dimensions){
    this.name = name;
    this.position = position;
    this.dimensions = dimensions;
    return this;
}
gameObject.prototype.update = function(){
}
gameObject.prototype.draw   = function(){
}
gameObject.prototype.move = function(V){
    this.position.add(V);
}
gameObject.prototype.distanceToGameObject = function(obj){
    return this.position.getDistanceTo(obj.position);
}
gameObject.prototype.distanceToGameObjectCubed = function(obj){
    return this.position.getDistanceToCubed(obj.position);
}

module.exports = gameObject;