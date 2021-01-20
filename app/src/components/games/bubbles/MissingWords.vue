<template>
  <div 
    class="bubbles__bubble-input"
    :class="{
      'bubbles__bubble-input--success': correct,
      'bubbles__bubble-input--error': incorrect, 
      'bubbles__bubble-input--filled': filled,
      'bubbles__bubble-input--sm': small,
      'bubbles__bubble-input--md': medium,
      'bubbles__bubble-input--lg': large}">

    <input
      v-model="entry"
      ref="input"
      
      placeholder="ー"
      :disabled="disabled"
      :style="{'width': width}"

      :maxlength="50"

      @focus="onFocus"
      @keyup="onKeyup"
      @input="onInput"
      @blur="onBlur"/>

  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },

    correct: { type: Boolean, default: false },

    incorrect: { type: Boolean, default: false },

    missing: { type: Array, default: () => [] },
  },

  data() {
    return {
      entry: '',
      width: '',
      copy: null
    }
  },

  computed: {
    disabled() {
      return this.correct || this.incorrect;
    },

    small() {
      return !!!this.filled && this.missing.length < 2;
    },

    medium() {
      return !!!this.filled && this.missing.length === 2;
    },

    large() {
      return !!!this.filled && this.missing.length > 2;
    },

    filled() {
      return this.entry.length;
    } 
  },

  watch: {
    value(entry) {
      this.entry = entry

      if (!!!this.$refs.input)
        return;

      this.prepareCopy();
      this.resize();
      this.resolveCopy();      
    },

    incorrect(value) {
      if (!!!value){
        this.entry = this.value;
        return;
      }

      let sample = this.missing.join(' ');
      let message =  this.entry.length ?  
        this.entry +  ' ➞ ' : ''
      
      this.entry = message + sample;
      
      this.prepareCopy();
      this.resize();
      this.resolveCopy();
    }
  },

  beforeDestroy() {
    if (this.copy)
      this.resolveCopy();
  },

  methods: {
    prepareCopy() {
      let copy = this.$refs.input.cloneNode();
      
      Object.assign(copy.style, {
        fontWeight: '600',
        fontSize: '16px',
        position: 'absolute',
        opacity: '0',
        width: '0',
        top: '-1000px',
      })

      this.copy = copy;
      document.body.append(copy);
    },

    resize() {
      this.copy.value = this.entry;
      this.width = this.copy.scrollWidth + 'px';
    },

    resolveCopy() {
      this.copy.remove();
    },

    onInput(event) {
      this.resize();
      this.$emit('input', {entry: this.entry, event});
    },

    onKeyup(event) {
      if (event.key === 'Enter')
        this.$emit('resolve');
    },

    focus(event) {
      let input = this.$refs.input;
      input.focus();
    },

    onFocus() {
      this.prepareCopy();
      this.$emit('focus', event);
    },

    onBlur(event) {
      this.resolveCopy();
      this.$emit('blur', event);
    }
  }
}
</script>

<style lang="sass" scoped>

.bubbles__bubble-input input
  min-width: 100%

</style>s