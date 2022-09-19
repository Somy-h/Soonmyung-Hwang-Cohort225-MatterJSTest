
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
    this.mouseDowned = false;

    this.engine = new Matter.Engine.create();
    this.world = this.engine.world;
    Matter.Runner.run(this.engine);
    
    const options = {
      isStatic: true
    }
    this.ground = Matter.Bodies.rectangle(this.canvas.width/2, this.canvas.height - 10, this.canvas.width, 20, options);
    //console.log(this.ground);
    Matter.World.add(this.world, this.ground);

    window.addEventListener('mousedown', (e) => this.mouseDowned = true);
    window.addEventListener('mousemove', this.mouseDragged.bind(this));
    window.addEventListener('mouseup', (e) => this.mouseDowned = false);

    requestAnimationFrame(this.animate.bind(this));
  }

  mouseDragged(e) {
    if (this.mouseDowned) {
      this.boxes.push(new Box(this.world, e.x, e.y, 40, 40));
    }
  } 
  
  draw() {
    this.ctx.clearRect(0, 0, 800, 800);

    this.ctx.beginPath();
    this.boxes?.forEach (box => box.show(this.ctx));
    this.ctx.strokeStyle = 'green';
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.moveTo(0, this.canvas.height - 10);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 10);
    this.ctx.stroke();
  }
  
  animate(t) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
