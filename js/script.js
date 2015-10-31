var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 25;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;

$(document).ready(function(){
	canvas = $("#gameCanvas")[0];
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(function () {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	
	
	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = getMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});
})

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	
	return {x: mouseX, y: mouseY};
}

function drawEverything() {
	// Fill the canvas with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	
	// Draw left player paddle
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	// Draw right player paddle
	colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	// Draw the ball
	colorCircle(ballX, ballY, 10, 'white');
	
	// Draw player scores
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function resetBall() {
	// Change direction, Center the ball
	ballSpeedX *= -1;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY-35) {
		paddle2Y += 6;
	} else if(paddle2YCenter > ballY+35) {
		paddle2Y -= 6;
	}
}

function moveEverything() {
	computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	if (ballX < 0) {
		// If contact w/ left paddle, change directions
		if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX *= -1;
		}
		else {
			resetBall();
			player2Score++;
		}
	}
	if (ballX > canvas.width) {
		// If contact w/ right paddle, change directions
		if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX *= -1;
		}
		else {
			resetBall();
			player1Score++;
		}
	}
	if (ballY < 0 || ballY > canvas.height) {
		ballSpeedY *= -1;
	}
}

function colorRect(leftX, topY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height, color);
}

function colorCircle(centerX, centerY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}