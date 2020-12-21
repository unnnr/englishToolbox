<template>
  <div 
    @mouseup="release"
    @mouseleave="release"

    @mouseenter="enter"

    @mousemove="draw"
    @mousedown="click">

    <div 
      v-if="active"
      class="whitebord__overlay">
    </div>

    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    target: { type: Object, default: null}
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
      // if (!!!this.target)
      //   return
        
      this.active = true;
      this.target.click(event);
    },
    
    draw(event) {
      // if (!!!this.target)
      //   return
        
      this.target.draw(event);
    },

    release() {
      this.active = false;

      // if (!!!this.target)
      //   return

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