const Config  = {
  deckLength: 1,

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

    borderRadius: 3,
    borderSize: 5,

    heightScale: 1.5,
    widthScale: 0.8,

    color: '#A1A1B1'
  },

  font: {
    size: 20,
    desktop: 30,
    mobile: 50,
  },

  group: {
    explosionActive: 10,
    explosionPassive: 3,

    radius: 150,
    magnet: 1.5,
    
    borderSize: 3,
    padding: 10,
    opacity: .2,
  }
}

export default Config;