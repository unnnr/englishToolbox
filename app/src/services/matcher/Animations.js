import {World} from 'matter-js'
import Config from '@services/matcher/Config'


class Animations {
  animations = [];

  previousStamp = 0;

  clear() {
    this.animations = [];
  }

  blink(target, seconds = .3) {
    let duration = seconds * 1000;
    let initial = el.render.fillStyle;

    for (let animation of this.animations) {
      if (animation.type !== 'blink' || target.id !== animation.target.id)
        continue;

      el.remained = el.duration = seconds * 1000;
      return;
    }

    let animation = {
      remained: duration,
      type: 'blink',

      duration,
      target,
      
      fire: () => {
        target.render.fillStyle = initial; 
      },

      update: (progress) =>{
        target.render.fillStyle = 'red'; 
      }
    }

    this.animations.push(animation);
  }

  fade(target, world, seconds = .3) {
    let duration = seconds * 1000;
    let animation = {
      remained: duration,
      type: 'fade',
      
      duration, 
      target,

      fire: () => 
        World.remove(world, target),

      update: (progress) =>
        target.render.opacity = progress / 100
    }

    target.label = 'fade_animation';

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