let nav_button = [
    "Home",
    "Projects",
    "Curriculum Vitae",
]

// Loads the content of the homepage dynamically on load
function loadHomepage() {
    nav_button.forEach((element) => {
        let nav_bar = document.querySelector("nav");
        let button = document.createElement("button");
        button.textContent = element;
        nav_bar.appendChild(button);
    })
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