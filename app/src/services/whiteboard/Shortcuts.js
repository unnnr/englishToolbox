class Shortcuts {
  CLOSE = 'Escape'; 
  
  BACK = 'z';

  listeners = {
    //
  };

  listen(name, event) {
    if (!!!this.listeners[name])
      this.listeners[name] = [];

    this.listeners[name].push(event);
  }

  forgot(name, event) {
    if (!!!this.listeners[name])
      return;

    let index = this.listeners[name].indexOf(event);
    if (index === -1)
      return;
    this.listeners[name].splice(index, -1);

    if (!!!Object.entries(this.listeners).length)
      delete this.listeners[name]
  }

  bind() {
    this.$prooced = this.prcoceed.bind(this);

    window.addEventListener('keyup', this.$prooced);
  }

  unbind() {
    window.removeEventListener('keyup', this.$prcoceed);
  }

  prcoceed(event) {
    if (!!!event.ctrlKey && event.key !== 'Escape')
      return;

    let list = this.listeners[event.key];
    if (!!!list)
      return;
      
    for (let lisnter of list)
      lisnter();
  }
}

window.Shortcuts = new Shortcuts();
export default window.Shortcuts;