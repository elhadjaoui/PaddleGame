
var canvas;
var canvasContext;


var ballX = 50;
var ballXSpeed = 2;
var ballY = 50;
var ballYSpeed = 2;

var paddel1Y = 250;
var paddel2Y = 250;

const PADDEL_HEIGHT = 100;
const PADDEL_TICKNESS = 10;

var scorePlayer1 = 0;
var scorePlayer2 = 0;


function calculateMousePosition(event)
{
    
    var rectangle = canvas.getBoundingClientRect();
    var root  = document.documentElement;

    var mousex = event.clientX - rectangle.left - root.scrollLeft;
    var mousey = event.clientY - rectangle.top - root.scrollTop;
    return {
        x:mousex,
        y:mousey
    };
}
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framepers = 30;

    setInterval(() => {
        moveeverything();
        draweverything();
    }, 1000 / framepers);
canvas.addEventListener('mousemove',function(event)
{
    var mousePos = calculateMousePosition(event);
    paddel1Y = mousePos.y - (PADDEL_HEIGHT/2);
})

}

function resetBall()
{
    ballXSpeed *= -1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function ComputerMovement()
{
    paddel2YCenter = paddel2Y + (PADDEL_HEIGHT/2);
        if (paddel2YCenter < ballY - 35)
        {
            paddel2Y += 10;
        }
        else if (paddel2YCenter > ballY + 35)
        paddel2Y -= 10;
}


function moveeverything() {

    ComputerMovement();

    ballX += 5 * ballXSpeed;
    ballY += 5 * ballYSpeed;

    // for X
    if (ballX <= 0)
    {
       
        if (ballY >= paddel1Y && ballY <= paddel1Y + (PADDEL_HEIGHT))
            ballXSpeed *= -1;
        else
        {
            resetBall();
            scorePlayer1++;
        }
       
    }
       
    if (ballX >= canvas.width)
    {
        if (ballY >= paddel2Y && ballY <= paddel2Y + (PADDEL_HEIGHT))
            ballXSpeed *= -1;
        else
        {
            resetBall();
            scorePlayer1++;
        }
    }
        
    //  for Y
    if (ballY <= 0)
        ballYSpeed *= -1;
    if (ballY >= canvas.height)
        ballYSpeed *= -1;
}
function drawShape(leftX, topY, width, heigth, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, heigth);
}
function drawballX(leftX, topY, color, raduis) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(leftX, topY, raduis, 0, 2 * Math.PI, true);
    canvasContext.fill();
}
function draweverything() {
   

    // board
    drawShape(0, 0, canvas.width, canvas.height, 'black');
    
    //ball
    drawballX(ballX, ballY, 'red', 10);
    //right paddel
    drawShape(canvas.width - PADDEL_TICKNESS, paddel2Y, PADDEL_TICKNESS, PADDEL_HEIGHT, '#FFE9A0');
    //left paddel
    drawShape(0, paddel1Y, PADDEL_TICKNESS, PADDEL_HEIGHT , '#FFE9A0');
    // scores 
    canvasContext.fillStyle = 'white';
    canvasContext.font = "30px Comic Sans MS";
    canvasContext.fillText(scorePlayer2,100,100);
    canvasContext.fillText(scorePlayer1,canvas.width - 100,100);

}
