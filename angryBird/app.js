
var Engine = Matter.Engine,
    World  = Matter.World,
    Bodies = Matter.Bodies,
    Mouse  = Matter.Mouse,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint;

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

    this.engine = new Engine.create({
      enableSleeping: true
    });
    this.world = this.engine.world;
    this.boxes = [];

    // setup ground
    this.ground = new Boundary(this.world, this.canvas.width/2, this.canvas.height-10, this.canvas.width, 20);
    // setup boxes
    this.setupBoxes();
    // setup bird
    this.setupBird();
    // setup slingShot
    this.setupSlingShot();
  
    // setup key space event 
    window.addEventListener('keydown', this.onKeyDown.bind(this), false);

    // setup mouse constraint
    this.canvasMouse = Mouse.create(this.canvas);
    this.canvasMouse.pixelRatio = window.devicePixelRatio;
    const options = {
      mouse: this.canvasMouse
    }
    this.mConstraint = MouseConstraint.create(this.engine, options);
    


    Events.on(this.mConstraint, 'mouseup', (e) => {
      //console.log(this.mConstraint);
      if (this.mConstraint.body?.label == 'Rectangle Body') {
        return;
      }
      setTimeout(() => {
        this.slingShot.detach();
      }, 60);
    });

    World.add(this.world, this.mConstraint);

    this.mConstraint.collisionFilter.mask = 0x0002;

    requestAnimationFrame(this.animate.bind(this));
  }

  onKeyDown(e) {
    if(e.keyCode ===32) {
      if (this.bird) {
        this.bird.removeFromWorld(this.world);
      }
      this.setupBird(); 
      this.slingShot.attach(this.bird.body);
    }
  } 

  // set up Boxes
  setupBoxes() {
    let h = 50;
    let x = this.canvas.width - 150;
    let y = this.canvas.height - h - 150;
    for (let i = 0; i < 4; i++) {
      let box = new Box(this.world, x + range(-2, 2), y - h*i , 50, h, false);
      this.boxes.push(box);
    }
  }

  // set up bird
  setupBird(){
    this.bird = new Bird(this.world, 150, this.canvas.height - 80, 20, false);
    this.bird.setColor('darkred');
  }
  
  // setup sling shot to the ball
  setupSlingShot() {
    this.slingShot = new SlingShot(this.world, 200, this.canvas.height - 150, this.bird.body);
  }


  draw() {

    this.ctx.clearRect(0, 0, 800, 800);
    Engine.update(this.engine);
    
    // check mouse constraints
    this.checkMouseConstraints();
    // ground
    this.ground.show(this.ctx);
    // boxes
    this.boxes.forEach(box => box.show(this.ctx));
    // bird
    this.bird?.show(this.ctx);
    // sling shot
    this.slingShot.show(this.ctx);
  }

  checkMouseConstraints() {
    // mouse
    if (this.mConstraint.body && this.mConstraint.body.label == 'Rectangle Body' ) {
      
    }
  }
  
  animate(t) {
    if (!this.prevTime) {
      this.prevTime = t;
    }
    // Default value by browser: 60. Set 30 to make slow
    if (t - this.prevTime > 10000/3) { 
      this.prevTime = t;
    }
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
