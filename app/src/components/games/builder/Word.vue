<template>
  <div class="builder__brick">
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
      draggable: false
    }
  },

  computed: {
    parent() {
      return this.$el.offsetParent;
    }
  },

  mounted() {
    this.move = this.move.bind(this);
  },

  methods: {
    startDrag() {
      this.parent.addEventListener('move', this.move);
    },

    move() {

    },

    stopDrag() {
      this.parent.removeEventListerner('move', this.move);
    }
  }
}
</script>
