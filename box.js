class Box extends Shape{
  constructor(world, x, y, w, h) {

    super(world);
    
    var options = {
      friction: 0.1,
      restitution: 0.6
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h);
    this.w = w + range(0, 30);
    this.h = h + range(0, 30);
    console.log(this.w, this.h);
    this.world = world;
    Matter.World.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.fillStyle = 'hotpink'
    ctx.rotate(angle);
    let newPos = getRectPointFromCenter(pos.x, pos.y, this.w, this.h);
    ctx.fillRect(newPos.x, newPos.y, this.w, this.h);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'purple';
    ctx.strokeRect(newPos.x, newPos.y, this.w, this.h);
    
    ctx.translate(-pos.x, -pos.y);
    ctx.restore();
  }

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}