<template>
  <button 
    class="shrink-button"
    :disabled="disabled"
    :style="{'transform': rotateProperty}"
    :class="{
      'shrink-button--upturned': shrinked,
      'shrink-button--disabled': disabled}">
  </button>
</template>

<script>
export default {
  props: {
    shrinked: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false }
  },

  computed: {
		rotateProperty() {
      let angle = this.shrinked ? 0 : -180;

      return 'rotate(' + angle + 'deg)';
    }
	},
}
</script>

<style lang="sass">

.shrink-button
  transition: transform .5s ease-in-out, opacity .5s

.shrink-button--disabled
  opacity: .3

</style>