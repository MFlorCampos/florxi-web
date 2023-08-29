let circle1; // Declare objects
let circle2;

let circle1x = 3;
let circle1y = 3;

let circle2x = 9;
let circle2y = 9;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create object
  circle1 = new Circle();
  circle2 = new Circle();
}

function draw() {
  clear();
  background(220, 10);

  circle1.displayCircle1();
  circle2.displayCircle2();
}

// Circle class
class Circle {
  constructor() {
    drawingContext.filter = "blur(30px)";
    this.diameter = 80;
  }

  displayCircle1() {
    fill("#FF7F11");
    circle1x += (mouseX - circle1x) * 0.045;
    circle1y += (mouseY - circle1y) * 0.045;
    ellipse(circle1x, circle1y, this.diameter, this.diameter);
  }

  displayCircle2() {
    fill("#BD3A60");
    circle2x += (mouseX - circle2x) * 0.06;
    circle2y += (mouseY - circle2y) * 0.06;
    ellipse(circle2x, circle2y, this.diameter, this.diameter);
  }
}
