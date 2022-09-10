class Boundary {
  constructor(world, x, y, w, h, angle = 0) {

    var options = {
      friction: 0.1,
      restitution: 0.6,
      isStatic: true,
      angle: angle * Math.PI /180
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    //ctx.rotate(angle * Math.PI /180);
    ctx.rotate(angle);
    ctx.fillStyle = 'green';
    //console.log(-this.w/2, -this.h/2);
    ctx?.fillRect(-this.w/2, -this.h/2, this.w, this.h);

    ctx.translate(-pos.x, -pos.y);
    ctx.restore();
  }

  

}