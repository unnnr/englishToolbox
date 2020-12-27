import Engine from '@services/matcher/Engine'

export default class Matcher {
  engine = null;

  update() {
    let event = this.eventGreep.proceed();
  }

  constructor() {
    this.engine = new Engine(this.update, this.render)
  }
}