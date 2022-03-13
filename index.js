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
 life-and-level

const OBSTACLE = {
    sizex: 50,
    sizey: 200,
    width: 300,
    height: 20,
    color: "black",
};

let OBSTACLE_LIST = []
function drawObstacle(ctx, obstacle) {
    for (let i = 0; i < obstacle.length; i++) {
        ctx.fillStyle = OBSTACLE.color;
        ctx.fillRect(obstacle[i].x, obstacle[i].y, OBSTACLE.width, OBSTACLE.height);
    }
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
};

let MOVE_INTERVAL = 100;

var audio = new Audio('asset/game-over.mp3');

let snakelife = 0;
let snakelevel = 0;

let img = new Image();
img.src = 'asset/apple.png';

let imglife = new Image();
imglife.src = 'asset/diamond.png';

=======
const MOVE_INTERVAL = 100;

var audio = new Audio('asset/game-over.mp3');

let img = new Image();
img.src = 'asset/apple.png';

 head-and-body
let imghead = new Image();
imghead.src = 'asset/snakehead.png';

let imgbody = new Image();
imgbody.src = 'asset/snakebody.png';

let imgtail = new Image();
imgtail.src = 'asset/snaketail.png';


 main
 main
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
 life-and-level
    };
}
let snake1 = initSnake("purple");

let life = {
    position: initPosition(),
}


    }
}
let snake1 = initSnake("purple");

 main
let apple1 = {
	position: initPosition(),
};

let apple2 = {
	position: initPosition(),
};

 life-and-level
function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

 head-and-body
function drawCell(ctx, x, y) {
    ctx.drawImage(imghead, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCellbody(ctx, x, y) {
    ctx.drawImage(imgbody, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCelltail(ctx, x, y) {
    ctx.drawImage(imgtail, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
 main
 main
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

 life-and-level
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

function snakeLevel(snakes) {
    if (snakelevel === 1) {
        MOVE_INTERVAL = MOVE_INTERVAL - 50;
    };
}


 main
function draw() {
	setInterval(function () {
		let snakeCanvas = document.getElementById('snakeBoard');
		let ctx = snakeCanvas.getContext('2d');

		ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

		drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
		for (let i = 1; i < snake1.body.length; i++) {
			if (i == snake1.body.length - 1) {
life-and-level
				drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
			} else {
				drawCell(ctx, snake1.body[i].x, snake1.body[i].y, 'red');
			}
		}

        if(isPrime(snake1.score)) {
            ctx.drawImage(imglife, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        drawObstacle(ctx, OBSTACLE_LIST)

 head-and-body
				drawCelltail(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
			} else {
				drawCellbody(ctx, snake1.body[i].x, snake1.body[i].y, 'red');

				drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
			} else {
				drawCell(ctx, snake1.body[i].x, snake1.body[i].y, 'red');
 main
			}
		}

main
		//apple
		drawApple(ctx, apple1.position.x, apple1.position.y);
		drawApple(ctx, apple2.position.x, apple2.position.y);

		drawScore(snake1);
 life-and-level
        drawLevel(snake1);
        drawlife(imglife, snake1);

 main
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
 life-and-level
    const obstacleKoor = {
        x: 50,
        y: 200,
    }
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    // kalo dia makan apple 1 dan scorenya kelipatan 5 tambah value  snakelife
        if (snake.score % 5 === 0) {
            snakelife++;
            snakelevel++;
            let obstacleY = obstacleKoor.y
            if (OBSTACLE_LIST.length) {
                obstacleY = OBSTACLE_LIST[OBSTACLE_LIST.length - 1].y + 50
            }
            OBSTACLE_LIST.push({x: obstacleKoor.x, y: obstacleY})
        }
    } else if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    // kalo dia makan apple 1 dan scorenya kelipatan 5 tambah snakelife
        if (snake.score % 5 === 0) {
            snakelife++;
            snakelevel++;
            let obstacleY = obstacleKoor.y
            if (OBSTACLE_LIST.length) {
                obstacleY = OBSTACLE_LIST[OBSTACLE_LIST.length - 1].y + 50
            }
            OBSTACLE_LIST.push({x: obstacleKoor.x, y: obstacleY})        
        }
    }
    if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
      life.position = initPosition();
      snakelife++;

    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
    else if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
 main
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
 life-and-level
    eat(snake, apple1, apple2, life);

    eat(snake, apple1);
 main
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
 life-and-level
    eat(snake, apple1, apple2, life);

    eat(snake, apple1);
 main
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
 life-and-level
    eat(snake, apple1, apple2, life);

    eat(snake, apple1);
 main
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
 life-and-level
    eat(snake, apple1, apple2, life);

    eat(snake, apple1);
 main
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
 life-and-level
    for (let i = 0; i < OBSTACLE_LIST.length; i++) {
        if (OBSTACLE_LIST[i].x === snakes[0].head.x && OBSTACLE_LIST[i].y === snakes[0].head.y) {
            isCollide = true;
        }
        console.log(OBSTACLE_LIST[i].x, snakes[0].head.x);
    }
    if (isCollide) {
        audio.play();
        snake1 = initSnake("purple");
        OBSTACLE_LIST = []

    if (isCollide) {
        audio.play();
        alert("Game over");aadssdw
        snake1 = initSnake("purple");
 main
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
 life-and-level
    if (!checkCollision([snake1])) {

 head-and-body
    if (!checkCollision(snake1)) {

apple
    if (!checkCollision(snake1)) {

    if (!checkCollision([snake1])) {
 main
 main
 main
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