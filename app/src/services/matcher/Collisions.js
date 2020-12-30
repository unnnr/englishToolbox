import {Body} from 'matter-js'
import Config from '@services/matcher/Config'


class Collisions {
  collideGroup(group, brick) {
    let center = {
      x: group.position.x,
      y: group.position.y,
    }

    let direction = {
      x: brick.position.x < center.x ? -1 : 1,
      y: brick.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(brick, {
      x: Config.brick.exposionVelocity * direction.x,
      y: Config.brick.exposionVelocity * direction.y,
    });
  }

  collideBricks(first, second) {
    // Computing center between pair
    let center = {
      x: first.position.x + (second.position.x - first.position.x) / 2,
      y: first.position.y + (second.position.y - first.position.y) / 2,
    };

    let direction = null;

    // Throwing first away from center
    direction = {
      x: first.position.x < center.x ? -1 : 1,
      y: first.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(first, {
      x: Config.brick.exposionVelocity * direction.x + first.velocity.x,
      y: Config.brick.exposionVelocity * direction.y + first.velocity.y,
    });

    // Throwing second away from center
    direction = {
      x: second.position.x < center.x ? -1 : 1,
      y: second.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(second, {
      x: Config.brick.exposionVelocity * direction.x + second.velocity.x,
      y: Config.brick.exposionVelocity * direction.y + second.velocity.y,
    });
  }
}

export default new Collisions();