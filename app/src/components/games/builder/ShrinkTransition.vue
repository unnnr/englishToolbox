<template>
  <transition-group 
    v-if="group"
    name="words"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave">

    <slot/>
  </transition-group>

  <transition
    v-else
    name="words"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave">

    <slot/>
  </transition>
</template>

<script>
export default {
  props: {
    group: { type: Boolean, default: false },
  },

  data() {
    return {
      duration: 700
    }
  },

  methods: {
     async beforeLeave(el) {
      el.style.width = el.offsetWidth + 'px';
      el.style.maxHeight = el.offsetHeight + 'px';

      await this.$nextTick();
      el.style.width = 0;
    },

    async beforeEnter(el) {
      // Computing sizes
      el.style.position = 'absolute';
      document.body.append(el);

      let width = el.offsetWidth;
      document.body.removeChild(el);

      el.style.position = '';
      el.style.width = '0';
      el.style.padding = '0 5';

      await this.$nextTick();
      el.style.padding = ''
      el.style.width = width + 'px';

      // Waiting for animation
      await new Promise(resolve => setTimeout(resolve, this.duration))
      el.style.width = '';
    },
  }
}
</script>

<style lang="sass">

.builder__brick--disabled
  font-size: 0

.builder__brick
  transition: opacity .5s, margin .7s, width .7s, padding .7s
  cursor: pointer

.builder__brick
  overflow: hidden
  text-overflow: clip
  white-space: nowrap
  
.words-enter,
.words-leave-active
  opacity: 0
  border-width: 3 0
  padding: 5px 0,
  margin-left: 0 !important

.builder__pool
  grid-column-gap: 0

.builder__brick:not(:first-child)
  margin-left: 10px
  
</style>