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

    return mouseConstraint;
  }

  stopDrag(mouseConstraint) {
    let mouse = mouseConstraint.mouse;
    
    mouse.button = -1;
    mouse.absolute.x = position.x;
    mouse.absolute.y = position.y;
    mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
    mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    mouse.mouseupPosition.x = mouse.position.x;
    mouse.mouseupPosition.y = mouse.position.y;
  }
}

export default new Mouse();