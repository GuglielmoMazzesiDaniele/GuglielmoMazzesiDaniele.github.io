// Global variables
let background_canvas

// Global variables for the floating circles background
let maximum_circles = 15;
let respawn_probability = 0.25;
let spawn_probability = 0.002;

// Array containing the circles floating on the sea
let floating_circles = [];

// Setup the p5.js environment
function setup() {
    // Initializing the background canvas
    background_canvas = createCanvas(innerWidth, innerHeight);

    // Aligning canvas to top-left corner
    background_canvas.position(0, 0);

    // Placing the canvas at negative index
    background_canvas.style('z-index', '-1');
}

// Called every frame, default 60 fps
function draw() {
    // Setting the canvas size
    background_canvas.width = innerWidth;
    background_canvas.height = innerHeight;

    // Resetting the background
    background(255);

    // Initializing variables used by the Perlin Noise
    let noise_scale = 0.002;
    let sea_movement = 200;
    let sea_level = innerHeight / 2;

    drawFloatingCircles(noise_scale, sea_movement, sea_level);
    drawSea(noise_scale, sea_movement, sea_level);
}

// Draw the circles floating on the background sea
function drawFloatingCircles (noise_scale, sea_movement, sea_level) {
    // Drawing every
    floating_circles.forEach((floating_circle, index) => {
        // Increasing the circle_x
        if(frameCount % 2 === 0)
            floating_circle.x++;

        // If the circle moved outside the window, either respawn it or delete it
        if(floating_circle.x >= innerWidth + 20){
            if(Math.random() <= respawn_probability)
                floating_circle.x = -20
            else
                floating_circles.splice(index, 1);
        }

        // Setting the circle's brush
        stroke(floating_circle.c);
        fill(floating_circle.c);

        // Drawing the circle at the right height
        circle(floating_circle.x,
            sea_level - floating_circle.d / 3 - sea_movement * noise(floating_circle.x * noise_scale, frameCount * noise_scale),
            floating_circle.d);
    })

    // Spawning new circles
    spawnFloatingCircles();
}

// Fill the array with floating circles, up to the maximum size
function spawnFloatingCircles () {
    // Verifying if the array is full
    if(floating_circles.length === maximum_circles)
        return;

    // Trying to spawn a new circle
    if(Math.random() <= spawn_probability){
        // Generating the diameter and color
        let diameter = 10 + 50 * Math.random();
        let circle_color = color(0, 0 , 0, 220);

        floating_circles.push({
            x : - 10 - diameter,
            d : diameter,
            c : circle_color
        })
    }
}

// Draw the background sea
function drawSea (noise_scale, sea_movement, sea_level) {
    // Creating the sea
    for(let x = 0; x < innerWidth; x++) {
        // Scaling the width coordinates by the noise variables
        let nx = x * noise_scale;
        let nt = frameCount * noise_scale;

        // Obtaining the noise value
        let y = sea_level - sea_movement * noise(nx, nt);

        // Setting the sea appearance
        stroke(135, 206, 235, 200);

        // Drawing a line
        line(x, innerHeight, x, y);
    }
}