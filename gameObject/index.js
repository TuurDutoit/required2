renderer = require("../rederer")
var gameObject = function(name, type, image, position, dimensions, AI){
    this.name = name;
    this.type = type;
    this.image = image;
    this.position = position;
    this.dimensions = dimensions;
    this.AI = AI;
    
    return this;
}
gameObject.prototype.fixedUpdate = function(){
    this.image.update();
    this.AI.update();
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