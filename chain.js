class Chain {
  constructor(world, x, height) {

    this.world = world;
    let prev = null;
    this.chain = [];
    for ( let i = 30; i < height / 2; i += 50) {
      var fixed = false;
      if (!prev) {
        fixed = true;
      }

      const p = new Circle(world, x + i, 30, 20, fixed);
      this.chain.push(p);
    
      if (prev) {
        const options = {
          bodyA: p.body,
          bodyB: prev.body,
            pointA: {
              x: 0,
              y: 0
          },
          length: 50,
          stiffness: 0.5
        }
        this.constraint = Matter.Constraint.create(options);
        Matter.World.add(this.world, this.constraint);
      }
      prev = p;
    }
  }

  show(ctx) {

    // draw circle
    for (let i = 0; i < this.chain.length; i++) {
      this.chain[i].show(ctx);
    }

    //draw line
    ctx.strokeStyle = 'salmon';
    ctx.beginPath();
    
    let prev = this.chain[0];
    for (let i = 1; i < this.chain.length; i++) {
      ctx.moveTo(prev.body.position.x, prev.body.position.y)
      ctx.lineTo(this.chain[i].body.position.x, this.chain[i].body.position.y);
      prev = this.chain[i];
    }
    ctx.stroke();

  }


}