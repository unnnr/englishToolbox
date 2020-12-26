<template>
  <div 
    class="whiteboard__element whiteboard__element--color"
    :class="{'whiteboard__element--disabled': disabled}">

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
  props: { 
    disabled: { type: Boolean, default: false },

    value: { type: String, default: '' }
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

  methods: {
    isSelected(color) {
      return !!!this.disabled && this.value === color.hex;
    },

    select(color) {
      this.$emit('input', color.hex);
    }
  }
}
</script>