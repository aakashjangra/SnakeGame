let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
let snakeX;
let snakeY;
let snakeBody = [];
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let gameOver = false;

window.onload = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    snakeX = getRandom(cols - 1) * blockSize;
    snakeY = getRandom(rows - 1) * blockSize;
    placeFood();
    
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/10); //recall every 100ms -> 10 times in 1 sec
}

const update = () => {
    if(gameOver){
        snakeBody = [];
        snakeX = getRandom(cols - 1) * blockSize;
        snakeY = getRandom(rows - 1) * blockSize;
        velocityX = 0;
        velocityY = 0;
        gameOver = false;
    }
    context.fillStyle = "blue";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    //snake eats food
    if( snakeX == foodX && snakeY == foodY ){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game Over conditions
    if(snakeX  < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over!");
    }
    for(let i = 0; i<snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over!");
        }
    }
}

const getRandom = (x) => {
    return Math.floor(Math.random() * (x + 1));
};

const placeFood = () => {
    foodX = getRandom(cols - 1) * blockSize;
    foodY = getRandom(rows - 1) * blockSize;
}

const changeDirection = (e) => {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}