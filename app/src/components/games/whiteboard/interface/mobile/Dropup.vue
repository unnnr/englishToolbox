<template>
  <div class="whiteboard__group-inner-mobile whiteboard__group-inner-mobile--color">
    <div 
      v-if="opened"
      class="whiteboard__element-dropup-mobile whiteboard__element-dropup-mobile--active"

      v-click-outside="close"
      @click="close">

      <div ref="list" v-show="false">
        <slot name="list"/>
      </div>

      {{ listCopy }}
    </div>

    <div 
      ref="button"
      class="whiteboard__element-mobile"
      @click="toggle">
      
      <template name="fade">
        <slot name="button"/> 
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCopy: '',
      opened: false
    }
  },


  methods: {
    close() {
      if (!!!this.opened)
        return;

      this.opened = false;
    },

    show() {
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