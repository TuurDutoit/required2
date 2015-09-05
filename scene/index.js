var events = require("../events");


var Scene = function(name, sequence) {
  this.name = name;
  this.sequence = sequence;
  this.cameras = [];

  return this;
}

Scene.prototype.update = function(){
  for (i = 0; i < this.sequence.length; i++) {
    //console.log(this.sequence[i])
    this.sequence[i].update();
    this.sequence[i].fixedUpdate();
    //console.log(this.sequence[i]);
  }
}

Scene.prototype.draw = function(){
  for (i = 0, len = this.cameras.length; i < len; i++) {
    for (e = 0, len = this.sequence.length; e < len; e++) {
      this.sequence[e].draw(this.cameras[i]);
    }
  }
}

Scene.prototype.addObject = function(obj) {
  this.sequence.push(obj);
}

Scene.prototype.addCamera = function(camera) {
  this.cameras.push(camera);
}



module.exports = Scene;