class Builder {
  samples = [
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '0 Some text, some text, some text, some text, some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '1 Some text, some text, some text, some text, some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '2 Some text, some text, some text, some text, some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '3 Some text, some text, some text, some text, some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '4 Some text, some text, some text, some text, some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '5 Some text, some text, some text, some text, some text?' },
  ];

  history = [];

  current = -1;

  next() {
    if (this.samples.length < 2)
      return this.samples[0];

    let index;
    do 
      index = Math.floor(Math.random() * (this.samples.length - 1));
    while (this.current === index)

    this.current = index;
    
    return this.compute(this.samples[index]);
  }

  check(words, sample) {
    console.log(words, sample);
  }

  compute(sample) {
    let audio = sample.audio;

    let raw = sample.text.split(/\s+/);

    let words = raw.map((text, key) => ({
      text, key
    }));

    return { audio, words }
  }
}

export default Builder;