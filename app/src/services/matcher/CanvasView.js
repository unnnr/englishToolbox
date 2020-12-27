export default class CanvasView {

  world = null;

  canvas = null;

  constructor(world, canvas) {
    this.canvas = canvas;
    this.world = world;
  }

  draw() {
    console.log('drawing')
  }
}