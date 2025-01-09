// Main containers
let main_containers = [
    {
        text: "Home",
        container_id: "home_container",
        container: null,
        button: null
    },
    {
        text: "Projects",
        container_id: "projects_container",
        container: null,
        button: null
    },
]

// Loads the content of the homepage dynamically on load
function loadHomepage() {
    // Creating the main containers logics
    main_containers.forEach((container) => {
        // Querying the DOM for the navbar
        let nav_bar = document.querySelector("nav");
        // Querying the DOM for the container
        container.container = document.getElementById(container.container_id);
        // Removing the container from the DOM unless it is the homepage
        if(container.container_id !== "home_container")
            container.container.remove();
        // Creating a new button
        let button = document.createElement("button");
        // Saving a reference to the button and appending it in the navbar
        container.button = button;
        nav_bar.appendChild(button);
        // Filling the button with the text
        button.textContent = container.text;
        // Creating the button listener
        button.addEventListener("click", function(event) {
            // Preventing default behaviour
            event.preventDefault()
            // Hiding all the main containers
            main_containers.forEach((container) => {
                container.container.remove();
            })
            // Pushing the correct container in the DOM
            document.querySelector("main").appendChild(container.container);
            console.log(container.container);
        }.bind(this));
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