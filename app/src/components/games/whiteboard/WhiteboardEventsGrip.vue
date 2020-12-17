<template>
  <div 
    class="whitebord__overlay"
    :class="{
      'whitebord__overlay--active': active}"

    @mouseup="release"
    @mouseleave="release"

    @mouseenter="enter"

    @mousemove.self="draw"
    @mousedown.self="click">
  </div>
</template>

<script>
export default {
  props: {
    target: { type: Object, required: true }
  },

  data() {
    return {
      active: false
    }
  },

  methods: {
    enter(event) {
      if (event.buttons === 1)
        this.click(event);
    },

    click(event) {
      this.active = true;

      this.target.click(event);
    },
    
    draw(event) {
      this.target.draw(event);
    },

    release() {
      this.active = false;

      this.target.release(event);
    },
  }
}
</script>

<style lang="sass">

.whitebord__overlay
  position: absolute
  height: 100%
  width: 100%
  top: 0

.whitebord__overlay--active
  z-index: 10

</style>