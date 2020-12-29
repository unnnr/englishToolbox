import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}


class Group {
  colorMap = {};

  canGroup(first, second) {
    return first.word.key === second.word.key;
  }

  createColor(key) {
    if (!!!this.colorMap[key])
      this.colorMap[key] = randomColor();
    
    return this.colorMap[key];
  }

  merge(first, second) {
    if (!!!this.canGroup(first, second))
      return false;

    return true;
  }
}

export default new Group();