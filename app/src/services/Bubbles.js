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

  parse(entry) {
    let cleared = this.clear(entry);
    let lines = this.split(cleared);

    console.log(lines);
    return lines;
  }
}

export default new Bubless();