import MatterJs from 'matter-js'


class Mouse {
  create(render, engine) {
    var mouse = MatterJs.Mouse.create(render.canvas);

    let mouseConstraint = MatterJs.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.3,
            damping: 1,
            render: {
                visible: true
            }
        }
    });
      
    render.mouse = mouse;

    MatterJs.World.add(engine.world, mouseConstraint);
  }
}

export default new Mouse();