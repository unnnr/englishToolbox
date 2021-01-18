<template>
  <div 
    @mouseenter="enter"
    @mouseleave="release"
    @touchcancel="release"
    @touchmove="touchMove"
    @touchend="release">

    <div 
      v-if="active"
      class="whitebord__overlay"

      @mousedown.self="click"
      
      @mouseup.self="release"
      @touchend.self="release"

      @mousemove.self="mouseMove"
      @touchmove.self="touchMove">
      
    </div>

    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false }
  },

  methods: {
    enter(event) {
      if (event.buttons === 1)
        this.click(event);
    },

    click(event) {
      this.$emit('click', event);
    },

    mouseMove(event) {
      this.$emit('move', event);
    },

    touchMove(event) {
      let { touches } = event;

      console.log(touches[0]);
      this.$emit('move', touches[0]);
    },

    release() {
      console.log('release')
      this.$emit('release', event);
    },
  }
}
</script>

<style lang="sass">

.whitebord__overlay
  position: absolute
  height: 100%
  width: 100%
  z-index: 10
  top: 0

</style>