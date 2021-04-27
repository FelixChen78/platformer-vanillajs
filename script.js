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
const aceleration = 9.81;

const keys = [];

const player = {
    x: 200,
    y: ground,
    width: spriteSheetWidth / spriteCol, // width = image width / sprites in column: 160 / 4 = 40
    height: spriteSheetHeight / spriteRow, // height = image height / sprites in row: 288 / 4 = 72
    frameX: 0,
    frameY: 0,
    speed: 0,
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


// function jump() {
//     player.y -= player.speed * 10;
//     player.inAir = true;
//     player.onGround = false;
//     player.jumped = false;
// }

// function doubleJump() {
//     player.y += player.speed;
// }

// function fall() {
//     if (player.y < ground) {
//         player.y += (player.mass * aceleration * elapsed);
//     }
//     else {
//         player.y = ground;
//         player.onGround = true;
//         player.inAir = false;

//     }
// }

// function onGround() {
//     player.onGround = true;
//     player.falling = false;
// }

/**
 *
 * onGround:
 *      jump = false
 *      inAir = false
 *      falling = false
 *      //running = false
 *      arrowUp:
 *          jump()
 * inAir:
 *      arrowUp:
 *          doubleJump()
 *      falling()
 *
 */

var mag = 9.81;
function changeHeight() {
    player.speed -= (mag * elapsed);
    player.y -= (player.speed * elapsed);

    if (player.y <= ground) {
        player.speed = 0;
        player.air = false;
        player.ground = false;
    }
}

function increaseVelocity() {
    if (player.onGround) { //single jump
        player.air = true;
        player.onGround = false;
        player.jumped = true;
        player.speed += 9; // change hard code
    }
    else if (player.inAir && player.jumped) { //double jump
        player.jumped = false;
        player.speed += 9;
    }
}



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
    if ((keys["ArrowUp"] || keys[" "]) && player.y >= 0) {
        // player.y -= player.speed;
        increaseVelocity();
        player.frameY = 3;

        player.moving = true;
        player.jumped = true;
    }
    if (keys["ArrowDown"] && player.y < ground) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x >= 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys["ArrowRight"] && player.x <= canvas.width - player.width) {
        player.x += player.speed
        player.frameY = 2;
        player.moving = true;
    }
}

/**                         PLATFORM                            */




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
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height + 90);

        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);

        // increaseVelocity();
        // changeHeight();

        movePlayer();
        // if (player.jumped && player.onGround) {
        //     jump();
        // }
        // if (player.inAir) {
        //     fall();
        // }
        

        handlePlayerFrame();

        requestAnimationFrame(animate);

    }
}

fps = 10;

gameLoop(fps);