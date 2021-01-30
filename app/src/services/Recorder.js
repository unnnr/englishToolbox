class Recorder {
  samples = [
    {audio: 'https://englishnerd.org/storage/records/chin_chan.mp3', text: '近前看其詳上寫著 秦香蓮年三十二歲那狀告當朝 駙馬郎欺君王瞞皇上 那悔婚男兒招東床' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'auf' },
    {audio: 'https://englishnerd.org/storage/records/cow.mp3', text: 'Tylko jedno w głowie mam koksu pięć gram odlecieć sam W krainę za zapomnienia W głowie myśli mam kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz' },
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
      index = Math.floor(Math.random() * (this.samples.length ));
    while (this.current === index)

    if (this.current > -1)
      this.remeber(this.current);
      
    this.current = index;
    
    return this.samples[index];
  }
}

export default Recorder;