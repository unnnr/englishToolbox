class Bubless {
  removeShortcuts(entry) {
    let parsed = entry
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

  parse(entry) {
    return this.removeShortcuts(entry);
  }
}

export default new Bubless();