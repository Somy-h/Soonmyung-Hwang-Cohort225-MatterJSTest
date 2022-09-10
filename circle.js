class Circle {
  constructor(world, x, y, r) {

    var options = {
      friction: 0.3,
      restitution: 0.6
    }
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    //ctx.rotate(angle);
    ctx.beginPath();
    ctx.fillStyle = 'pink';
    //console.log(pos.x, pos.y);
    ctx?.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    // ctx.strokeStyle = 'purple';
    // ctx.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.restore();
  }

}