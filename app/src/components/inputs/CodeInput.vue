<template>
  <div class="register-overlay__input-group">
		<input 
      v-for="key in keys"
      :key="key.ref"

      class="register-overlay__input"
      :ref="key.ref"
      v-model="key.value"
      
      maxlength="1" 
      placeholder="-"
      
      @input="event => onInput(index, key)"
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
          ref: this.inputName(i),
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
    some(index) {
      console.log(index)
      return '' + index;
    },

    inputName(index) {
      return 'input_' + index;
    },


    focus() {
      for (let key of this.keys) {
        
        if (key.value !== '')
          continue;
        
        let input = this.$refs[key.ref];
        console.log(input);
        input.focus();
        return;
      }
    },


    paste(event) {
      let value = event.clipboardData.getData('text').trim();

      this.code = value;
    },

    copy(event) {
      console.log(123, this.code);

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
      console.log(event);

      this.$emit('input', 123);
    },
  }
}
</script>