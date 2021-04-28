const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

let fps, fpsInterval, startTime, now, then, elapsed;
let spriteSheetWidth = 160;
let spriteSheetHeight = 288;
let spriteCol = 4;
let spriteRow = 4;

const ground = canvas.height - 120;

const keys = [];

const player = {
    x: 200,
    y: ground,
    width: spriteSheetWidth / spriteCol, // width = image width / sprites in column: 160 / 4 = 40
    height: spriteSheetHeight / spriteRow, // height = image height / sprites in row: 288 / 4 = 72
    frameX: 0,
    frameY: 0,
    velocity: 9,
    mass: 1,
};

const playerSprite = new Image();
playerSprite.src = "assets/chewie.png";

const background = new Image();
background.src = "assets/background.jpg";

/**
 * @function drawSprite
 * @param {HTMLImageElement} img
 * @param {int} sX
 * @param {int} sY
 * @param {int} sW
 * @param {int} sH
 * @param {int} dX
 * @param {int} dY
 * @param {int} dW
 * @param {int} dH
 */

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

/**                     EVENT LISTENER                       */
window.addEventListener("keydown", e => {
     keys[e.key] = true;
     player.moving = true;
});

window.addEventListener("keyup", e => {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if ((keys["ArrowUp"] || keys[" "])) {
        if (player.y > 0) {
            player.y -= player.velocity;
        }
        player.frameY = 3;
        player.moving = true;
    }
    if (keys["ArrowDown"]) {
        if (player.y < ground) {
            player.y += player.velocity;
        }
        player.frameY = 0;
        player.moving = true;
    }
    if (keys["ArrowLeft"]) {
        if (player.x > 0) {
            player.x -= player.velocity;
        }
        player.frameY = 1;
        player.moving = true;
    }
    if (keys["ArrowRight"]) {
        if (player.x < canvas.width - player.width) {
            player.x += player.velocity
        }
        player.frameY = 2;
        player.moving = true;
    }
}

/**                         ANIMATION                          */

function handlePlayerFrame() {
    if (player.frameX < spriteRow - 1 && player.moving) player.frameX++
    else player.frameX = 0;
}

function gameLoop(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height + 90);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);

        movePlayer(); //key movement

        handlePlayerFrame();
        requestAnimationFrame(animate);
    }
}

fps = 10;
gameLoop(fps);