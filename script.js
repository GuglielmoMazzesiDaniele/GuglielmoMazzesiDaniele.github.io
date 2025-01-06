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