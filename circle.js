class Circle extends Shape{
  constructor(world, x, y, r, fixed = false) {
    super(world);

    var options = {
      friction: 0.3,
      restitution: 0.6,
      isStatic: fixed
    }
    this.color = `rgba(${range(0, 255)},${range(0, 255)},${range(0, 255)}, 0.6)`;
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx?.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}