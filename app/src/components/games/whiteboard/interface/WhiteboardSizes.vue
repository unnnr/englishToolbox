<template>
  <div class="whiteboard__element whiteboard__element--size">
    <button
      v-for="key in sizes"
      :key="key"

      class="whiteboard__button-size whiteboard__button"
      :class="[
        'whiteboard__button-size--' + key, 
        isSelected(key) ? 'whiteboard__button--selected': '']"

      @click="select(key)">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      sizes: 6
    }
  },

  methods: {
    isSelected(index) {
      return index === this.selected;
    },

    select(index) {
      this.selected = index;
    }
  }
}
</script>