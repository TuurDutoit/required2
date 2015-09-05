renderer = require("../renderer")
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
    //this.image.update();
    this.AI.update(this);
    return this;
}
gameObject.prototype.update = function(){
}
gameObject.prototype.draw   = function(){
    renderer.drawRectangle(this.position, this.dimensions);
}
gameObject.prototype.move = function(V){
    this.position.add(V);
    return this;
}
gameObject.prototype.distanceToGameObject = function(obj){
    return this.position.getDistanceTo(obj.position);
}
gameObject.prototype.distanceToGameObjectCubed = function(obj){
    return this.position.getDistanceToCubed(obj.position);
}

module.exports = gameObject;