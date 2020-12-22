<template>
  <whiteboard-panel class="whiteboard__element--size">
    <button
      v-for="key in sizes"
      :key="key"

      class="whiteboard__button-size whiteboard__button"
      :class="[
        'whiteboard__button-size--' + key, 
        isSelected(key) ? 'whiteboard__button--selected': '']"

      @click="select(key)">
    </button>
  </whiteboard-panel>
</template>

<script>
import WhiteboardPanel from '@components/games/whiteboard/interface/WhiteboardPanel'

export default {
  components: {
    WhiteboardPanel
  },

  props: { 
    value: { type: Number, default: 1 }
  },

  data() {
    return {
      sizes: 6
    }
  },
  
  methods: {
    isSelected(value) {
      return this.value === value;
    },

    select(value) {
      this.$emit('input', value)
    },
  }
}
</script>