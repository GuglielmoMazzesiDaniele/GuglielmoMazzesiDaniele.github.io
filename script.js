// Startup function
function loadHomepage() {
    loadNavBar()
}

// P5.JS FUNCTIONS - DO NOT TOUCH UNLESS REQUIRED
function setup() {
    setup_background();
}

function draw() {
    draw_background()
}

// Resize the canvas to the new size
function  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
    mousePressed_background()
}

function mouseReleased() {
    mouseReleased_background();
}