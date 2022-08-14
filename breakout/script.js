var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
const canv = document.getElementById('mainDiv')
const strtbtn = document.getElementById('baba')
const a = document.getElementById('tictictic')
const wintxt = document.getElementById('win'),
ldtxt = document.getElementById('ld'),
rsltbxw = document.querySelector(".resultw"),
rsltbxld = document.querySelector(".resultld"),
strtbx = document.getElementById('strtbx'),
rbtnw = rsltbxw.querySelector("button");

strtbtn.onclick = () =>{
	canvas.style.display = 'flex'
	a.style.display = 'none'
	mt = setTimeout(startgame(), 3000)
}

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 50;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
stopid= null

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = {x: 0, y:0, status: 1};
	}
}

cl = [ 'white', 'black']

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				if (r == 0){
					ctx.fillStyle = '#EA2014';
				}else if (r ==1){
					ctx.fillStyle = '#4F6F23';
				}else if (r ==2){
					ctx.fillStyle = '#FD7F19';
				}else if (r ==3){
					ctx.fillStyle = '#FBB533';
				} else{
					ctx.fillStyle = '#498CA4';
				}
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#be2102";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status  == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						canv.style.display = 'none'
						localStorage.setItem('secondlevelcompleted', 'true')
						wintxt.innerHTML = 'You beat Galatron! <br> "Looks like I must start taking you seriously"'
						setTimeout(()=>{
							rsltbxw.classList.add("show");
						}, 700);
					}
				}
			}
		}
	}
}

function drawScore () {
	ctx.font = "16px pixel";
	ctx.fillStyle = "black";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
	ctx.font = "16px pixel";
	ctx.fillStyle = "#black";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBricks()
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if(y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
			if( lives == 0) {
				canv.style.display = 'none'
				rsltbxw.innerHTML = ' '
				ldtxt.innerHTML = 'You lost!'
				setTimeout(()=>{
					rsltbxld.classList.add("show");
				}, 700);
			} else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 5;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 5;
	}

	x += dx;
	y += dy;
	
	if (lives != 0 && score != 25){
		stopid = requestAnimationFrame(draw)
	}
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

function startgame(){
	draw();
}

rbtnw.onclick = ()=>{
	window.location.href = '../planets.html'
}