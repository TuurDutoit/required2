var events = require("../events");
var clock = require("../clock");

var standards = {
}

events.on("loop:update:before", function(){
  console.log(clock.deltaTime.update);
              /// 1000 * 60);
});

module.exports = standards;