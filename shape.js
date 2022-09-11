class Shape {
  constructor(world) {
    this.world = world;
  }

  isOffScreen(screenHeight) {
    let pos = this.body.position;
    return (pos.y > screenHeight + 100);
  }

  removeFromWorld(body) {
    Matter.World.remove(this.world, body);
  }

}