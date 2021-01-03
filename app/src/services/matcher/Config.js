const Config  = {
  deckLength: 10,

  world: {
    width: 1620,
    height: 694,
    background: 'white',
    spawnMargin: 40,
    uiCutout: {
      x: 0, y: 0,
      width: 400, 
      height: 70
    }
  },

  brick: {
    explosionActive: 10,
    explosionPassive: null,
    borderRadius: 10,
    heightScale: 1.2,
    widthScale: 0.8,
    color: '#9999aa'
  },

  font: {
    size: 20,
    color: 'white'
  },

  group: {
    explosionActive: 10,
    explosionPassive: 3,
    padding: 10,
    radius: 150,
    opacity: .5,
    magnet: 0.9
  }
}

export default Config;