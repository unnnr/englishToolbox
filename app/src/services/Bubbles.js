const Tag = require('en-pos').Tag;

class Bubless {
  
  clear(text) {
    let parsed = text
      .replace(/(?<=He|She|It)'s/, ' is')
      .replace(/'ll/, ' will')
      .replace(/'ve/, ' have')
      .replace(/'re/, ' are')
      .replace(/n't/, ' not')
      .replace(/'d/, ' had')
      .replace(/'d/, ' had')
      .replace(/'m/, ' am')

    return parsed;
  }

  split(text) {
    let splitted = text.split(/(?:(?:\s+|^)-(?:\s+|$))|(?:\s+)/);

    let first = splitted[0];
    if (splitted.length && !!!first.length)
      splitted.shift();
    
    let last = splitted[splitted.length - 1];
    if (splitted.length && !!!last.length)
      splitted.pop();
    
    return splitted;
  }

  isCapitalized(word) {
    if (/^[A-Z]/.test(word))
      return true;
  }

  isKeyword(tag) {
    let tags = [ 
      'CD', 'NN', 'NNS' , 'NNP', 'NNPS', 'PRP', 'PRP$'
    ];
    
    return tags.indexOf(tag) !== -1
  }

  selectKeywords(words) {
    let tags = new Tag(words)
      .initial()
      .smooth()
      .tags;

    let splitted = [];
    let line = { keyword: null, missing: null };
    splitted.push(line);

    for (let i in words) {
      let word = words[i];
      let tag = tags[i];

      if (this.isCapitalized(word) || this.isKeyword(tag)) {
        line = { keyword: word, missing: null };
        splitted.push(line);
        continue
      }
      
      if (line.missing === null)
        line.missing = [];
      line.missing.push(word);
    }

    return splitted;
  }

  compare(entry, missed) {
    let cleared = this.clear(entry);
    let words = this.split(cleared);

    if (words.length !== missed.length)
      return false;

    for (let i = 0; i < words.length; i++) {
      let sample = missed[i].toLowerCase();
      let entry = words[i].toLowerCase();

      if (entry !== sample)
        return false;
    }

    return true;
  }

  parse(entry) {
    let cleared = this.clear(entry);
    let words = this.split(cleared);
    let lines = this.selectKeywords(words);

    return lines;
  }
}

export default new Bubless();