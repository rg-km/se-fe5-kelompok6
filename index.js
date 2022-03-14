const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
};
const MOVE_INTERVAL = 150;

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
};

let snakelife = 0;
let snakelevel = 0;

var audio = new Audio('asset/game-over.mp3');

let img = new Image();
img.src = 'asset/apple.png';

let imghead = new Image();
imghead.src = 'asset/snakehead.png';

let imgbody = new Image();
imgbody.src = 'asset/snakebody.png';

let imgtail = new Image();
imgtail.src = 'asset/snaketail.png';

let imglife = new Image();
imglife.src = 'asset/diamond.png';

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
let snake1 = initSnake("purple");

let life = {
    position: initPosition(),
}

let apple1 = {
    position: initPosition(),
};

let apple2 = {
    position: initPosition(),
};

function drawCell(ctx, x, y) {
    ctx.drawImage(imghead, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCellbody(ctx, x, y) {
    ctx.drawImage(imgbody, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCelltail(ctx, x, y) {
    ctx.drawImage(imgtail, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApple(ctx, x, y) {
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } 
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawLevel(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score2Board");
    } 
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snakelevel, 10, scoreCanvas.scrollHeight / 2);
}

function drawlife(imglife, snake) {
    var lifeSize = 30;
    var lifeX = 40;
    
    let infoCanvas = document.getElementById("lifeBoard");
    let infoCtx = infoCanvas.getContext("2d");

    infoCtx.clearRect(0, 0, 50, 50)
    infoCtx.font = '30px Arial'
    infoCtx.fillStyle = snake.color
    for (var i = 0; i < snakelife; i++) {
        infoCtx.drawImage(imglife, lifeX * i + 10, 10, lifeSize, lifeSize);
    }
}

function draw() {
    setInterval(function () {
        let snakeCanvas = document.getElementById('snakeBoard');
        let ctx = snakeCanvas.getContext('2d');

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            if (i == snake1.body.length - 1) {
                drawCelltail(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            } else {
                drawCellbody(ctx, snake1.body[i].x, snake1.body[i].y, 'red');
            }
        }

        if(isPrime(snake1.score)) {
            ctx.drawImage(imglife, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        //apple
        drawApple(ctx, apple1.position.x, apple1.position.y);
        drawApple(ctx, apple2.position.x, apple2.position.y);

        drawScore(snake1);
        drawLevel(snake1);
        drawlife(imglife, snake1);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        if (snake.score % 5 === 0) {
            snakelife++;
            snakelevel++;
        }
    }
    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        if (snake.score % 5 === 0) {
            snakelife++;
            snakelevel++;
        }
    }
    if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
        life.position = initPosition();
        snakelife++;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        //audio.play();
        snakelife = snakelife - 1;
        snakelevel = 0;
        //alert("Game over");aadssdw
        snake1 = initSnake("purple");
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

initGame();