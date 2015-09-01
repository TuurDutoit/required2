var canvas = document.createElement('canvas');
canvas.width   = 300;
canvas.height  = 300;
var context	   = canvas.getContext("2d"); 
module.exports = {
	changeCanvasDimensions(D){
		canvas.width = D.x;
		canvas.height= D.y;
	},
	drawImage: function(I, P, D, R){
	}
}