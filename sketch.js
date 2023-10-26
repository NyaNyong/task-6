class mover {
  constructor() {
    this.position = createVector(0,height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
  }



  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.position.x > width) {
      this.position.x = 0;
    }
  }
  
  display(c) {
    fill(255,0,0);
    circle(this.position.x,this.position.y,c);
  }
}
let wind;

function setup() { 
  createCanvas(400, 400);
  M = new mover();
}

function draw() {
  wind = createVector(0.05, 0);
  background(220);
  M.update();
  M.display(10);
  if (mouseIsPressed === true) {
    M.applyForce(wind);
  }
}
