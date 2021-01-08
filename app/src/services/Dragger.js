export default class Dragger {
  context =null;
  
  target = null;
  
  dragging = false;
  
  offset = {
    x: 0, y: 0
  };

  constructor() {
    this.endDrag = this.endDrag.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.moveTarget = this.moveTarget.bind(this);
  } 

  el() {
    return this.target ? this.target.el : null;
  }

  computeCoords(el, event) {
    let offset = 
      el.getBoundingClientRect();

    let position = {
      x: event.clientX - offset.left,
      y: event.clientY - offset.top
    }

    return position;
  }

  bindEvents(event) {
    this.context.addEventListener('mousemove', this.moveTarget);
    this.context.addEventListener('mouseup', this.endDrag);
    this.context.addEventListener('mouseleave', this.endDrag);
  }

  resovleEvents() {
    this.context.removeEventListener('mousemove', this.moveTarget);
    this.context.removeEventListener('mouseup', this.endDrag);
    this.context.removeEventListener('mouseleave', this.endDrag);
  }

  drag(target, event) {
    if (this.target)
      this.endDrag();

    this.target = target;

    this.createEl(target);
    this.startDrag(event);
  }

  startDrag(event) {
    this.offset = this.computeCoords(this.el(), event);
    this.dragging = true;
    this.bindEvents();
  }

  createEl(target) {
    let el = target.el.cloneNode(true);
    
    el.style.position = 'absolute';
    el.style.left = target.el.offsetLeft + 'px';
    el.style.top = target.el.offsetTop + 'px';

    this.context = target.el.offsetParent;
    this.context.appendChild(el);
    this.target.el = el;
  }

  endDrag() {
    this.dragging = false;

    this.el().remove();
    this.resovleEvents();

    this.target = null;
  }

  moveTarget(event) {
    let {x, y} = this.computeCoords(this.context, event);
    let style = this.el().style;
    
    style.top = (y - this.offset.y) + 'px';
    style.left = (x - this.offset.x) + 'px';
  }
}