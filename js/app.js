// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Take the parameters and assign it to the properties.
    this.sprite = 'images/enemy-bug.png';    
    this.x = x;    
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //Apply the random variable to the speed, and change the X position ONLY!!
    const move = this.speed * dt;
    this.x += move;

    //Check the collision here
    if (Math.abs(this.x - player.x) < 70 && Math.abs(this.y - player.y) < 40) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player class with initial values.
function Player() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 380;
    
}

//Whenever there is a move, update its location!
Player.prototype.update = function(x, y) {
    this.x += x;
    this.y += y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //When you win, return the player to its default location, and change the player to mario!
    if (this.y === -20) {
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/mario_PNG55.png';
    }
};

//This is the moving handling method.
Player.prototype.handleInput = function(move) {        
    if (move === "left" && this.x > 0) {
        this.update(-100, 0);
    } else if (move === "up" && this.y > -20) {
        this.update(0, -80);
    } else if (move === "right" && this.x < 400) {
        this.update(100, 0);
    } else if (move === "down" && this.y < 380) {
        this.update(0, 80);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Create player objects
const player = new Player();

//Create 4 enemies at the beginning.
let allEnemies = [new Enemy(100, 50, 100), new Enemy(0, 130, 150), new Enemy(100, 210, 70), new Enemy(200, 210, 55)];

//I put the 3 positions of Y axis in an array, to get one of them randomly later.
const randomCols = [50, 130, 210];

//Call this function every 1000ms, and add an enemy to the array, with random speed variable and random y variable from 'randomCols' array.
setInterval(function() {
    const speed = Math.floor(Math.random() * 200 + 70 );
    const x = 0;
    const y = randomCols[Math.floor(Math.random() * randomCols.length)];

    allEnemies.push(new Enemy(x, y, speed));
}, 1000);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
