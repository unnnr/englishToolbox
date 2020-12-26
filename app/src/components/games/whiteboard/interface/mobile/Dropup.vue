<template>
  <div 
    class="whiteboard__group-inner-mobile"
    :class="{'whiteboard__element--disabled': disabled }">

    <transition
      name="whiteboard__element"
      @before-leave="$emit('close')"
      @before-enter="$emit('open')">

      <div 
        v-if="opened"
        class="whiteboard__element-dropup-mobile"

        v-click-outside="close"
        @click="close">

        <slot v-if="opened" name="list"/>
      </div>
    </transition>

    <div 
      ref="button"
      class="whiteboard__element-mobile"
      @click="toggle">
      
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

  methods: {
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

.whiteboard__element-enter, .whiteboard__element-leave-active
  max-height: 0
  padding: 0 5px
  
</style>