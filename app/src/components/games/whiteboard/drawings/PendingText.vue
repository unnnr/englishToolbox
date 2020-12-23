<template>
  <input
    v-model="cached.value"
    ref="textarea"

    :style="{'left': left,
             'top': top,
             'font-size': fontSize,
             'color': color}"
    autofocus

    @blur.native="compute"
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
      return this.cached.y / this.config.height * 100+ '%';
    },
    
    left() {
      return this.cached.x / this.config.width * 100 + '%';
    },

    fontSize() {
      return this.cached.size * this.scale + 'px';
    },
    
    color() {
      return this.cached.color;
    }
  },

  mounted() {
    this.$nextTick().then(this.focus);

    this.scale = this.$el.parentNode.offsetWidth / this.config.width;

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
  margin-top: -8px

</style>