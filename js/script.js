var canvas;
var canvasContext;
var ballX = 50;

$(document).ready(function(){
	canvas = $("#gameCanvas")[0];
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(function () {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
})


function drawEverything() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(0,210,10,100);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(ballX,100,10,10);
}

function moveEverything() {
	ballX += 10;
}