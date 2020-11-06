<template>
  <div 
    class="shrinkable"
    ref="wrapper"
    :style="{
      'transition-duration': this.transitionDuration,
      'height': height}">

      <div 
        class="shrinkable__content"
        ref="content"
        :style="{'max-height': maxHeight + 'px'}">
        
        <slot/>
      </div>
  </div>
</template>

<script>
export default {
  props: {    
    to: { default: '0' },

    speed: { type: Number, default: 1 },

    maxHeight: { type: Number, default: -1 },

    shrinkedByDefault: { type: Boolean, default: false}
  },

  data() {
    return {
      height: null,
      duration: 500,
      shrinked: false,
    }
  },

  computed: {
    contentHeight: {
      get() {
        return this.getRawHeight() + 'px';
      },

      cache: false
    },

    transitionDuration() {
      return this.duration + 'ms'
    },
    
    opened() {
      return !!!this.shrinked
    },

    closed() {
      return this.shrinked;
    },
  },

  beforeMount() {
    if (!!!this.shrinkedByDefault) 
      return this.height = null;
    
    this.height = this.computeValue(this.to);
    this.shrinked = true;
  },
  
  methods: {
    getRawHeight() {
      let content = this.$refs.content;

      return content.offsetHeight;
    },

    computeValue(value) {
      switch(typeof value) {
        case 'function' : 
          return value();

        case 'number' : 
          return value + 'px';

        case 'string' : 
          return value;

        default: 
          return 0
      }
    },

    computeDuration() {
      let height = this.getRawHeight();

      if (!!!height)
          return 500;

      if (this.speed <= 0)
        return 0;

      return Math.pow(Math.log(height) / Math.log(1.1), 1.57 ) / this.speed;
    },

    open() {
      if (this.opened)
          return;
          
      if (this.$options.animation !== null)
        clearTimeout(this.$options.animation);

      this.shrinked = false; 
      this.duration = this.computeDuration();
      this.height = this.contentHeight

      // Waiting for animation
      this.$options.animation = setTimeout(() => {
        this.height = null;
        this.$emit('opened');
      }, this.duration);
    },

    close() {
      if (this.closed)
        return;

      if (this.$options.animation !== null)
        clearTimeout(this.$options.animation);

      this.shrinked = true; 
      this.duration = this.computeDuration();
      this.height = this.$refs.wrapper.offsetHeight + 'px';
      
      // Vue rendering time + DOM rendering time
      const RENDER_TIME = 100;
      
      // Waiting for rendering
      this.$options.animation = setTimeout(() => {
        this.height = this.computeValue(this.to);

      // Waiting for animation
        this.$options.animation = setTimeout(() => 
          this.$emit('closed'), this.duration);
      }, RENDER_TIME)
      
    },

    toggle() {
      if (this.closed)
        this.open()
      else
        this.close();

      return this.shrinked;
    }
  }
}
</script>

<style lang="sass">

.shrinkable
  transition-property: height
  overflow: hidden

</style>