<template>
  <whiteboard-panel class="whiteboard__element--color">
    <button 
      v-for="(color, index) in colors"
      :key="index"

      class="whiteboard__button-color whiteboard__button"
      :class="[
        'whiteboard__button-color--' + color.value,
        isSelected(color) ? 'whiteboard__button--selected': '']"
        
      @click="select(color)">
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
      colors: [
        { value: 'black',  hex: '#111111' },
        { value: 'brown',  hex: '#7C5C5C' },
        { value: 'red',    hex: '#ff6688' },
        { value: 'yellow', hex: '#f9a922' },
        { value: 'green',  hex: '#1dd1bb' },
        { value: 'blue',   hex: '#6666ff' }
      ]
    }
  },

  mounted() {
    this.select(this.colors[0]);
  },

  methods: {
    isSelected(color) {
      return color === this.selected;
    },

    select(color) {
      this.selected = color;
      this.$emit('change', color.hex);
    }
  }
}
</script>