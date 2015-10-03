var Vector = require("../vector");
var events = require("../events");

var canvas = document.createElement('canvas');
canvas.width   = 324;
canvas.height  = 324;
var context	   = canvas.getContext("2d"); 

var drawCanvas = {
  drawOnRotatedCanvas: function(position, angle, cb) {
    context.save(); 
    context.translate(position.x, position.y); 
    context.rotate(angle);
    cb();
    context.restore();
  },    
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
      drawCanvas.drawOnRotatedCanvas(position, angle, function(){
        context.drawImage(image, 0, 0, dimensions.x, dimensions.y);
      });
    }
    else{
      context.drawImage(image, position.x, position.y, dimensions.x, dimensions.y);
    }
  },
  drawSprite: function(image, sheetPosition, sheetDimensions, position, dimensions, angle){
    if(angle){
      drawCanvas.drawOnRotatedCanvas(position, angle, function(){ 
        context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, 0, 0, dimensions.x, dimensions.y);
      });
    }
    else{
      context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, position.x, position.y, dimensions.x, dimensions.y);
    }
  },
  drawRectangle: function(position, dimensions, angle){
    if(angle){
      drawCanvas.drawOnRotatedCanvas(position, angle, function(){
        context.fillRect(0,0,dimensions.x, dimensions.y);  
      });
    }
    else{
      context.fillRect(position.x, position.y ,dimensions.x, dimensions.y);
    }
  },
  drawText: function(text, position, size, angle, font, color){
    
    context.font = size.toString() +"px "+font;
    if(angle){
      drawCanvas.drawOnRotatedCanvas(position, angle, function(){
        context.fillText(text,0,0);
      }); 
    }
    else{
      context.fillText(text, position.x, position.y + size);
    }
  },
  DOMElement: canvas
};


events.on("loop:update:before", function(){
  drawCanvas.clearCanvas();  
});

module.exports = drawCanvas;
  
