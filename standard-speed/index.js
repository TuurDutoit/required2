var events = require("../events");
var clock = require("../clock");
var renderer = require("../renderer");
var Vector = require("../vector");

var standardSpeed = {
  speed: 0
}

events.on("loop:update:before", function(){
  standardSpeed.speed = clock.deltaTime.update / 1000 * 60;
  console.log(clock.deltaTime.update / 1000 * 60);
});

module.exports = standardSpeed;