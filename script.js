// Loads the content of the homepage dynamically on load
function loadHomepage() {
    let test = ["Test 1", "Test 2"];
    test.forEach((element) => {
        let nav_bar = document.querySelector("nav");
        let button = document.createElement("button");
        button.textContent = element;
        nav_bar.appendChild(button);
    })
}