class Builder {
  samples = [
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'I am a dummy text, try to build me up' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'I am a dummy text, try to build me up' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'I am a dummy text, try to build me up' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'I am a dummy text, try to build me up' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'I am a dummy text, try to build me up' },
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