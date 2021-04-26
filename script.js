const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

let fps, fpsInterval, startTime, now, then, elapsed;
let ground = canvas.height - 120;

const keys = [];

const player = {
    x: 200,
    y: ground,
    width: 40, // width = image width / sprites in column: 160 / 4 = 40
    height: 72, // height = image height / sprites in row: 288 /4 = 72
    frameX: 0,
    frameY: 0,
    speed: 9,
    mass: 1,
    moving: false,
    jumped: false,
    inAir: false,
    falling: false,
    onGround: true
};

// const world = {
//     gravity: -9.8,
//     players: [new player]
// }

const playerSprite = new Image();
playerSprite.src = "chewie.png";

const background = new Image();
background.src = "background.jpg";

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



/**                     Physics                              */

var mass = 1;
var aceleration = 9.8;
var force = mass * aceleration;

function jump() {
    player.y += player.speed
    player.inAir = true;
    player.onGround = false;
}

function doubleJump() {
    player.y += player.speed
}

function fall() {
    player.y -= player.mass
}

function onGround() {
    player.onGround = true;
    player.falling = false;
}
/**
 *
 * onGround
 * jumped
 * inAir
 * falling
 *
 *
 */

/**                     EVENT LISTENER                       */
window.addEventListener("keydown", e => {
     keys[e.key] = true;
     console.log(keys);
    //  player.moving = true;
});

window.addEventListener("keyup", e => {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if (keys["ArrowUp"] || keys[" "] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        player.jumped = true;
        player.moving = true;
    }

    if (keys["ArrowDown"] && player.y < canvas.height - player.height - 50) {
        // player.y += player.speed;
        // player.frameY = 0;
        // player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
        player.x += player.speed
        player.frameY = 2;
        player.moving = true;
    }
}


/**                         ANIMATION                          */

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

function startAnimating(fps) {
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

        movePlayer();
        handlePlayerFrame();

        requestAnimationFrame(animate);

    }
}

fps = 10;

startAnimating(fps);