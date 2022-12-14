class Circle extends Shape{
  constructor(world, x, y, r, fixed = false) {
    super(world);

    var options = {
      friction: 0.1,
      restitution: 0.6,
      isStatic: fixed
    }
    this.color = `rgba(${range(0, 255)},${range(0, 255)},${range(0, 255)}, 0.5)`;
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  setColor(color) {
    this.color = color;
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx?.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fill();
  
    ctx.translate(-pos.x, -pos.y);
    ctx.restore();
  }

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}