var canvas;
var canvasContext;

// Ball
var ballX = 50, ballSpeedX = 15;
var ballY = 50, ballSpeedY = 6;
const BALL_RADIUS = 10;

// Paddle
var paddleOneY = 250;
var paddleTwoY = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

// Score
var plOneScore = 0;
var plTwoScore = 0;

// Win
const WINNING_SCORE = 5;
var showingWinScreen = false;

// Net
const NET_THICKNESS = 2;

$(document).ready(function(){
	canvas = $("#gameCanvas")[0];
	canvasContext = canvas.getContext('2d');
	canvasContext.font = "15px Arial";  
	
	var framesPerSecond = 30;
	setInterval(function () {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	
	
	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = getMousePos(evt);
			paddleOneY = mousePos.y - (PADDLE_HEIGHT/2);
		});
		
	canvas.addEventListener('mousedown',
		function(evt) {
			if (showingWinScreen) {
				plOneScore = 0;
				plTwoScore = 0;
				showingWinScreen = false;
			}
		});
})

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	
	return {x: mouseX, y: mouseY};
}

function drawNet() {
	for (var i=0; i<canvas.height; i+=40) {
		colorRect(canvas.width/2-1, i, NET_THICKNESS, 20, 'white');
	}
}

function drawEverything() {
	// Fill the canvas with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	
	if (showingWinScreen) {
		canvasContext.fillStyle = 'white';
		if (plOneScore >= WINNING_SCORE) {
			canvasContext.fillText("Left Player Won!", 350, 200);
		} else if (plTwoScore >= WINNING_SCORE) {
			canvasContext.fillText("Right Player Won!", 350, 200);
		}
		canvasContext.fillText("Click to continue.", 350, 500);
		return;
	}
	
	drawNet();
	
	// Draw left player paddle
	colorRect(0, paddleOneY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	// Draw right player paddle
	colorRect(canvas.width-PADDLE_THICKNESS, paddleTwoY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	// Draw the ball
	colorCircle(ballX, ballY, BALL_RADIUS, 'white');
	
	// Draw player scores
	canvasContext.fillText(plOneScore, 100, 100);
	canvasContext.fillText(plTwoScore, canvas.width-100, 100);
}

function resetBall() {
	if (plOneScore >= WINNING_SCORE || plTwoScore >= WINNING_SCORE) {
		showingWinScreen = true;
	}

	// Change direction, Center the ball
	ballSpeedX *= -1;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function paddleTwoMovement() {
	var paddleTwoYCenter = paddleTwoY + (PADDLE_HEIGHT/2);
	if(paddleTwoYCenter < ballY-35) {
		paddleTwoY += 6;
	} else if(paddleTwoYCenter > ballY+35) {
		paddleTwoY -= 6;
	}
}

function moveEverything() {
	if (showingWinScreen) {
		return;
	}

	paddleTwoMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	if (ballX < 0) {
		// If contact w/ left paddle, change directions
		if (ballY > paddleOneY && ballY < paddleOneY+PADDLE_HEIGHT) {
			ballSpeedX *= -1;
			
 			// Add angulation depending on where the ball contacts the paddle
			var deltaY = ballY - (paddleOneY+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}
		else {
			plTwoScore++;	// must be BEFORE ball resets
			resetBall();
		}
	}
	if (ballX > canvas.width) {
		// If contact w/ right paddle, change directions
		if (ballY > paddleTwoY && ballY < paddleTwoY+PADDLE_HEIGHT) {
			ballSpeedX *= -1;
			
 			// Add angulation depending on where the ball contacts the paddle
			var deltaY = ballY - (paddleTwoY+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}
		else {
			plOneScore++;	// must be BEFORE ball resets
			resetBall();
		}
	}
	if (ballY > canvas.height || ballY < 0) {
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