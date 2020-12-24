export default class Remove {
  el = null;
  
  drawings = null;

  constructor(el, drawings) {
    this.drawings = drawings
    this.el = el;
  }

  execute() {
    return this.drawings.remove(this.el);
  }

  async undo() {
    this.el = 
      await this.drawings.push(this.el.body);
  }
}