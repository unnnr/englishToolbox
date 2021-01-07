export default class Dragger {
  context = null;
  
  target = null;
  
  dragging = false;
  
  offset = {
    x: 0, y: 0
  };

  position = {
    x: 0, y: 0
  }

  constructor(context = null) {
    this.context = context

    this.bindEvents = this.bindEvents.bind(this);
    this.resovleEvents = this.resovleEvents.bind(this);
  } 

  comutedCoords(context, event) {
    let offset = 
      context.getBoundingClientRect();

    let position = {
      x: event.clientX - offset.left,
      y: event.clientY - offset.top
    }

    return position;
  }

  bindEvents(event) {
    this.context.addEventListener('mousemove', this. );
    this.context.addEventListener('mouseup', this.stopDrag);
    this.context.addEventListener('mouseleave', this.stopDrag);
  }

  resovleEvents() {
    this.context.removeEventListener('mousemove', this.move);
    this.context.removeEventListener('mouseup', this.stopDrag);
    this.context.removeEventListener('mouseleave', this.stopDrag);
  }


  drag(target, event) {
    if (this.target)
      this.endDrag();

    this.target = target.cloneNode(true);
    this.startDrag();
  }

  startDrag(event) {
    this.offset = this.comutedCoords(this.$el, event);
    this.coords = this.comutedCoords(this.parent, event);
    this.dragging = true;

    this.bindEvents();
  }

  endDrag() {
    this.dragging = false;
    this.resovleEvents();
  }

  moveTarget() {
    this.coords = 
      this.comutedCoords(this.parent);
  }
}