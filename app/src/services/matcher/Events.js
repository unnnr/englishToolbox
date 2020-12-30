import MatterJs from 'matter-js'
import Collisions from '@services/matcher/Collisions'
import Bricks from '@services/matcher/Bricks'

class Events {
  collisionStart(event) {
    for (let pair of event.pairs) {
      let second = pair.bodyA;
      let first = pair.bodyB;

      if (first.label === 'brick' && second.label === 'brick') {
        if (!!!Group.merge(first, second))
          Collisions.collideBricks(first, second);
        return;
      }

      if (first.label === 'group' && second.label === 'brick') {
        if (!!!Group.append(first, second))
          Collisions.collideGroup(first, second);
        return
      }

      if (second.label === 'group' && first.label === 'brick') {
        if (!!!Group.append(second, first))
          Collisions.collideGroup(second, first);
        return
      }
    }
  }

  afterRender(render) {
    Bricks.drawText(render)
  }

  bind(engine, render) {
    MatterJs.Events.on(engine, 'collisionStart', this.collisionStart);
    MatterJs.Events.on(render, 'afterRender',this.afterRender.bind(this, render));
  }
}

export default new Events()