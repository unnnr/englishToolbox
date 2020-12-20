export default class Remove {
  element = null;

  drawings = null;

  constructor(element, drawings) {
    this.drawings = drawings
    this.element = element;
  }

  execute() {
    this.drawings.remove(this.element);
  }

  undo() {
    this.drawings.push(this.element);
  }
}