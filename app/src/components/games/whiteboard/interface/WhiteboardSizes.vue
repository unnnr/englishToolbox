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

  data() {
    return {
      selected: null,
      sizes: 6
    }
  },

  mounted() {
    this.select(1);
  },

  methods: {
    isSelected(index) {
      return index === this.selected;
    },

    select(value) {
      this.selected = value;
      this.$emit('change', value)
    },
  }
}
</script>