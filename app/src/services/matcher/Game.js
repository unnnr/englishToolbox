export default class EventGreep {
  world = null;

  constructor(world) {
    this.world = world;
  }

  update() {
    console.log('updating');
  }
}