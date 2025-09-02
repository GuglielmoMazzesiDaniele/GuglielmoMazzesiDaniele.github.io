// p5.js animated sea with floating circles (performance-tuned)
let noise_scale = 0.002;
let sea_movement = 200;
let sea_level;
let floating_circles = [];
let maximum_circles = 12;
let respawn_probability = 0.25;
let spawn_probability = 0.004;
let is_grabbing = false;

let bg;

function setup(){
  bg = createCanvas(windowWidth, windowHeight);
  bg.position(0,0);
  bg.style('z-index', '-1');
  frameRate(60);
  noStroke();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  clear();
  background(255);
  sea_level = (2*height)/3;

  drawFloatingCircles();
  drawSea();
  
  // Cursor feedback
  if(is_grabbing){
    document.body.style.cursor = 'grab';
    document.body.style.userSelect = 'none';
  }else{
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }
}

function drawSea(){
  // filled polygon instead of thousands of vertical lines
  const nt = frameCount * noise_scale;
  fill(110, 196, 235, 180);
  beginShape();
  vertex(0, height);
  for(let x=0; x<=width; x+=2){
    const nx = x * noise_scale;
    const y = sea_level - sea_movement * noise(nx, nt);
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

// Floating circles
function drawFloatingCircles(){
  floating_circles.forEach((f, i) => {
    fill(0,0,0,220);
    if(f.is_grabbed){
      circle(mouseX, mouseY, f.d);
      const seaY = sea_level - f.d/3 - sea_movement * noise(mouseX*noise_scale, frameCount*noise_scale);
      fill(255,0,0,100);
      circle(mouseX, seaY, f.d);
      return;
    }
    if(frameCount % 2 === 0) f.x += 1;
    if(f.x >= width + 20){
      if(Math.random() <= respawn_probability) f.x = -20;
      else floating_circles.splice(i,1);
    }
    f.y = sea_level - f.d/3 - sea_movement * noise(f.x*noise_scale, frameCount*noise_scale);

    const over = dist(f.x, f.y, mouseX, mouseY) <= f.d/2;
    const d = over ? f.d * 1.1 : f.d;

    fill(0,0,0,220);
    circle(f.x, f.y, d);
  });

  spawnFloatingCircles();
}

function spawnFloatingCircles(){
  if(floating_circles.length >= maximum_circles) return;
  if(Math.random() <= spawn_probability){
    const d = 10 + 50*Math.random();
    floating_circles.push({
      x: -10 - d, y: 0, d, is_grabbed: false
    });
  }
}

function mousePressed(){
  floating_circles.forEach(f => {
    if(dist(f.x, f.y, mouseX, mouseY) <= f.d/2){
      f.is_grabbed = true; is_grabbing = true;
    }
  });
}
function mouseReleased(){
  is_grabbing = false;
  floating_circles.forEach(f => {
    if(f.is_grabbed){
      f.is_grabbed = false;
      f.x = mouseX;
    }
  });
}
