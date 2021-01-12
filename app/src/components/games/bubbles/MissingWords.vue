<template>
  <div 
    class="bubbles__bubble-input"
    :class="{
      'bubbles__bubble-input--success': correct,
      'bubbles__bubble-input--error': incorrect, 
      'bubbles__bubble-input--empty': empty,
      'bubbles__bubble-input--sm': small,
      'bubbles__bubble-input--md': medium,
      'bubbles__bubble-input--lg': large}">

    <input
      v-model="entry"
      ref="input"
      
      placeholder="ー"
      :style="{'width': width}"

      @focus="prepareCopy"
      @keyup="onKeyup"
      @input="onInput"
      @blur="resolveCopy"/>

  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },

    missing: { type: Array, default: () => [] },

    correct: { type: Boolean, default: false },

    incorrect: { type: Boolean, default: false },
  },

  data() {
    return {
      entry: '',
      width: '',
      copy: null
    }
  },

  computed: {
    small() {
      return this.missing.length < 2;
    },

    medium() {
      return this.missing.length === 2;
    },

    large() {
      return this.missing.length > 2;
    },

    empty() {
      return !!!this.entry.length;
    } 
  },

  watch: {
    value(entry) {
      this.entry = entry
    },
  },

  mounted() {
    if (!!!this.value)
      return;

    this.entry = this.value;
    this.prepareCopy();
    this.resize();
    this.resolveCopy();
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

    onInput() {
      this.$emit('input', this.entry);
      this.resize();
    },

    onKeyup(event) {
      if (event.key === 'Enter')
        this.$emit('resolve');
    },

    focus() {
      let input = this.$refs.input;
      input.focus();
    }
  }
}
</script>

<style lang="sass" scoped>


.bubbles__bubble-input:not(.bubbles__bubble-input--empty)
  width: auto

.bubbles__bubble-input--empty input
  min-width: 100%

</style>s