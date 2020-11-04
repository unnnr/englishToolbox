<template>
  <div 
    class="shrinkable"
    ref="wrapper"
    :style="{
      'transition-duration': this.transitionDuration,
      'height': height}">

    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    duration: { type: Number, default: 500 },
    
    from: { default: 'auto' },

    to: { default: '0' },
  },

  data() {
    return {
      shrinked: false,

      height: 'auto'
    }
  },

  computed: {
    transitionDuration() {
      return this.duration + 'ms'
    },
    
    opened() {
      return !!!this.shrinked
    },

    closed() {
      return this.shrinked;
    },

    contentHeight: {
      get() {
        let wrapper = this.$refs.wrapper;
        let height = 0;

        for (let child of wrapper.children)
          height += child.offsetHeight;

        return height + 'px';
      },

      cache: false
    }
  },

  beforeMount() {
    this.height = this.computeValue(this.from)
  },
  
  methods: {
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

    open() {
      if (this.opened)
          return;
          
      if (this.$options.animation !== null)
        clearTimeout(this.$options.animation);

      this.shrinked = false; 
      this.height = this.contentHeight;

      // Waiting for animation
      this.$options.animation = setTimeout(() => {
        this.height = this.computeValue(this.from);
        this.$emit('opened');
      }, this.duration);
    },

    close() {
      if (this.closed)
        return;

      if (this.$options.animation !== null)
        clearTimeout(this.$options.animation);

      this.shrinked = true; 
      this.height = this.contentHeight;
      
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