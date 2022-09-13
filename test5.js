
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
    this.mouseDowned = false;
    this.prevTime;

    this.engine = new Matter.Engine.create();
    this.world = this.engine.world;
    
    this.ground = new Boundary(this.world, this.canvas.width/2, this.canvas.height-10, this.canvas.width, 20);
    
    // chains
    this.chain = new Chain(this.world, this.canvas.width/2, this.canvas.height);
    
    requestAnimationFrame(this.animate.bind(this));
  }
  
  draw() {
    this.ctx.clearRect(0, 0, 800, 800);
    Matter.Engine.update(this.engine);
    
    this.chain.show(this.ctx);
   
    this.ground.show(this.ctx);
  }
  
  animate(t) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
