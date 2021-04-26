const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    //frameX * width = sprite on frameX row
    //frameY * height = sprite on frameY row
    x: 200,
    y: 200,
    width: 40, // width = image width / sprites in column: 160 / 4 = 40
    height: 72, // height = image height / sprites in row: 288 /4 = 72
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const playerSprite = new Image();
playerSprite.src = "chewie.png";

const background = new Image();
background.src = "background.jpg";

/**
 * @function drawSprite
 *
 * @param {image} img
 * @param {crop image start position X} sX
 * @param {crop image start position Y} sY
 * @param {crop end position X} sW
 * @param {crop end position Y} sH
 * @param {place on canvas start position X} dX
 * @param {place on canvas start position Y} dY
 * @param {place on canvas end position X} dW
 * @param {place on canvas end position Y} dH
 */

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}





// setInterval(function())

window.addEventListener("keydown", e => {
     keys[e.key] = true;
    //  player.moving = true;
});

window.addEventListener("keyup", e => {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 100) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys["ArrowDown"] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x > 10) {
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

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}


let fps, fpsInterval, startTime, now, then, elapsed;

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