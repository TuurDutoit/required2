var renderEngines = {HTMLCanvas: require("../draw-canvas")}
var toLoad = "HTMLCanvas";
module.exports = renderEngines[toLoad];