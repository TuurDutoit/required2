var events = require("../events");
var clock = require("../clock");
var renderer = require("../renderer");
var Vector = require("../vector");
var standards = {
}

events.on("loop:update:before", function(){
  //console.log(clock.deltaTime.update / 1000 * 60);
  //console.log(clock.deltaTime.update);
  renderer.drawText(clock.deltaTime.update, "20px Georgia", new Vector(0,90));
});

module.exports = standards;