// https://youtu.be/4HsVCLakjtQ

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
    this.boxes = [];
    this.circles = [];
    this.boundaries = [];
    this.mouseDowned = false;
    this.prevTime;

    this.engine = new Matter.Engine.create();
    this.world = this.engine.world;
    
    this.boundaries.push(new Boundary(this.world, this.canvas.width/4 * 3, this.canvas.width/3, this.canvas.width/2, 20, -25));
    this.boundaries.push(new Boundary(this.world, this.canvas.width/2, this.canvas.height/3 * 2, this.canvas.width/3 * 2, 20, 25));
    
    requestAnimationFrame(this.animate.bind(this));
  }
  
  draw() {

    this.ctx.clearRect(0, 0, 800, 800);
    Matter.Engine.update(this.engine);
    
    // Offscreen: 
    // 1. delete Matter engine's array 
    // 2. this.circles array.
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].show(this.ctx);
      if (this.circles[i].isOffScreen(this.canvas.height)) {
        this.circles[i].removeFromWorld();
        this.circles.splice(i, 1);
        i--;
      }
    }

    //console.log(this.circles?.length, this.world.bodies.length);
    this.boundaries?.forEach(boundary => boundary.show(this.ctx));
  }
  
  animate(t) {
    if (!this.prevTime) {
      this.prevTime = t;
    }
    // Default value by browser: 60. Set 30 to make slow
    if (t - this.prevTime > 1000/30) { 
      this.prevTime = t;
      this.circles?.push(new Circle(this.world, 500, 90, range(10, 20)));
    }
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
