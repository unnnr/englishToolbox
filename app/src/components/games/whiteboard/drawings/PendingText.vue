<template>
  <textarea
    ref="textarea"
    :style="{'left': left,
             'top': top}"
    autofocus/>
</template>

<script>
export default {
  inject: ['$config'],

  props: {
    value: { type: String, default: '' },

    x: { type: Number, default: 0 },

    y: { type: Number, default: 0 },
  },

  computed: {
    config() {
      return this.$config();
    },

    top() {
      return this.y / this.config.height * 100+ '%';
    },
    
    left() {
      return this.x / this.config.width * 100 + '%';
    },
  },

  mounted() {
    this.$nextTick().then(focus)
  },

  method: {
    focus() {
      this.$el.focus();
    }
  }
}
</script>

<style lang="sass" scoped>

textarea
  position: absolute

</style>