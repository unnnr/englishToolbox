import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}


class Group {
  canGroup(first, second) {
    return first.word.key === second.word.key;
  }

  createColor(key) {
    return '#' + ('' + key).repeat(6);
  }

  merge(first, second) {
    if (!!!this.canGroup(first, second))
      return false;

    return true;
  }
}

export default new Group();