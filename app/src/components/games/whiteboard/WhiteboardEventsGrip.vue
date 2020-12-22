<template>
  <div 
    @mouseenter="enter"
    @mouseleave="release">

    <div 
      v-if="active"
      class="whitebord__overlay"
      @mouseup.self="release"
      @mousemove.self="move"
      @mousedown.self="click">
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
    
    move(event) {
      this.$emit('move', event);
    },

    release() {
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