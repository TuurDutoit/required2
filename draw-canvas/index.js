Vector = require("../vector");
var canvas = document.createElement('canvas');
canvas.width   = 300;
canvas.height  = 300;
var context	   = canvas.getContext("2d"); 
module.exports = {
    canvasDimensions: function(){
        return Vector(canvas.width, canvas.height);
    },
	changeCanvasDimensions: function(D){
		canvas.width = D.x;
		canvas.height= D.y;
	},
	drawImage: function(image, position, dimensions, rotation){
        context.drawImage(image, position.x, position.y, dimensions.x, dimensions.y);
	},
    drawSprite: function(image, sheetPosition, sheetDimensions, position, dimensions, rotation){
        context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, position.x, posiyion.y, dimensions.x, dimensions.y);
}