<template>
  <div 
    class="builder__brick"
    @mousedown="drag">

    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' }
  },

  methods: {
    drag(event) {
      let target = {
        el: this.$el, word: this.text
      };

      this.$emit('drag', {
        target, event
      });
    }
  }
}
</script>
