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