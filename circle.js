class Circle extends Shape{
  constructor(world, x, y, r) {
    super(world);

    var options = {
      friction: 0.3,
      restitution: 0.6
    }
    this.color = `rgba(${range(0, 255)},${range(0, 255)},${range(0, 255)}, 0.6)`;
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;
    // let angle = this.body.angle;

    ctx.save();
    //ctx.rotate(angle);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx?.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.beginPath();
    // ctx.strokeStyle = 'black';
    // ctx.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.restore();
  }

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}