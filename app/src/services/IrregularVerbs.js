class IrreguarVerbs {
  verbs = [
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
    ['be', 'was, were', 'been'],
  ]

  list() {
    return this.verbs;
  }

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
}

export default new IrreguarVerbs;