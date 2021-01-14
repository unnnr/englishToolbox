class IrreguarVerbs {
  grouplength = 7;

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
    ['be','was/were','been'],
    ['go','went','gone'],
    ['come','came','come'],
    ['see','saw','seen'],
    ['hear','heard','heard'],
    ['say','said','said'],
    ['tell','told','told'],
    
    ['do','did','done'],
    ['make','made','made'],
    ['pay','paid','paid'],
    ['keep','kept','kept'],
    ['hold','held','held'],
    ['spend','spent','spent'],
    ['get','got','got'],
    
    ['drink','drank','drunk'],
    ['Eat','ate','eaten'],
    ['have','had','had'],
    ['take','took','taken'],
    ['sit','sat','sat'],
    ['can','could'],
    ['leave','left','left'],
    
    ['forget','forgot','forgotten'],
    ['know','knew','known'],
    ['draw','drew','drawn'],
    ['hide','hid','hidden'],
    ['find','found','found'],
    ['learn','learnt','learnt'],
    ['mean','ment','ment'],
    
    ['read','read','read'],
    ['write','wrote','written'],
    ['choose','chose','chosen'],
    ['begin','','began','begun'],
    ['send','sent','sent'],
    ['win','won','won'],
    ['shut','shut','shut'],
    
    ['swim','swam','swum'],
    ['run','ran','run'],
    ['wake','woke','woken'],
    ['understand','understood','understood'],
    ['cut','cut','cut'],
    ['lead','led','led'],
    ['catch','caught','caught'],
    
    ['fall','fell','fallen'],
    ['give','gave','given'],
    ['buy','bough','bought'],
    ['show','showed','shown'],
    ['stand','stood','stood'],
    ['undo','undid','undone'],
    ['mistake','mistook','mistaken'],
    
    ['meet','met','met'],
    ['teach','taught','taught'],
    ['let','let','let'],
    ['bend','bent','bent'],
    ['feed','fed','fed'],
    ['shake','shook','shaken'],
    ['ride','rode','ridden'],
    
    ['bring','brought','brought'],
    ['think','thought','thought'],
    ['spin','spun','spun'],
    ['lose','lost','lost'],
    ['sell','sold','sold'],
    ['fly','flew','flown'],
    ['blow','blew','blown'],
    
    ['hit','hit','hit'],
    ['bite','bit','bitten'],
    ['lie','lay','lain'],
    ['fight','fought','fought'],
    ['shoot','shot','shot'],
    ['put','put','put'],
    ['wear','wore','worn'],
    
    ['stink','stank','stunk'],
    ['set','set','set'],
    ['sleep','slept','slept'],
    ['deal','dealt','dealt'],
    ['kneel','knelt','knelt'],
    ['drive','drove','driven'],
    ['bear','bore','born'],
    
    ['hurt','hurt','hurt'],
    ['sweep','swept','swept'],
    ['rise','rose','risen'],
    ['smell','smelt','smelt'],
    ['speak','spoke','spoken'],
    ['tear','tore','torn\t'],
    ['steal','stole','stolen'],
    
    ['spread','spread','spread'],
    ['rend','rent','rent'],
    ['weep','wept','wept'],
    ['become','became','become'],
    ['forgive','forgave','forgiven'],
    ['lay','laid','laid'],
    ['break','broke','broken'],

    ['beat','beat','beaten'],
    ['feel','felt','felt'],
    ['grow','grew','grown'],
    ['dream','dreamt','dreamt'],
    ['leap','leapt','leapt'],
    ['rid','rid','rid'],
    ['throw','threw','thrown'],
    
    ['build','built','built'],
    ['freeze','froze','frozen'],
    ['flee','fled','fled'],
    ['upset','upset','upset'],
    ['ring','rang','rung'],
    ['speed','sped','sped'],
    ['withdraw','withdrew','withdrawn'],
    
    ['abide','abode','abode'],
    ['breed','bred','bred'],
    ['hang','hung','hung'],
    ['forecast','forecast','forecast'],
    ['lean','leant','leant'],
    ['split','split','split'],
    ['weave','wove','woven'],
    
    ['dwell','dwelt','dwelt'],
    ['shine','shone','shone'],
    ['slide','slid','slid'],
    ['wind','wound','wound'],
    ['swear','swore','sworn'],
    ['tread','trod','trodden'],
    ['sink','sank','sunk'],
    
    ['spring','sprang','sprung'],
    ['burn','burnt','burnt'],
    ['cost','cost','cost'],
    ['forbid','forbade','forbidden'],
    ['lend','lent','lent'],
    ['overhear','overheard','overheard'],
    ['spoil','spoilt','spoilt'],
    
    ['smite','smote','smitten'],
    ['sling','slung','slung'],
    ['shed','shed','shed'],
    ['strike','struck','struck'],
    ['burst','burst','burst'],
    ['grind','ground','ground'],
    ['foresee','foresaw','foreseen'],
    
    ['bind','bound','bound['],
    ['awake','awoke','awoken'],
    ['fling','flung','flung'],
    ['oversleep','overslept','overslept'],
    ['shrink','shrank','shrunk'],
    ['slit','slit','slit'],
    ['undertake','undertook','undertaken'],
    
    ['withstand','withstood','withstood'],
    ['slink','slunk','slunk'],
    ['strive','strove','striven'],
    ['bleed','bled','bled'],
    ['cast','cast','cast'],
    ['interweave','interwove','interwoven'],
    ['bid','bade','bidden'],
    
    ['broadcast','broadcast','broadcast'],
    ['dig','dug','dug'],
    ['bet','bet','bet'],
    ['seek','sought','sought'],
    ['stick','stuck','stuck'],
    ['wring','wrung','wrung'],
    ['thrust','thrust','thrust'],
    
    ['befall','befell','befallen'],
    ['cling','clung','clung'],
    ['sing','sang','sung'],
    ['swing','swung','swung'],
    ['slay','slew','slain'],
    ['beset','beset','beset'],
    ['creep','crept','crept'],
    
    ['beget','begot','begotten'],
    ['bespeak','bespoke','bespoken'],
    ['bestride','bestrode','bestridden'],
    ['forsake','forsook','forsaken'],
    ['spit','spat','spat'],
    ['sting','stung','stung'],
    ['shrive','shrove','shriven'],
    
    ['behold','beheld','beheld'],
    ['bereave','bereft','bereft'],
    ['beseech','besought','besought'],
    ['foretell','foretold','foretold'],
    ['arise','arose','arisen'],
    ['stride','strode','stridden'],
  ]
}

export default new IrreguarVerbs;