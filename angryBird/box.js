
class Box extends Shape{
  constructor(world, x, y, w, h) {

    super(world);
    
    var options = {
      friction: 0.1,
      restitution: 0.2,
      collisionFilter: {
        category: 0x0001 // For preventing mouse drag 
      }
    }
    this.body = Bodies.rectangle(x, y, w, h);
    Body.setMass(this.body, this.body.mass * 5);
    this.img = new Image();
    this.img.src = "./resources/box.png";
    this.w = w;
    this.h = h;
    this.world = world;
    World.add(this.world, this.body);
    //Composite.add(this.world, this.body);
  }

  show(ctx) {

    let pos = this.body.position;
    let angle = this.body.angle;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle);
    let newPos = getRectPointFromCenter(pos.x, pos.y, this.w, this.h, true);
    ctx.drawImage(this.img, newPos.x, newPos.y, this.w, this.h);
    //ctx.fillStyle = this.color ?? 'orange';
    // ctx.fillRect(newPos.x, newPos.y, this.w, this.h);
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'brown';
    // ctx.strokeRect(newPos.x, newPos.y, this.w, this.h);
    ctx.translate(-pos.x, -pos.y);
    ctx.restore();
  }  

  removeFromWorld() {
    super.removeFromWorld(this.body);
  }

}