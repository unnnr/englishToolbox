<template>
  <div class="whiteboard__element whiteboard__element--color">
    <button 
      v-for="(color, index) in colors"
      :key="index"

      class="whiteboard__button-color whiteboard__button"
      :class="[
        'whiteboard__button-color--' + color.value,
        isSelected(color) ? 'whiteboard__button--selected': '']"
        
      @click="select(color)">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      colors: [
        { value: 'black',  hex: '' },
        { value: 'brown',  hex: '' },
        { value: 'red',    hex: '' },
        { value: 'yellow', hex: '' },
        { value: 'green',  hex: '' },
        { value: 'blue',   hex: '' }
      ]
    }
  },

  methods: {
    isSelected(color) {
      return color === this.selected;
    },

    select(color) {
      this.selected = color;
    }
  }
}
</script>