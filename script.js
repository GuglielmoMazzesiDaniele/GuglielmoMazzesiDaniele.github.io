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

    generateNoise()
}

// Generating the noise for the
function generateNoise(){

    const canvas = document.querySelector(".background");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const image = ctx.createImageData(canvas.width, canvas.height);

    for(let i = 0; i < image.data.length; i++){
        image.data[i] = Math.random() * 255;
        image.data[i + 1] = Math.random() * 255;
        image.data[i + 2] = Math.random() * 255;
        image.data[i + 3] = 20;
    }

    ctx.putImageData(image, 0, 0);
}