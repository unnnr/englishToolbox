import {World} from 'matter-js'
import Config from '@services/matcher/Config'


class Animations {
  animations = [];

  previousStamp = 0;

  fade(el, world, seconds = .3) {
    let duration = seconds * 1000;

    let animation = {
      duration, remained: duration, 
      
      fire: () => 
        World.remove(world, el),

      update: (progress) =>
        el.render.opacity = progress / 100
    }

    this.animations.push(animation);
  }

  fireAnimation(animation) {
    let index = this.animations.indexOf(animation);
    if (index !== -1)
      this.animations.splice(index, 1)

    animation.fire();
  }

  updateAnimation(animation) {
    let progress = 
      animation.remained * 100 / animation.duration;

    animation.update(progress);
  }

  update(event) {
    for (let animation of this.animations) {
      animation.remained -= 
        event.timestamp - this.previousStamp;

      if (animation.remained > 0)
        this.updateAnimation(animation);
      else
        this.fireAnimation(animation);
    }

    this.previousStamp = event.timestamp;
  }
}

export default new Animations();