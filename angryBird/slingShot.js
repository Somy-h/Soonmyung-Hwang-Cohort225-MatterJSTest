class SlingShot {
  constructor(world, x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40
    }
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  show(ctx) {
    if (this.sling.bodyB) {
      let posA = this.sling.pointA;
      let posB = this.sling.bodyB.position;
      ctx.strokeStyle = this.color ?? 'black';
      ctx.beginPath();
      ctx.moveTo(posA.x, posA.y);
      ctx.lineTo(posB.x, posB.y);
      ctx.stroke();
    }
  }

  // After bird flew and fell then set up the sling and bird
  attach(birdBody) {
    if (!this.sling.bodyB) {
      this.sling.bodyB = birdBody;
    }
  }

  // When mouse release, bird should fly
  detach() {
    //console.log(this.sling.pointA.x, this.sling.bodyB.position.x)
    //if (this.sling.pointA.x < this.sling.bodyB.position.x) {
      this.sling.bodyB = null;
    //}
  }
}