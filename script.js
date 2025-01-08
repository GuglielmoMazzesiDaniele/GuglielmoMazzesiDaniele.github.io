let interactive_nav_buttons = [
    {
        text: "Home",
        container_id: "home",
        button: null
    },
    {
        text: "Projects",
        container_id: "projects",
        button: null
    },
]

// Loads the content of the homepage dynamically on load
function loadHomepage() {
    // Loading the buttons
    interactive_nav_buttons.forEach((element) => {
        // Querying the DOM for the navbar
        let nav_bar = document.querySelector("nav");
        // Creating a new button
        let button = document.createElement("button");
        // Filling the button with the text
        button.textContent = element.text;
        // Creating the button listener
        button.addEventListener("click", function(event) {
            // Preventing default behaviour
            event.preventDefault();
            // Hiding all the main containers
            document.querySelectorAll("main div").forEach((element) => {
                element.style.display = "none";
            })
            console.log(element.container_id)
            // Showing the container linked with the button
            document.getElementById(element.container_id).style.display = "flex";
        }.bind(this));

        // Saving a reference to the button and appending it in the navbar
        element.button = button;
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