class Recorder {
/*   samples = [
    {audio: 'https://englishnerd.org/storage/records/chin_chan.mp3', text: '近前看其詳上寫著 秦香蓮年三十二歲那狀告當朝 駙馬郎欺君王瞞皇上 那悔婚男兒招東床' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'auf' },
    {audio: 'https://englishnerd.org/storage/records/cow.mp3', text: 'Tylko jedno w głowie mam koksu pięć gram odlecieć sam W krainę za zapomnienia W głowie myśli mam kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz' },
  ]; */

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

  samples = [
    { audio: window.location.host + '/storage/records/0.mp3', text: `Perhaps you'd better look after the kid`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `We have been running this fishing school for three years and haven't had a dissatisfied customer yet`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `Now we've all got to know each other's names, we'll have some coffee`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `Two enormous green eyes had appeared among the leaves`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and then he ate some radishes...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `Next to his house was a piece of broken board...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `The silence in the dark house was broken only by the distant, grunting snores...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `...so you had brought the green one...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... like a leaf caught in an eddy`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and the whole story had come out`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... that has to be done in the morning...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `He drank some wine slowly`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `The two men drank`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... it was driven by Mr. McGregor`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `I drove from Minneapolis to Florida by back roads...`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `... but he didn't feel like eating alone.`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `He had never felt so lonely`},
    { audio: window.location.host + '/storage/records/0.mp3', text: `Simon felt clean, and relaxed, and hungry`},   
    { audio: window.location.host + '/storage/records/0.mp3', text: `You have forgotten the magic word`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Christopher Robin gave a deep sigh ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... gone forever ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I grew a beard`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He has gone to see his friend Pooh Bear...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I heard you quite well the first time`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I wish you would bring it out here`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... the real ending became inevitable`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... because of an almost invisible scar`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... Harry kept waking in the night ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and I kept travelling ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and l kept writing ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... so he kept himself in shape ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... until he had learnt it off by heart`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Harry left through the back door`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `You must have left it somewhere`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... in case he lost one ...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... you made a mistake`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... it made us rich`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Booked doesn't necessarily mean paid for, Mr Shaw`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `They let me down`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Ernest picked up the phone`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `What are you doing tonight?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Jason isn't looking rehabilitated`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Lizetty works as a customer service rep for 24000 dollars a year`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `We live in this basement apartment`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `And he owns the house with another guy`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `This is hard`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Jason is so frustrated`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Dealing with bad drivers is like trying to hurt cats`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `And you are the only one who can help me`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I am currently between homes`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I can find anyone or anything if the price is right`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I don't like being lectured`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... the executive committee meeting has already been put off twice...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Have you got your gun?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... when the doorbell rang...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `So for a week Christopher Robin read that sort of book...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and then he saw a friend of his`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... you saw how it was...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... that he had seen something like it somewhere...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Eyeore shook his had from side to side`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and the house might be sold by next week`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He stood up and stared out of the window at the square...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... when l was stuck...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He took off his jacket`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He took out a plump leg of lamb`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He opened the fridge and took out a bottle of champagne`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Somebody must have taken it`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He gazed miserably into the hedge`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Why are you staring at the hedge?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He did as he was told`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and he told the truth...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He took the champagne from the fridge`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `It was unblemished and unmarked`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and his shirt felt uncomfortably tight against his stomach`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Belinda went up the stairs into the undecorated part of the house`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... was thick with two years of undisturbed dust`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `uhelpful comment`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... and then, suddenly and unprofessionally she hugged him`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `We will be shopping for a holiday home in Majorca this time tomorrow`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `You won't be too sorry to go, will you?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `You will brake the habit of a lifetime, won't you?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `What would you like to eat?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `I'd never written anything divisive before.`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `l wrote a letter to my agent`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `So right now you have the the best partner in the world and you're screwing it up really`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... l work very, very hard. l like to reward myself`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... lt's just a metaphor, dude`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `l need this cigarettes`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `...you can have your whatever you gonna have, l'll have this`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... you keep anticipating what Lizetty wants and you keep freakin' guessing wrong, dude!`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... Lizetty worries that Ryan's eating out`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `What can l do for you boys?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... Deep debt and overdue taxes are hurting their marriage`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... How much is the coffee?`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Now with the baby on the way there is even more at stake!`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Maybe I'll have to raise this kid by myself...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... How much is tea? Fifty- three cents...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... l just talked to him because he was the only guy...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... And l thought he was reading Shakespeare...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... so he began to climb the tree...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Peter began to cry...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... She bought her loaf of brown bread...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He came to a pond...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He came to an open place in the middle of the forest...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... Mr Mc Gregor cought sight of him at the corner.`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `...l can eat it...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... Then flew gracefully into a gorse bush`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He found the door  in the wall...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... And then he got up...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He was enjoying his job. Although he wanted something that would challenge him more than it did`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `lt'll roll all over again`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `She sells seashells by the sea shore`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... But his eyes got larger and larger and his face got pinker and pinker...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He lost one of his shoes among the cabbages`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `That book was made by Mr Mark Twain`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `The same trend can be seen in Britain`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `On the morning of May eighteenth...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He's now been going for a.. forty six minutes`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Ryan earns a commission based income of ninety thousand dollars a year...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `His mother put him to bed...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He ran on four legs...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Average hourly earnings rose by 4.7 percent in April the biggest monthly gain on record`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `"l'll try", l said`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He sang a little song to himself...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `...Peter sat down to rest`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... She sat very, very still...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `She was a very beautiful young woman, although she look tired and fragile now...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `... He could smell the honey`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `Then you had better have the blue balloon...`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `He went back to his work`},    
    { audio: window.location.host + '/storage/records/0.mp3', text: `You look young. Clean living`},    
  ]
}

export default Recorder;