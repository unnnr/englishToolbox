class IrregularVerbs {
  wordList = [
    'be - was, were - been',
    'arise - arose - arisen',
    'awake - awoke - awaken',
    'beat - beat - beaten',
    'bend - bent - bent',
    'begin - began - begun',
    'cast - cast - cast',
    'catch - caught - caight',
    'cut - cut - cut',
    'cling - clung - clung',
  ]

  getLength(count = null) {
    let length;

    if (count === null)
      length = this.wordList.length;
    else 
      length = count;

    if (length > this.wordList.length)
      throw Error('Incorrect words count')

    return length;
  }

  parse(count) {
    let words = [];

    for (let key = 0; key < count; key++) {
      let rawGroup = this.wordList[key].split(' - ');

      let group = rawGroup.map(name => ({
        name, key
      }))

      words.push(group);
    }

    return words;
  }

  slice(count = null) {
    let length = this.getLength(count);
    let words = this.parse(length);

    return words;
  }
}

export default new IrregularVerbs();