// Global variables
let background_canvas

// Global variables for the floating circles background
let maximum_circles = 15;
let respawn_probability = 0.25;
let spawn_probability = 0.002;

// Array containing the circles floating on the sea
let floating_circles = [];

// Flag indicating weather or not the cursor is grabbing a circle
let is_grabbing = false;

// Setup the p5.js environment
function setup_background() {
    // Initializing the background canvas
    background_canvas = createCanvas(windowWidth, windowHeight);

    // Aligning canvas to top-left corner
    background_canvas.position(0, 0);

    // Placing the canvas at negative index
    background_canvas.style('z-index', '-1');
}

// Called every frame, default 60 fps
function draw_background() {
    // Setting the canvas size
    background_canvas.width = windowWidth;
    background_canvas.height = windowHeight;

    // Setting the default cursor value
    if(is_grabbing === false){
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    }
    else{
        document.body.style.cursor = 'grab';
        document.body.style.userSelect = 'none';
    }

    // Resetting the background
    background(255);

    // Initializing variables used by the Perlin Noise
    let noise_scale = 0.002;
    let sea_movement = 200;
    let sea_level = windowHeight / 2;

    drawFloatingCircles(noise_scale, sea_movement, sea_level);
    drawSea(noise_scale, sea_movement, sea_level);
}

// Verify if a floating circle has been grabbed
function mousePressed_background() {
    floating_circles.forEach(floating_circle => {
        // Verifying it the mouse has been grabbed
        if(mag(floating_circle.x - mouseX, floating_circle.y - mouseY) <= floating_circle.d / 2) {
            floating_circle.is_grabbed = true;
            is_grabbing = true;
        }
    })
}

// Verify if a floating circle has been released
function mouseReleased_background() {
    floating_circles.forEach(floating_circle => {
        floating_circle.is_grabbed = false;
        is_grabbing = false;
    })
}

// Draw the circles floating on the background sea
function drawFloatingCircles (noise_scale, sea_movement, sea_level) {
    // Drawing every
    floating_circles.forEach((floating_circle, index) => {
        // Increasing the circle_x
        if(frameCount % 2 === 0)
            floating_circle.x++;

        // If the circle moved outside the window, either respawn it or delete it
        if(floating_circle.x >= windowWidth + 20){
            if(Math.random() <= respawn_probability)
                floating_circle.x = -20
            else
                floating_circles.splice(index, 1);
        }

        // Setting the circle's brush
        stroke(floating_circle.c);
        fill(floating_circle.c);

        // If the circle has been grabbed, draw it at mouse coordinates
        if(floating_circle.is_grabbed){
            circle(mouseX, mouseY, floating_circle.d);
            return;
        }

        // Computing the circle y coordinates
        floating_circle.y = sea_level - floating_circle.d / 3
            - sea_movement * noise(floating_circle.x * noise_scale, frameCount * noise_scale);

        // Initializing the diameter
        let diameter;

        // Computing the new diameter
        if(mag(floating_circle.x - mouseX, floating_circle.y - mouseY) <= floating_circle.d / 2) {
            diameter = floating_circle.d * 1.1;
            document.body.style.cursor = 'grab';
        }
        else {
            diameter = floating_circle.d;
        }

        // Drawing the circle at the right height
        circle(floating_circle.x, floating_circle.y, diameter);
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
            y : 0,
            d : diameter,
            c : circle_color,
            is_grabbed: false
        })
    }
}

// Draw the background sea
function drawSea (noise_scale, sea_movement, sea_level) {
    // Creating the sea
    for(let x = 0; x < windowWidth; x++) {
        // Scaling the width coordinates by the noise variables
        let nx = x * noise_scale;
        let nt = frameCount * noise_scale;

        // Obtaining the noise value
        let y = sea_level - sea_movement * noise(nx, nt);

        // Setting the sea appearance
        stroke(135, 206, 235, 200);

        // Drawing a line
        line(x, windowHeight, x, y);
    }
}