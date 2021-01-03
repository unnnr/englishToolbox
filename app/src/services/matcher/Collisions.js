import {Body} from 'matter-js'
import Config from '@services/matcher/Config'


class Collisions {
  throwBrick(brick, center, strength) {
    if (strength === null)
      return;

    let direction = {
      x: brick.position.x < center.x ? -1 : 1,
      y: brick.position.y < center.y ? -1 : 1,
    };
    
    Body.setVelocity(brick, {
      x: direction.x * strength,
      y: direction.y * strength,
    });
  }

  collideGroup(group, brick, captured) {
    let center = {
      x: group.position.x,
      y: group.position.y,
    }

    let strength = captured ? 
      Config.group.explosionActive :
      Config.group.explosionPassive; 

    let bricks = [...group.bricks, brick];
    for (let brick of bricks)
      this.throwBrick(brick, center, strength);
  }

  collideBricks(first, second, captured) {
    let strength = captured ? 
      Config.brick.explosionActive :
      Config.brick.explosionPassive;

    // Computing center between pair
    let center = {
      x: first.position.x + (second.position.x - first.position.x) / 2,
      y: first.position.y + (second.position.y - first.position.y) / 2,
    };

    this.throwBrick(first, center, strength);
    this.throwBrick(second, center, strength);
  }
}

export default new Collisions();