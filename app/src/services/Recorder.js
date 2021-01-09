class Recorder {
  samples = [
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '0 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '1 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '2 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '3 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '4 Some text, some text, some text, some text, some text, some text, some text, some text' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '5 Some text, some text, some text, some text, some text, some text, some text, some text' },
  ];

  history = [];

  current = -1;

  list() {
    return this.samples;
  }

  select(index) {
    if (index !== this.current && this.current > -1)
      this.remeber(this.current);
    
    this.current = index;
  
    return this.samples[index];
  }

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

export default Recorder;