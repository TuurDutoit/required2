var Vector = require("../vector");
var events = require("../events");

var canvas = document.createElement('canvas');
canvas.width   = 324;
canvas.height  = 324;
context	   = canvas.getContext("2d"); 

var drawCanvas = {
  drawOnRotatedCanvas: function(position, angle, cb) {
    context.save(); 
    context.translate(position.x, position.y); 
    context.rotate(angle);
    cb();
    context.restore();
  },
  canvasPosition: new Vector(),
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
  rotateCanvasAround: function(v, angle){
    drawCanvas.moveCanvas(v.clone().scale(1));
    context.rotate(angle);
    drawCanvas.moveCanvas(v.clone().scale(-1));
  },
  rotateCanvas: function(angle){
    //drawCanvas.canvasPosition.rotateAround(drawCanvas.canvasPosition, angle);
    context.rotate(angle);
  },
  scaleCanvas: function(v){
    context.scale(v.x, v.y);
  },
  setPosition: function(v) {
    context.translate(v.x, v.y);
  },
  moveCanvas: function(v) {
    context.transform(1,0,0,1,v.x,v.y);
    //drawCanvas.canvasPosition.add(v);
    //drawCanvas.setPosition(v);
  },
  saveCanvas: function() {
    context.save();
  },
  restoreCanvas: function() {
    context.restore();
    //drawCanvas.canvasPosition = new Vector();
  },
  DOMElement: canvas
};


events.on("loop:update:before", function(){
  drawCanvas.clearCanvas();  
});

module.exports = drawCanvas;
  
