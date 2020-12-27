<template>
  <div 
    class="whiteboard__group-inner-mobile"
    :class="{'whiteboard__element--disabled': disabled }">

    <transition
      name="whiteboard__element-dropup-mobile"
      @before-leave="$emit('close')"
      @before-enter="$emit('open')">

      <div 
        v-if="opened"
        class="whiteboard__element-dropup-mobile"

        @click="close">

        <slot v-if="opened" name="list"/>
      </div>
    </transition>

    <div 
      ref="button"
      class="whiteboard__element-mobile"
      @mousedown.stop="toggle">
      
      <transition
        mode="out-in" 
        name="fade">

        <slot name="button"/> 
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      opened: false
    }
  },

  mounted() {
    this.$options.binded = this.ouside.bind(this);
    document.body.addEventListener('mousedown', this.$options.binded, true);
  },

  beforeDestroy() {
    document.body.removeEventListener('mousedown', this.$options.binded, true);
  },

  methods: {
    ouside() {
      let saved = this.opened;

      setTimeout(() => {
        if (this.opened === saved)
          this.close();
      }, 100)
    },

    close() {
      this.opened = false;
    },

    async show() {
      if (this.disabled)
        return;

      this.opened = true;
    },

    toggle() {
      if (this.opened)
        this.close()
      else
        this.show();
    },
  }
}
</script>

<style lang="sass" scoped>

.whiteboard__element-dropup-mobile
  max-height: 160px
  padding-top: 5px 
  padding-bottom: 5px
  transition: max-height .3s ease-in-out, padding .3s ease-in-out

.whiteboard__element-dropup-mobile-enter, .whiteboard__element-dropup-mobile-leave-active
  max-height: 0 
  padding: 0 5px 
  
</style>