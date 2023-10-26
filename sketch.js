class mover {
  constructor(x,y,mass) {
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = mass;
  }



  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }


  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.99);
  }

  checkEdges() {
    if (this.position.x > width-this.mass*2) {
      this.position.x = width-this.mass*2;
      this.velocity.x *= -1;
    } else if (this.position.x < this.mass*2) {
      this.velocity.x *= -1;
      this.position.x = this.mass*2;
    }

    if (this.position.y > height-this.mass*2) {
      this.velocity.y *= -1;
      this.position.y = height-this.mass*2;
    }
  }
  
  display() {
    fill(255,0,0);
    circle(this.position.x,this.position.y,this.mass*4);
  }
}
let wind;
let gravity;

function setup() { 
  createCanvas(400, 400);
  M1 = new mover(125, 200, 5);
  M2 = new mover(275, 200, 1);
}

function draw() {
  wind = createVector(0.05, 0);
  gravity = createVector(0, 0.1);
  let g1 = p5.Vector.mult(gravity, M1.mass);
  let g2 = p5.Vector.mult(gravity, M2.mass);
  let w1 = p5.Vector.mult(wind, M1.mass);
  let w2 = p5.Vector.mult(wind, M2.mass);
  background(220);

  if (mouseIsPressed === true) {
    M1.applyForce(w1);
    M2.applyForce(w2);
  }

  M1.checkEdges();
  M1.update();
  M1.applyForce(g1);
  M1.display();

  M2.checkEdges();
  M2.update();
  M2.applyForce(g2);
  M2.display();
}

let resetvel;

function keyPressed() {
  resetvel = createVector(0, -10);
  let r1 = p5.Vector.mult(resetvel, M1.mass);
  let r2 = p5.Vector.mult(resetvel, M2.mass);
  M1.applyForce(r1);
  M2.applyForce(r2);
}
