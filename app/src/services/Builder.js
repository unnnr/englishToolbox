class Builder {
  samples = [
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '0 some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '1 some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '2 some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '3 some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '4 some text?' },
    {audio: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', text: '5 some text?' },
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

  check(words, sampleWords) {
    if (words.length !== sampleWords.length)
      return false;

    for (let i = 0; i < words.length; i++) {
      let sample = sampleWords[i].text;
      let builded = words[i].text;

      if (sample.toLowerCase() !== builded.toLowerCase())
        return false;
    } 

    return true;
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