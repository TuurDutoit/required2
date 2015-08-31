var updateLoop = require("loop-update");
var drawLoop = require("loop-draw");

module.exports = {
  start: function() {
    updateLoop.start();
    drawLoop.start();
  },
  start: function() {
    updateLoop.pause();
    drawLoop.pause();
  },
  start: function() {
    updateLoop.stop();
    drawLoop.stop();
  },
  updateFps: function(val) {
    updateLoop.fps(val);
  },
  drawFps: function(val) {
    drawLoop.fps(val);
  }
}