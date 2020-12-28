import Config from '@services/matcher/Config'


export default class CanvasView {

  world = null;

  canvas = null;

  constructor(world, canvas) {
    this.canvas = canvas;
    this.world = world;
  }

  init() {
    this.canvas.height = this.world.height;
    this.canvas.width = this.world.width;

    this.context = this.canvas.getContext('2d');  
    this.context.font = Config.brick.fontSize + 'px serief';
  }

  draw() {
    this.context.beginPath();


    for (let brick of this.world.entities) {
      this.context.fillText(brick.word.verb, brick.position.x, brick.position.y)
    }
  }
}