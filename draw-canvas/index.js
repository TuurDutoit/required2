var Vector = require("../vector");
var events = require("../events");

var canvas = document.createElement('canvas');
canvas.width   = 300;
canvas.height  = 300;
var context	   = canvas.getContext("2d"); 

module.exports = {
  canvasDimensions: function(){
    return new Vector(canvas.width, canvas.height);
  },
  changeCanvasDimensions: function(D){
    canvas.width = D.x;
    canvas.height= D.y;
  },
  clearCanvas: function(){
    context.clearRect(0, 0, canvas.width, canvas.height);  
  },
  drawImage: function(image, position, dimensions, angle){
    if(angle){
      context.save(); 
      context.translate(position.x, position.y); 
      context.rotate(angle); 
      context.drawImage(image, 0, 0, dimensions.x, dimensions.y);
      context.restore();
    }
    else{
      context.drawImage(image, position.x, position.y, dimensions.x, dimensions.y);
    }
  },
  drawSprite: function(image, position, dimensions, angle, sheetPosition, sheetDimensions){
    if(angle){
      context.save(); 
      context.translate(position.x, position.y); 
      context.rotate(angle); 
      context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, 0, 0, dimensions.x, dimensions.y);
      context.restore();
    }
    else{
      context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, position.x, position.y, dimensions.x, dimensions.y);
    }
  },
  drawRectangle: function(position, dimensions, angle){
    if(angle){
      context.save(); 
      context.translate(position.x, position.y); 
      context.rotate(angle); 
      context.fillRect(0,0,dimensions.x, dimensions.y);  
      context.restore();
    }
    else{
      context.fillRect(position.x, position.y ,dimensions.x, dimensions.y);
    }
  },
  drawText: function(text, font, position, angle){
    context.font = font;
    console.log(angle);
    if(angle){
      context.save(); 
      context.translate(position.x, position.y); 
      context.rotate(angle); 
      context.fillText(text,0,0);
      context.restore();
    }
    else{
      context.fillText(text, position.x, position.y);
    }
  },
  DOMElement: canvas
};

events.on("loop:update:before", function(){
  context.clearRect(0, 0, canvas.width, canvas.height);  
});