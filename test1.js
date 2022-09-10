
class App {
  constructor() {
    this.setup();
  }
  setup() {

    this.engine = new Matter.Engine.create();
    this.render = Matter.Render.create({
      element: document.body,
      engine: this.engine
    });

    this.box1 = Matter.Bodies.rectangle(400, 200, 80, 80);
    this.box2 = Matter.Bodies.rectangle(450, 50, 80, 80);
    this.box3 = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Matter.Composite.add(this.engine.world, [this.box1, this.box2, this.box3]);
    Matter.Render.run(this.render);
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

  }

}

window.onload = () => {
  new App();
}

