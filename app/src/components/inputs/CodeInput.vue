<template>
  <div class="register-overlay__input-group">
		<input 
      v-for="key in keys"
      :key="key.ref"

      class="register-overlay__input"
      ref="inputs"
      v-model="key.value"
      
      maxlength="1" 
      placeholder="-"
      
      @keydown.prevent.stop="event => onKeyDown(key, event)"
      @input="event => onInput(key, event)"
      @focus="focus.bind(key)"
      @blur="focus.bind(key)"
      @copy="copy">

      <v-hidden/>
	</div>
</template>

<script>
import VHidden from '@components/validation/VHidden'

export default {
  components: {
    VHidden
  },

  prop: {
    value: { type: String, default: ''},
  },

  computed: {
    code: {
      set(value) {
        let string  = value + '';

        for (let index in this.keys) {
          if (index >= string.length)
            return;
        
          let key = string[index];
          this.$set(this.keys[index], 'value', key);
        }
      },

      get() {
        let string = '';
        for (let {value} of this.keys)
          string += value;

        return string;
      }
    },

    focused() {
      for (let { focused } of this.keys) {
        if (focused)
          return true;
      }

      return false; 
    }
  },

  mounted() {
    for (let i = 0; i < this.keysCount; i++) {
       this.keys.push({ 
          value: '',
          focused: false,
      });
    }

    window.addEventListener('paste', this.paste);
    window.addEventListener('keydown', this.focus);
  },

  beforeDestroy() {
    window.removeEventListener('paste', this.paste);
    window.removeEventListener('keydown', this.focus);
  },

  data() {
    return {
      keysCount: 4,
      keys: [],
    }
  },

  methods: {
    focus() {
      if (this.focused)
        return;

      for (let key of this.keys) {
        if (key.value !== '')
          continue;
        
        let index = this.keys.indexOf(key);
        let input = this.$refs.inputs[index];

        input.focus();
        return;
      }
    },

    focusNext(key) {
      let index = this.keys.indexOf(key);
      let input = this.$refs.inputs[index + 1];

      // This way you can only fire once
      if (!!!input) {
        if (!!!this.$options.completed) {  
          this.$options.completed = true;
          this.confirm();
        }

        return;
      }

      input.focus();
    },

    focusePrevios(key) {
      let index = this.keys.indexOf(key);
      let input = this.$refs.inputs[index - 1];


      if (!!!input)
        return;

      input.focus();
    },

    confirm() {
      if (this.code.length !== this.keysCount)
        this.$emit('confirmed', this.code);
    },

    onKeyDown(key, event) {
      // Filtering numbers
      if (event.keyCode >= 48 && event.keyCode <= 59) {
        this.$set(key, 'value', event.key);
        this.focusNext(key);
        return;
      }

      // Filtering removing chars
      if (event.key === 'Backspace' || event.key === 'Delete') {
        this.$set(key, 'value', '');
        this.focusePrevios(key);
        return;
      }

      // Filtering confirm chars
      if (event.key === 'Enter') {
        this.confirm();
        return;
      }

      // Filtering arrows
      if (event.key === 'ArrowRight') {
        this.focusNext(key);
        return;
      }

      if (event.key === 'ArrowLeft') {
        this.focusePrevios(key);
        return;
      }
    },


    paste(event) {
      let value = 
        event.clipboardData.getData('text').trim();

      this.code = value;
    },

    copy(event) {
      event.clipboardData.setData('text/plain', this.code);
      event.preventDefault();
    },

    onFocus(key) {
      this.$set(key, 'focused', false);
    },

    onBlur(key) {
      this.$set(key, 'focused', false);
    },

    onInput(key, event) {
      this.$emit('input', 123);
    },
  }
}
</script>