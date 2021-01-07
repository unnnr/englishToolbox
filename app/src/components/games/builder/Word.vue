<template>
  <div 
    class="builder__brick"
    :style="{
      'position': position,
      'left': left,
      'top': top}"

    @mousedown="startDrag">

    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' }
  },

  data() {
    return {
      dragging: false,
      draggable: false,

      coords: {
        x: 0,
        y: 0
      },

      offset: {
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    parent() {
      return this.$el.offsetParent;
    },

    top() {
      return (this.coords.y - this.offset.y) + 'px'
    },

    left() {
      return (this.coords.x - this.offset.x) + 'px'
    },

    position() {
      return this.dragging ? 'absolute' : '';
    }
  },

  mounted() {
    this.move = this.move.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
  },

  methods: {
    comutedCoords(parent, event) {
      let offset = 
        parent.getBoundingClientRect();

      let position = {
        x: event.clientX - offset.left,
        y: event.clientY - offset.top
      }

      return position;
    },
    
    startDrag(event) {
      this.offset = this.comutedCoords(this.$el, event);
      this.coords = this.comutedCoords(this.parent, event);

      this.dragging = true;

      this.parent.addEventListener('mousemove', this.move);
      this.parent.addEventListener('mouseup', this.stopDrag);
      this.parent.addEventListener('mouseleave', this.stopDrag);
    },

    move(event) {
      this.coords = 
        this.comutedCoords(this.parent, event);
    },

    stopDrag() {
      this.dragging = false;
      this.parent.removeEventListener('mousemove', this.move);
      this.parent.removeEventListener('mouseup', this.stopDrag);
      this.parent.removeEventListener('mouseleave', this.stopDrag);
    }
  }
}
</script>
