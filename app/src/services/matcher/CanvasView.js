import Config from '@services/matcher/Config'


export default class CanvasView {

  world = null;

  canvas = null;

  constructor(world, canvas) {
    this.canvas = canvas;
    this.world = world;
  }

  init() {
    this.canvas.height = Config.world.height;
    this.canvas.width = Config.world.width;

    this.context = this.canvas.getContext('2d');  
  }

  draw() {
    this.context.beginPath();

    this.context.fillRect(12, 12, 100, 100);
  }
}