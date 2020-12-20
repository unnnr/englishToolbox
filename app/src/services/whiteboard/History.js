export default class History {
  logs = [];

  length = 10;

  position = 0;

  append(command) {
    // Creating new branch
    this.logs.splice(this.position);

    this.logs.push(command);
    this.position++;
  }

  redo() {
    if (this.position >= this.logs.length)
      return false;

    let current = this.logs[this.position];
    this.position++;

    current.execute();
  }

  undo() {
    if (this.position < 0)
      return false;
      
    this.position--;
    let current = this.logs[this.position];

    current.undo();
  }
}