<template>
  <transition-group 
    class="builder__pool"
    name="words"
    @before-leave="beforeLeave"
    @before-enter="beforeEnter">

    <div 
      v-for="word in words"
      :key="word.key"

      class="builder__brick"
      ref="words"

      @click="resolve(word)">

      {{ word.text }}
    </div>

  </transition-group>
</template>

<script>
export default {
  props: {
    words: { type: Array, default: () => [] },
  },

  methods: {
    resolve(target) {
      let index = this.words.indexOf(target);
      let word = this.words[index];
      this.words.splice(index, 1);

      this.$emit('resolved', word);
    },

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
      el.style.padding = '0';

      await this.$nextTick();
      el.style.padding = '5px 10px';
      el.style.width = width + 'px';

      // Waiting for animation
      await new Promise(resolve => setTimeout(resolve, 1000))
      el.style.padding = '';
      el.style.width = '';
    },
  }
}
</script>

<style lang="sass">

.builder__brick--disabled
  font-size: 0

.words-enter-active, 
  

.words-leave-active
  overflow: hidden
  text-overflow: clip
  white-space: nowrap
  opacity: 0
  color: transparent
  border-width: 0
  padding: 5px 0,
  margin-left: 0 !important
  transition: opacity .5s, color .5s, border .7s, margin .7s, height .7s, width .7s, padding .7s

.builder__pool
  grid-column-gap: 0

.builder__brick:not(:first-child)
  margin-left: 10px
  

</style>