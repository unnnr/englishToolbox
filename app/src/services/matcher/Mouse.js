import MatterJs from 'matter-js'


class Mouse {
  create(render, engine) {
    var mouse = MatterJs.Mouse.create(render.canvas);

    let mouseConstraint = MatterJs.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.6,
            damping: 1,
            render: {
                visible: true
            }
        }
    });
      
    render.mouse = mouse;

    MatterJs.World.add(engine.world, mouseConstraint);

    MatterJs.Events.on(mouseConstraint, 'startdrag', () => {
      setTimeout(() => {
        // mouseConstraint.mouse.mouseup( { changedTouches: null });
      }, 500);
    })
  }
}

export default new Mouse();