class Recorder {
  samples = [
    {text: '0 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {text: '1 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {text: '2 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {text: '3 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {text: '4 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {text: '5 Some text, some text, some text, some text, some text, some text, some text, some text' },
  ];

  history = [];

  current = -1;

  remeber(index) {
    this.history.push(index);
  }

  prev() {
    if (!!!this.history.length)
      return null;

    let index = 
      this.history.pop();

    return this.samples[index];
  }

  next() {
    if (this.samples.length < 2)
      return this.samples[0];

    let index;
    do 
      index = Math.floor(Math.random() * (this.samples.length - 1));
    while (this.current === index)

    if (this.current > -1)
      this.remeber(this.current);
      
    this.current = index;
    
    return this.samples[index];
  }
}

export default new Recorder();