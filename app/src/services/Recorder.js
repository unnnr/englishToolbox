class Recorder {
/*   samples = [
    {audio: 'https://englishnerd.org/storage/records/chin_chan.mp3', text: '近前看其詳上寫著 秦香蓮年三十二歲那狀告當朝 駙馬郎欺君王瞞皇上 那悔婚男兒招東床' },
    {audio: 'https://englishnerd.org/storage/records/auf.mp3', text: 'auf' },
    {audio: 'https://englishnerd.org/storage/records/cow.mp3', text: 'Tylko jedno w głowie mam koksu pięć gram odlecieć sam W krainę za zapomnienia W głowie myśli mam kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz' },
  ]; */

  history = [];

  current = -1;


  constructor() {
    this,preparse();
  }


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

  preparse() {
    let url = 'https://' + window.location.host + '/storage/records/';

    for (let index in this.samples) {
      let sample = this.samples[index];
      sample.audio = url + index;
    }
  }

  samples = [
    { text: `Perhaps you'd better look after the kid`},
  
    { text: `We have been running this fishing school for three years and haven't had a dissatisfied customer yet`},
    { text: `Now we've all got to know each other's names, we'll have some coffee`},
    { text: `Two enormous green eyes had appeared among the leaves`},
    { text: `... and then he ate some radishes...`},
    { text: `Next to his house was a piece of broken board...`},
    { text: `The silence in the dark house was broken only by the distant, grunting snores...`},
    { text: `...so you had brought the green one...`},
    { text: `... like a leaf caught in an eddy`},
    { text: `... and the whole story had come out`},
    { text: `... that has to be done in the morning...`},
    
    { text: `He drank some wine slowly`},
    { text: `The two men drank`},
    { text: `... it was driven by Mr. McGregor`},
    { text: `I drove from Minneapolis to Florida by back roads...`},
    { text: `... but he didn't feel like eating alone.`},
    { text: `He had never felt so lonely`},
    { text: `Simon felt clean, and relaxed, and hungry`},   
    { text: `You have forgotten the magic word`},    
    { text: `Christopher Robin gave a deep sigh ...`},    
    { text: `... gone forever ...`},    
    
    { text: `I grew a beard`},    
    { text: `He has gone to see his friend Pooh Bear...`},    
    { text: `I heard you quite well the first time`},    
    { text: `I wish you would bring it out here`},    
    { text: `... the real ending became inevitable`},    
    { text: `... because of an almost invisible scar`},    
    { text: `... Harry kept waking in the night ...`},    
    { text: `... and I kept travelling ...`},    
    { text: `... and l kept writing ...`},    
    { text: `... so he kept himself in shape ...`},       
  
    { text: `... until he had learnt it off by heart`},     
    { text: `Harry left through the back door`},    
    { text: `You must have left it somewhere`},    
    { text: `... in case he lost one ...`},    
    { text: `... you made a mistake`},    
    { text: `... it made us rich`},    
    { text: `Booked doesn't necessarily mean paid for, Mr Shaw`},    
    { text: `They let me down`},    
    { text: `Ernest picked up the phone`},    
    { text: `What are you doing tonight?`},    
    
    { text: `Jason isn't looking rehabilitated`},    
    { text: `Lizetty works as a customer service rep for 24000 dollars a year`},    
    { text: `We live in this basement apartment`},    
    { text: `And he owns the house with another guy`},    
    { text: `This is hard`},    
    { text: `Jason is so frustrated`},    
    { text: `Dealing with bad drivers is like trying to hurt cats`},    
    { text: `And you are the only one who can help me`},    
    { text: `I am currently between homes`},    
    { text: `I can find anyone or anything if the price is right`}, 

    { text: `I don't like being lectured`},    
    { text: `... the executive committee meeting has already been put off twice...`},    
    { text: `Have you got your gun?`},    
    { text: `... when the doorbell rang...`},    
    { text: `So for a week Christopher Robin read that sort of book...`},    
    { text: `... and then he saw a friend of his`},    
    { text: `... you saw how it was...`},    
    { text: `... that he had seen something like it somewhere...`},    
    { text: `Eyeore shook his had from side to side`},    
    { text: `... and the house might be sold by next week`},    
    
    { text: `He stood up and stared out of the window at the square...`},    
    { text: `... when l was stuck...`},    
    { text: `He took off his jacket`},    
    { text: `He took out a plump leg of lamb`},    
    { text: `He opened the fridge and took out a bottle of champagne`},    
    { text: `Somebody must have taken it`},    
    { text: `He gazed miserably into the hedge`},    
    { text: `Why are you staring at the hedge?`},    
    { text: `He did as he was told`},    
    { text: `... and he told the truth...`},    
    
    { text: `He took the champagne from the fridge`},    
    { text: `It was unblemished and unmarked`},    
    { text: `... and his shirt felt uncomfortably tight against his stomach`},    
    { text: `Belinda went up the stairs into the undecorated part of the house`},    
    { text: `... was thick with two years of undisturbed dust`},    
    { text: `uhelpful comment`},    
    { text: `... and then, suddenly and unprofessionally she hugged him`},    
    { text: `We will be shopping for a holiday home in Majorca this time tomorrow`},    
    { text: `You won't be too sorry to go, will you?`},    
    { text: `You will brake the habit of a lifetime, won't you?`},    
    
    { text: `What would you like to eat?`},    
    { text: `I'd never written anything divisive before.`},    
    { text: `l wrote a letter to my agent`},    
    { text: `So right now you have the the best partner in the world and you're screwing it up really`},    
    { text: `... l work very, very hard. l like to reward myself`},    
    { text: `... lt's just a metaphor, dude`},    
    { text: `l need this cigarettes`},    
    { text: `...you can have your whatever you gonna have, l'll have this`},    
    { text: `... you keep anticipating what Lizetty wants and you keep freakin' guessing wrong, dude!`},    
    { text: `... Lizetty worries that Ryan's eating out`},    
    
    { text: `What can l do for you boys?`},    
    { text: `... Deep debt and overdue taxes are hurting their marriage`},    
    { text: `... How much is the coffee?`},    
    { text: `Now with the baby on the way there is even more at stake!`},    
    { text: `Maybe I'll have to raise this kid by myself...`},    
    { text: `... How much is tea? Fifty- three cents...`},    
    { text: `... l just talked to him because he was the only guy...`},    
    { text: `... And l thought he was reading Shakespeare...`},    
    { text: `... so he began to climb the tree...`},    
    { text: `Peter began to cry...`},    
    
    { text: `... She bought her loaf of brown bread...`},    
    { text: `... He came to a pond...`},    
    { text: `... He came to an open place in the middle of the forest...`},    
    { text: `... Mr Mc Gregor cought sight of him at the corner.`},    
    { text: `...l can eat it...`},    
    { text: `... Then flew gracefully into a gorse bush`},    
    { text: `... He found the door  in the wall...`},    
    { text: `... And then he got up...`},    
    { text: `He was enjoying his job. Although he wanted something that would challenge him more than it did`},    
    { text: `lt'll roll all over again`},    
    
    { text: `She sells seashells by the sea shore`},    
    { text: `... But his eyes got larger and larger and his face got pinker and pinker...`},    
    { text: `... He lost one of his shoes among the cabbages`},    
    { text: `That book was made by Mr Mark Twain`},    
    { text: `The same trend can be seen in Britain`},    
    { text: `On the morning of May eighteenth...`},    
    { text: `... He's now been going for a.. forty six minutes`},    
    { text: `Ryan earns a commission based income of ninety thousand dollars a year...`},    
    { text: `His mother put him to bed...`},    
    { text: `... He ran on four legs...`},    
    
    { text: `Average hourly earnings rose by 4.7 percent in April the biggest monthly gain on record`},    
    { text: `"l'll try", l said`},    
    { text: `... He sang a little song to himself...`},    
    { text: `...Peter sat down to rest`},    
    { text: `... She sat very, very still...`},    
    { text: `She was a very beautiful young woman, although she look tired and fragile now...`},    
    { text: `... He could smell the honey`},    
    { text: `Then you had better have the blue balloon...`},    
    { text: `He went back to his work`},    
    { text: `You look young. Clean living`},    
  ]
}

export default Recorder;