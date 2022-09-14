var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

class App {
  constructor() {    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.setup();
  }

  setup() {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.prevTime;

    this.engine = new Engine.create();
    this.world = this.engine.world;
    this.plinkos = [];
    this.marbles = [];
    this.bounds = [];    // for basket

    this.setupPlinkos();
    this.setupMarbles();
    this.setupBounds(); // for baskets
    this.ground = new Boundary(this.world, this.canvas.width/2, this.canvas.height-10, this.canvas.width, 20);
    this.ground.setColor('gray');
    
    requestAnimationFrame(this.animate.bind(this));
  }

  // background plinko
  setupPlinkos() {
    let gap = 60;
    for (let y = 100, i = 0; y < this.canvas.height/5 * 4; y += gap, i++) {
      for (let x = 50; x < this.canvas.width - 50; x += gap) {
        if (i % 2 === 1) {
          this.plinkos.push(new Circle(this.world, x + gap/2, y, 15, true));
        } else {
          this.plinkos.push(new Circle(this.world, x, y, 15, true));
        }
      }
    }
  }

  // set up marbles
  setupMarbles() {
    let x = this.canvas.width/2 + range(-2, 2); // random -1 to 1
    const marble = new Circle(this.world, x, 5, 10, false);
    marble.setColor('black');
    this.marbles.push(marble);
  }

  setupBounds() {

    const gap = 60;
    for (let i = 45; i < this.canvas.width - 30; i += gap) {
      const bound = new Boundary(this.world, i, this.canvas.height - 50, 10, 100);
      bound.setColor('orange');
      this.bounds.push(bound);
    }
  }
  
  draw() {

    this.ctx.clearRect(0, 0, 800, 800);
    Matter.Engine.update(this.engine);
    
    // plinkos
    this.plinkos.forEach(plinko => plinko.show(this.ctx));
    
   
    // marble : off screen - delete
    for (let i = 0; i < this.marbles.length; i++) {
      this.marbles[i].show(this.ctx);
      if (this.marbles[i].isXOffScreen(this.canvas.width)) {
        this.marbles[i].removeFromWorld();
        this.marbles.splice(i, 1);
        i--;
      }
    }

    // bounds for baskets
    this.bounds.forEach(bound => bound.show(this.ctx));

    this.ground.show(this.ctx);
  }
  
  animate(t) {
    if (!this.prevTime) {
      this.prevTime = t;
    }
    // Default value by browser: 60. Set 30 to make slow
    if (t - this.prevTime > 10000/3) { 
      this.prevTime = t;
      this.setupMarbles()
    }
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
