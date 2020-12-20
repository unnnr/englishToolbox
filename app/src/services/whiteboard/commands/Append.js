export default class Append {
  element = null;

  drawings = null;

  constructor(element, drawings) {
    this.drawings =  drawings;
    this.element = element;
  }

  execute() {
    this.drawings.push(this.element);
  }

  undo() {
    this.drawings.remove(this.element);
  }
}