class Bird extends Shape{
  constructor(world, x, y, r) {
    super(world);

    var options = {
      density: 0.004,
      collisionFilter: {
        category: 0x0002
      }
    }
    this.body = Bodies.circle(x, y, r, options);
    Body.setMass(this.body, this.body.mass * 6);
    this.r = r;
    this.world = world;
    this.img = new Image();
    this.img.src = "./resources/angryBird.png";
    World.add(this.world, this.body);
    //Composite.add(this.world, this.body);
  }

  setColor(color) {
    this.color = color;
  }

  setPosition(pos) {
    this.body.position.x = pos.x;
    this.body.position.y = pos.y;
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    
    ctx.rotate(angle);
    const w = this.r  * 2;
    let newPos = getRectPointFromCenter(pos.x, pos.y, w, w, true);
    ctx.drawImage(this.img, newPos.x, newPos.y, w, w);

    ctx.translate(-pos.x, -pos.y);
    ctx.restore();
  }

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}