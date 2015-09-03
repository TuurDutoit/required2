var updateLoop = require("../loop-update");
var drawLoop = require("../loop-draw");

module.exports = {
  start: function() {
    updateLoop.start();
    drawLoop.start();
  },
  pause: function() {
    updateLoop.pause();
    drawLoop.pause();
  },
  stop: function() {
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