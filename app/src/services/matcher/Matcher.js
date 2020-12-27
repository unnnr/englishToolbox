import EventsGreep from '@services/matcher/EventsGreep'
import Engine from '@services/matcher/Engine'
import Game from '@services/matcher/Game'
import View from '@services/matcher/View'

export default class Matcher {
  engine = null;

  world = {};

  constructor() {
    this.input = new EventsGreep(this.world);
    this.game = new Game(this.world);
    this.view = new View(this.world);

    this.engine = new Engine(this.loop);
  }

  update(time) {
    let event = this.input.proceed();
    this.game.update();
  }

  render() {
    console.log(1);
  }

  start() {
    this.game.start();
    this.engine.fire();
  }

  loop(time) {
    this.update(time);
    this.render()
  }
}