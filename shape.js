class Shape {
  constructor(world) {
    this.world = world;
  }

  isOffScreen(screenHeight) {
    let pos = this.body.position;
    return (pos.y > screenHeight + 100);
  }

  isXOffScreen(screenWidth) {
    let pos = this.body.position;
    return (pos.x < 0 - 30 || pos.x > screenWidth + 30);
  }

  removeFromWorld(body) {
    Matter.World.remove(this.world, body);
  }

}