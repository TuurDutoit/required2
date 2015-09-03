var toLoad = "draw-canvas";
var Vector = require("../Vector");
var renderEngine = require("../"+toLoad);
//renderEngine.prototype.drawGameObject = function(obj, camera){}
renderEngine.prototype.drawTerrain = function(terrain, camera){
    for (y = terrain.length; y > 0; --y) {
        for (x = 0; x < terrain.lenght; ++x) {
            
        }
    }
}
module.exports = renderEngine;