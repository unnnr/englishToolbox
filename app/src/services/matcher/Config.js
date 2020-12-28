class Config {
  deckLength = null;

  world = {
    width: 1400,
    height: 600
  }

  brick = {
    heightScale: 1,
    widthScale: 1,
    fontSize: 20,

    groupRadius: 100,

    speed: 0.03,
    friction: 1
  }
}

export default new Config();