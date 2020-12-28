import EventsGreep from '@services/matcher/EventsGreep'
import CanvasView from '@services/matcher/CanvasView'
import Engine from '@services/matcher/Engine'
import Game from '@services/matcher/Game'

export default class Matcher {
  engine = null;

  world = {};

  constructor(canvas) {
    this.input = new EventsGreep(this.world);
    this.view = new CanvasView(this.world, canvas);
    this.game = new Game(this.world);

    this.engine = new Engine(this.loop.bind(this));
  }

  update(time) {
    let event = this.input.proceed();
    this.game.update(event, time);
  }

  render() {
    this.view.draw();
  }

  start() {
    this.game.init();
    this.view.init();
    this.engine.fire();
  }

  stop() {
    this.world = {};
    this.input.unbind();
  }

  loop(time) {
    this.update(time);
    this.render()
  }
}