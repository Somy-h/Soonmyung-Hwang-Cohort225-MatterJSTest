
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
    this.chains = [];
    this.mouseDowned = false;
    this.prevTime;

    this.engine = new Matter.Engine.create();
    this.world = this.engine.world;
    
    this.ground = new Boundary(this.world, this.canvas.width/2, this.canvas.height-10, this.canvas.width, 20);
    
    // chains
    for (let i = 30; i < this.canvas.width - 30; i += 150) {
      this.chains.push(new Chain(this.world, i, this.canvas.height));
    }

    // mouse constraint
    this.canvasMouse = Matter.Mouse.create(this.canvas);
    this.canvasMouse.pixelRatio = window.devicePixelRatio;
    const options = {
      mouse: this.canvasMouse,
    }
    this.mConstraint = Matter.MouseConstraint.create(this.engine, options);
    Matter.World.add(this.world, this.mConstraint);
    //console.log(this.mConstraint);
    requestAnimationFrame(this.animate.bind(this));
  }
  
  draw() {

    this.ctx.clearRect(0, 0, 800, 800);
    Matter.Engine.update(this.engine);
    
    // chains
    this.chains.forEach(chain => chain.show(this.ctx));

    // mouse
    if (this.mConstraint.body) {
      
      // selected body
      let pos = this.mConstraint.body.position;
      let offset = this.mConstraint.constraint.pointB;
      let mPos = this.mConstraint.mouse.position;
      
      //console.log(this.mConstraint);
      
      this.ctx.beginPath();
      this.ctx.fillStyle = 'green';
      this.ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      this.ctx.fill();

      
      // selected body to mouse position
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'blue';
      this.ctx.moveTo(pos.x + offset.x, pos.y + offset.y);
      this.ctx.lineTo(mPos.x, mPos.y);
      //console.log(pos, offset, mPos);
      this.ctx.stroke();
    }

   
    this.ground.show(this.ctx);
  }
  
  animate(t) {
    if (!this.prevTime) {
      this.prevTime = t;
    }
    // Default value by browser: 60. Set 30 to make slow
    if (t - this.prevTime > 1000/30) { 
      this.prevTime = t;
      //this.particles?.push(new Circle(this.world, 500, 90, range(10, 20)));
    }
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
