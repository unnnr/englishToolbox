export default class History {
  logs = [];

  length = 10;

  position = -1;

  push(command) {
    // Breaking branch
    this.position++;

    this.logs.splice(this.position);
    this.logs.push(command);

    console.log('PUSH', this.position, this.logs);
  }

  redo() {
    if (this.position >= this.logs.length - 1)
      return false;

    this.position++;
    let current = this.logs[this.position];

    current.execute();

    console.log('REDO', this.position);
  }

  undo() {
    if (this.position < 0)
      return false;
    
    let current = this.logs[this.position];
    this.position--;

    current.undo();

    console.log('UNDO', this.position);
  }
}