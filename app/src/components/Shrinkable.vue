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
    // duration: { type: Number, default: 500 },
    
    from: { default: 'auto' },

    to: { default: '0' },
  },

  data() {
    return {
      shrinked: false,

      height: 'auto',

      speed: 1, 

      duration: 500,
    }
  },

  computed: {
    rawHeight: {
      get() {
        let wrapper = this.$refs.wrapper;
        if (!!!wrapper)
          return '0';

        let lastChild = wrapper.lastChild;
        if (!!!lastChild)
          return '0';

        let height = 
          wrapper.lastChild.offsetTop +  wrapper.lastChild.offsetHeight;

        // Countnig last element margin
        let computedStyle = window.getComputedStyle(lastChild); 
        height += 
            parseInt(computedStyle.marginBottom, 10);
        
        // Countnign wrapper margin
        computedStyle = window.getComputedStyle(wrapper); 
        height += 
            parseInt(computedStyle.paddingBottom, 10);


        return height;
      },

      cache: false
    },

    contentHeight: {
      get() {
        return this.rawHeight + 'px';
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

    computeDuration() {
      if (!!!this.rawHeight)
          return 500;

      return Math.pow(Math.log(this.rawHeight) / Math.log(1.1), 1.57 * this.speed);
    },

    open() {
      if (this.opened)
          return;
          
      if (this.$options.animation !== null)
        clearTimeout(this.$options.animation);

      this.shrinked = false; 
      this.height = this.contentHeight;
      this.duration = this.computeDuration();

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
      this.duration = this.computeDuration();
      
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