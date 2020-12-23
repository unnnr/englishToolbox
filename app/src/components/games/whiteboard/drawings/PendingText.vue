<template>
  <input
    v-model="cached.value"
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

  data() {
    return {
      cached: {}
    }
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
    this.$nextTick().then(this.focus);

    this.cached = this.target;
  },

  methods: {
    focus() {
      setTimeout(() => this.$el.focus(), 100);
    },

    compute() {
      this.drawings.pending = null;

      if (typeof this.cached.id == 'number') {

        if (!!!this.cached.value)
          this.drawings.remove(this.cached)
        else
          this.drawings.update(this.cached)

        return;
      }

      if (this.cached.value)
        this.drawings.append(this.cached);
    }
  }
}
</script>

<style lang="sass" scoped>

input
  position: absolute

</style>