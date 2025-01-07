let circle_x = -20;
let circle_d = 25;

// Loads the content of the homepage dynamically on load
function loadHomepage() {
    let nav_bar = document.getElementById("nav_bar");

    navigations_buttons.forEach((button) => {
        // Creating the button
        let html_button = document.createElement("button");
        // Extracting the value from the array
        html_button.textContent = button.text;
        // Appending the button
        nav_bar.appendChild(html_button);
    })
}

// Setup the p5.js environment
function setup() {
    // Initializing the background canvas
    let background_canvas = createCanvas(innerWidth, innerHeight);

    // Aligning canvas to top-left corner
    background_canvas.position(0, 0);

    // Placing the canvas at negative index
    background_canvas.style('z-index', '-1');
}

// Called every frame, default 60 fps
function draw() {
    // Resetting the background
    background(255);

    // Initializing variables used by the Perlin Noise
    let noise_scale = 0.002;
    let sea_movement = 200;
    let sea_level = innerHeight / 2;

    // Increasing the circle_x
    if(frameCount % 2 === 0)
        circle_x++;

    // If the circle moved outside the window, reset its position
    if(circle_x >= innerWidth + 20)
        circle_x = -20

    // Setting the circle
    stroke(0);
    fill(0);

    // Drawing the circle at the right height
    circle(circle_x,
        sea_level - circle_d / 3 - sea_movement * noise(circle_x * noise_scale, frameCount * noise_scale),
        circle_d);

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