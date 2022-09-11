// //https://youtu.be/uITcoKpbQq4

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

    this.engine = new Matter.Engine.create();
    this.world = this.engine.world;
    
    this.boundaries.push(new Boundary(this.world, this.canvas.width/2, this.canvas.height/3 * 2, this.canvas.width/2, 20, 35));
    this.boundaries.push(new Boundary(this.world, this.canvas.width/3 * 2, this.canvas.width/3, this.canvas.width/2, 20, -35));

    // Mouse Drag Handler
    window.addEventListener('mousedown', (e) => this.mouseDowned = true);
    window.addEventListener('mousemove', this.mouseDragged.bind(this));
    window.addEventListener('mouseup', (e) => this.mouseDowned = false);
    requestAnimationFrame(this.animate.bind(this));
  }

  mouseDragged(e) {
    if (this.mouseDowned) {
      this.circles?.push(new Circle(this.world, e.x, e.y, range(10, 20)));
    }
  } 
  
  draw() {
    Matter.Engine.update(this.engine);
    this.ctx.clearRect(0, 0, 800, 800);
    this.circles?.forEach(circle => circle.show(this.ctx));
    this.boundaries?.forEach(boundary => boundary.show(this.ctx));
  }
  
  animate(t) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

}

window.onload = () => {
  new App();
}
