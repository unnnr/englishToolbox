<template>
  <transition-group
    tag="section"
    name="list"
    @before-leave="onLeave"
    :appear="false">
    
    <slot/>
  </transition-group>
</template>

<script>
export default {
  mounted() {
    this.$options.timer = null;
  },

  methods: {
    setAbsolute(target) {
      let height = target.offsetHeight + 'px';
      let width = target.offsetWidth + 'px';

      let top = target.offsetTop + 'px';
      let left = target.offsetLeft + 'px';

			Object.assign(target.style, {
        height, width, top, left,
			})
    },

    onLeave(target) {
      this.setAbsolute(target);
    }
  }
}
</script>

<style lang="sass">

.list-enter-active
  transitions: all 0s
  animation: scale-in-bottom .7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both

.list-leave-active
  position: absloute
  animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both

.pool 
  overflow: visible

</style>