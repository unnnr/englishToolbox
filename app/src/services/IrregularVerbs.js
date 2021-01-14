class IrreguarVerbs {
  groupLength = 7;

  search(input) {
    let trimed = input.trim();

    if (!!!trimed.length)
      return -1;

    for (let i = 0; i < this.verbs.length; i++) {
      if (trimed == i + 1)
        return i;
      
      for (let word of this.verbs[i]) {
        if (word.includes(trimed))
          return i;
      }
    }

    return -1;
  }

  groups() {
    let groups = [];
    let chunk = [];

    for (let i = 0; i < this.verbs.length; i++) {
      if (chunk.length === this.groupLength) {
        groups.push(chunk);
        chunk = [];
      }

      chunk.push(this.verbs[i]);
    }

    groups.push(chunk);
    return groups;
  }

  list() {
    return this.verbs;
  }

  verbs = [
    ['Be','was/were','been'],
    ['Go','went','gone'],
    ['Come','came','come'],
    ['See','saw','seen'],
    ['Hear','heard','heard'],
    ['Say','said','said'],
    ['Tell','told','told'],
    
    ['Do','did','done'],
    ['Make','made','made'],
    ['Pay','paid','paid'],
    ['Keep','kept','kept'],
    ['Hold','held','held'],
    ['Spend','spent','spent'],
    ['Get','got','got'],
    
    ['Drink','drank','drunk'],
    ['Eat','ate','eaten'],
    ['Have','had','had'],
    ['Take','took','taken'],
    ['Sit','sat','sat'],
    ['Can','could'],
    ['Leave','left','left'],
    
    ['Forget','forgot','forgotten'],
    ['Know','knew','known'],
    ['Draw','drew','drawn'],
    ['Hide','hid','hidden'],
    ['Find','found','found'],
    ['Learn','learnt','learnt'],
    ['Mean','ment','ment'],
    
    ['Read','read','read'],
    ['Write','wrote','written'],
    ['Choose','chose','chosen'],
    ['Begin','','began','begun'],
    ['Send','sent','sent'],
    ['Win','won','won'],
    ['Shut','shut','shut'],
    
    ['Swim','swam','swum'],
    ['Run','ran','run'],
    ['Wake','woke','woken'],
    ['Understand','understood','understood'],
    ['Cut','cut','cut'],
    ['Lead','led','led'],
    ['Catch','caught','caught'],
    
    ['Fall','fell','fallen'],
    ['Give','gave','given'],
    ['Buy','bough','bought'],
    ['Show','showed','shown'],
    ['Stand','stood','stood'],
    ['Undo','undid','undone'],
    ['Mistake','mistook','mistaken'],
    
    ['Meet','met','met'],
    ['Teach','taught','taught'],
    ['Let','let','let'],
    ['Bend','bent','bent'],
    ['Feed','fed','fed'],
    ['Shake','shook','shaken'],
    ['Ride','rode','ridden'],
    
    ['Bring','brought','brought'],
    ['Think','thought','thought'],
    ['Spin','spun','spun'],
    ['Lose','lost','lost'],
    ['Sell','sold','sold'],
    ['Fly','flew','flown'],
    ['Blow','blew','blown'],
    
    ['Hit','hit','hit'],
    ['Bite','bit','bitten'],
    ['Lie','lay','lain'],
    ['Fight','fought','fought'],
    ['Shoot','shot','shot'],
    ['Put','put','put'],
    ['Wear','wore','worn'],
    
    ['Stink','stank','stunk'],
    ['Set','set','set'],
    ['Sleep','slept','slept'],
    ['Deal','dealt','dealt'],
    ['Kneel','knelt','knelt'],
    ['Drive','drove','driven'],
    ['Bear','bore','born'],
    
    ['Hurt','hurt','hurt'],
    ['Sweep','swept','swept'],
    ['Rise','rose','risen'],
    ['Smell','smelt','smelt'],
    ['Speak','spoke','spoken'],
    ['Tear','tore','torn\t'],
    ['Steal','stole','stolen'],
    
    ['Spread','spread','spread'],
    ['Rend','rent','rent'],
    ['Weep','wept','wept'],
    ['Become','became','become'],
    ['Forgive','forgave','forgiven'],
    ['Lay','laid','laid'],
    ['Break','broke','broken'],

    ['Beat','beat','beaten'],
    ['Feel','felt','felt'],
    ['Grow','grew','grown'],
    ['Dream','dreamt','dreamt'],
    ['Leap','leapt','leapt'],
    ['Rid','rid','rid'],
    ['Throw','threw','thrown'],
    
    ['Build','built','built'],
    ['Freeze','froze','frozen'],
    ['Flee','fled','fled'],
    ['Upset','upset','upset'],
    ['Ring','rang','rung'],
    ['Speed','sped','sped'],
    ['Withdraw','withdrew','withdrawn'],
    
    ['Abide','abode','abode'],
    ['Breed','bred','bred'],
    ['Hang','hung','hung'],
    ['Forecast','forecast','forecast'],
    ['Lean','leant','leant'],
    ['Split','split','split'],
    ['Weave','wove','woven'],
    
    ['Dwell','dwelt','dwelt'],
    ['Shine','shone','shone'],
    ['Slide','slid','slid'],
    ['Wind','wound','wound'],
    ['Swear','swore','sworn'],
    ['Tread','trod','trodden'],
    ['Sink','sank','sunk'],
    
    ['Spring','sprang','sprung'],
    ['Burn','burnt','burnt'],
    ['Cost','cost','cost'],
    ['Forbid','forbade','forbidden'],
    ['Lend','lent','lent'],
    ['Overhear','overheard','overheard'],
    ['Spoil','spoilt','spoilt'],
    
    ['Smite','smote','smitten'],
    ['Sling','slung','slung'],
    ['Shed','shed','shed'],
    ['Strike','struck','struck'],
    ['Burst','burst','burst'],
    ['Grind','ground','ground'],
    ['Foresee','foresaw','foreseen'],
    
    ['Bind','bound','bound['],
    ['Awake','awoke','awoken'],
    ['Fling','flung','flung'],
    ['Oversleep','overslept','overslept'],
    ['Shrink','shrank','shrunk'],
    ['Slit','slit','slit'],
    ['Undertake','undertook','undertaken'],
    
    ['Withstand','withstood','withstood'],
    ['Slink','slunk','slunk'],
    ['Strive','strove','striven'],
    ['Bleed','bled','bled'],
    ['Cast','cast','cast'],
    ['Interweave','interwove','interwoven'],
    ['Bid','bade','bidden'],
    
    ['Broadcast','broadcast','broadcast'],
    ['Dig','dug','dug'],
    ['Bet','bet','bet'],
    ['Seek','sought','sought'],
    ['Stick','stuck','stuck'],
    ['Wring','wrung','wrung'],
    ['Thrust','thrust','thrust'],
    
    ['Befall','befell','befallen'],
    ['Cling','clung','clung'],
    ['Sing','sang','sung'],
    ['Swing','swung','swung'],
    ['Slay','slew','slain'],
    ['Beset','beset','beset'],
    ['Creep','crept','crept'],
    
    ['Beget','begot','begotten'],
    ['Bespeak','bespoke','bespoken'],
    ['Bestride','bestrode','bestridden'],
    ['Forsake','forsook','forsaken'],
    ['Spit','spat','spat'],
    ['Sting','stung','stung'],
    ['Shrive','shrove','shriven'],
    
    ['Behold','beheld','beheld'],
    ['Bereave','bereft','bereft'],
    ['Beseech','besought','besought'],
    ['Foretell','foretold','foretold'],
    ['Arise','arose','arisen'],
    ['Stride','strode','stridden'],
  ]
}

export default new IrreguarVerbs;