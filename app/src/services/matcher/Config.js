const Config  = {
  deckLength: 10,

  world: {
    width: 1620,
    height: 694,
    background: 'white',
    spawnMargin: 40,
  },

  brick: {
    explosionActive: 10,
    explosionPassive: null,
    borderRadius: 10,
    heightScale: 1.2,
    widthScale: 1,
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
    opacity: .5
  }
}

export default Config;