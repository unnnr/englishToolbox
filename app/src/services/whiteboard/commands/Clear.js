export default class Clear {
  snapshot = null;

  drawings = null;

  constructor(drawings) {
    this.snapshot = drawings.collection;
    this.drawings= drawings;
  }

  execute() {
    this.drawings.clear();
  }

  undo() {
    this.drawings.clear(this.snapshot);
  }
}