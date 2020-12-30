import MatterJs from 'matter-js'
import Collisions from '@services/matcher/Collisions'
import Groups from '@services/matcher/Groups'
import Bricks from '@services/matcher/Bricks'


class Events {
  collisionStart(event, engine) {
    for (let pair of event.pairs) {
      let second = pair.bodyA;
      let first = pair.bodyB;

      if (first.label === 'brick' && second.label === 'brick') {
        if (!!!Groups.merge(first, second, engine.world))
          Collisions.collideBricks(first, second);
        return;
      }

      if (first.label === 'group' && second.label === 'brick') {
        if (!!!Groups.append(first, second))
          Collisions.collideGroup(first, second);
        return
      }

      if (second.label === 'group' && first.label === 'brick') {
        if (!!!Groups.append(second, first))
          Collisions.collideGroup(second, first);
        return
      }
    }
  }

  afterRender(event, render) {
    Bricks.drawText(render)
  }

  bind(engine, render) {
    MatterJs.Events.on(engine, 'collisionStart', 
      (event) => this.collisionStart(event, engine));
      
    MatterJs.Events.on(render, 'afterRender',
      (event) => this.afterRender(event, render));
  }
}

export default new Events()