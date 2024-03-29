import {World} from 'matter-js'


class Animations {
  animations = [];

  previousStamp = 0;

  _hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  clear() {
    this.animations = [];
    this.previousStamp = 0;
  }

  blink(target, seconds = .5) {
    let duration = seconds * 1000;
    let initial = el.render.strokeStyle;

    let from = this._hexToRgb('#ff0000');
    let to = this._hexToRgb(initial);

    if (!!!el.cachedColor)
      el.cachedColor = initial;

    let animation = {
      remained: duration,
      type: 'blink',

      duration,
      target,
      
      fire: () => {
        target.render.strokeStyle = el.cachedColor; 
      },

      update: (progress) =>{
        if (!!!to || !!!from) {
          target.render.strokeStyle = 'red'; 
          return;
        }

        let color = {
          r: to.r + (from.r - to.r) * progress / 100,
          g: to.g + (from.g - to.g) * progress / 100,
          b: to.b + (from.b - to.b) * progress / 100,
        }

        target.render.strokeStyle = 
          `rgb(${color.r},${color.g},${color.b})` 
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

  remove(target) {
    for (let i = 0; i < this.animations.length; i++) {
      let animation = this.animations[i];

      if (animation.target !== target)
        continue;
      
      this.animations.splice(i, 1);
      return;
    }
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