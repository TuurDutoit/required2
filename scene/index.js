var events = require("../events");
var Scene = function(name, sequence){
    this.name = name;
    this.sequence = sequence;
    this.cameras = []
    
    return this;
}
Scene.prototype.update = function(){
    for (i = 0; i < this.sequence.lenght; ++i) {
        this.sequence[i].update();
    }
}
Scene.prototype.addCamera = function(camera){
    this.cameras.push(camera);
}
events.on("loop:draw", function() {
  for (i = 0; i < this.sequence.lenght; ++i) {
      
  }
});
module.exports = Scene;