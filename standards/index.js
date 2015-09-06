var standardSpeed = require("../standard-speed");
var events = require("../events");
var clock = require("../clock");

var standards = {
  speed: 0
};

events.on("loop:update:before", function(){
  standardSpeed.speed = clock.deltaTime.update / 1000 * 60;
  console.log(clock.deltaTime.update / 1000 * 60);
});

module.exports = standards;