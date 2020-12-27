export default class Engine {   
  _paused = false;

  _previosTime = null;
  
  constructor(update, render) {
    this.update = update;
    this.render = render;
  }

  loop() {
    if (this._paused)
      return;
    
    let delta = Date.now() - this._previosTime;
    this.update(delta);

    this.render();
    
    this._previosTime = Date.now();
    requestAnimationFrame(this.loop);
  }

  fire() {
    this._paused = false;
    this._previosTime = Date.now();

    this.loop();
  }

  pause() {
    this._paused = true;
  }
} 