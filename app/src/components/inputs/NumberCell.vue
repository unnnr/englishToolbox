<template>
  <input
    type="number"

    :disabled="disabled"
    maxlength="1" 
    placeholder="-"

    @keydown="onKeyDown"
    @input="onInput"
    @copy="copy"/> 
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },

    value: { type: String, default: '' }
  },

  data() {
    return {
      entry: ''
    }
  },

  watch: {
    value(data) {
      this.update(data);
    }
  },

  methods: {
    focus() {
      this.$el.focus();
    },

    copy() {
      this.$emit('copy');
    },

    next() {
      this.$emit('next');
    },

    previous() {
      this.$emit('previous');
    },

    onKeyDown(event) {
      let { key } = event;

      switch (key) {
        case 'ArrowRight':
          this.next();
          return;

        case 'ArrowLeft':
          this.previous();
          return;

        case 'Delete':
          this.previous();
          return;

        case 'Backspace':
          this.previous();
          return;
      }
    },

    update(data) {
      if (data) {
        this.entry = data[0];
        this.next();
      }
      else {
        this.entry = '';
      }
      
      this.$el.value = this.entry;
    },

    onInput(event) {
      let data = event.data;

      this.update(data);
      this.$emit('input', this.entry);
    },
  }
}
</script>