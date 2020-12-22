<template>
  <input
    v-model="target.value"
    ref="textarea"

    :style="{'left': left,
             'top': top}"
    autofocus

    @blur="compute"
    @keydown.enter="compute"/>
</template>

<script>
export default {
  inject: ['$config', '$drawings'],

  props: {
    target: { type: Object, default: null },
  },
  
  computed: {
    config() {
      return this.$config();
    },

    drawings() {
      return this.$drawings();
    },

    top() {
      return this.target.y / this.config.height * 100+ '%';
    },
    
    left() {
      return this.target.x / this.config.width * 100 + '%';
    },
  },

  mounted() {
    this.$nextTick().then(this.focus)
  },

  methods: {
    focus() {
      setTimeout(() => this.$el.focus(), 100);
    },

    compute() {
      this.drawings.pending = null;

      if (typeof this.target.id === 'number' && !!!this.target.value) {
        this.drawings.remove(this.target)
        return;
      }

      if (this.target.value)
        this.drawings.append(this.target);
    }
  }
}
</script>

<style lang="sass" scoped>

input
  position: absolute

</style>