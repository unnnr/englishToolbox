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
    if (!!!first.length)
      splitted.shift();
    
    let last = splitted[splitted.length - 1];
    if (!!!last.length)
      splitted.pop();
    
    return splitted;
  }

  isKeyword(word) {
    return Math.random() > 0.5;
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

      line = {  keyword: word, missing: [] };
      splitted.push(line);
    }

    return splitted;
  }

  parse(entry) {
    let cleared = this.clear(entry);
    let lines = this.split(cleared);
    let keyworded = this.selectKeywords(lines);

    console.log(keyworded);

    return keyworded;
  }
}

export default new Bubless();