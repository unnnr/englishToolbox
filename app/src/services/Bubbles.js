import nouns from 'noun-json'

class Bubless {
  clear(text) {
    let parsed = text
      .replace(/'ll/, ' will')
      .replace(/'ve/, ' have')
      .replace(/'re/, ' are')
      .replace(/n't/, ' not')
      .replace(/'d/, ' had')
      .replace(/'d/, ' had')
      .replace(/'m/, ' am')
      .replace(/'s/, ' is')

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

  isKeyword(word) {
    if (/^[A-Z]/.test(word))
      return true;

    if (/`s$/.test(word))
      return true;
  
    if (nouns.indexOf(word) !== -1)
      return true

    return false
  }

  selectKeywords(words) {
    let splitted = [];

    let line = { keyword: null, missing: null };
    splitted.push(line);

    for (let word of words) {

      if (!!!this.isKeyword(word)) {
        if (line.missing === null)
          line.missing = [];

        line.missing.push(word);
        continue
      }
      
      if (line.keyword) {
        line = { keyword: word, missing: null };
        splitted.push(line);
        continue;
      }

      line.keyword = word;
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