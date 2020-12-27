export default class Engine {   
  _paused = false;

  _previosTime = null;
  
  constructor(callback) {
    this.callback = callback;
  }

  loop() {
    if (this._paused)
      return;
    
    let delta = Date.now() - this._previosTime;
    this.callback(delta);

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