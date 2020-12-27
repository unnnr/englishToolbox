export default class CanvasView {
  world = null;

  constructor(world) {
    this.world = world;
  }

  draw() {
    console.log('drawing')
  }
}