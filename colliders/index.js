var Crash = require("./crash");
var events = require("../events");

Crash.onCollision(function(a, b, res, cancel) {
  events.emit("collision", [a, b, res, cancel]);
});

events.on("loop:update", function() {
  Crash.check();
});

events.on("loop:update:start", function() {
  Crash.checkAll();
});

module.exports = Crash;