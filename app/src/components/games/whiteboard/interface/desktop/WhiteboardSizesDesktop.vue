<template>
  <div 
    class="whiteboard__element whiteboard__element--size"
    :class="{'whiteboard__element--disabled': disabled}">
    
    <button
      v-for="key in sizes"
      :key="key"

      class="whiteboard__button-size whiteboard__button"
      :class="[
        'whiteboard__button-size--' + key, 
        isSelected(key) ? 'whiteboard__button--selected': '']"

      :disabled="disabled"
      @click="select(key)">
    </button>
  </div>
</template>

<script>
export default {
  props: { 
    disabled: { type: Boolean, default: false },

    value: { type: Number, default: -1 }
  },

  data() {
    return {
      sizes: 6
    }
  },

  methods: {
    isSelected(value) {
      return !!!this.disabled && this.value === value;
    },

    select(value) {
      this.$emit('input', value)
    },
  }
}
</script>