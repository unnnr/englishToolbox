<template>
  <div 
    class="register-overlay__input-group">

		<input 
      v-for="input in inputs"
      :key="input.index"

      class="register-overlay__input"
      v-model="input.value"
      ref="inputs"
      
      maxlength="1" 
      placeholder="-"
      
      @keydown.prevent.stop="event => onKeyDown(input, event)"
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

  props: {
    keysCount: { type: Number, default: 4},

    value: { type: String, default: ''},
  },

  computed: {
   code: {
      set(value) {
        let string  = value + '';


        for (let index in this.inputs) {
          if (index >= string.length)
            return;

          let key = string[index];
          let input = this.inputs[index];
          input.set(key);
        }
      },

      get() {
        let string = '';
        for (let {value} of this.inputs)
          string += value;

        return string;
      }
    }
  },

  mounted() {
    this.initKeys();

    window.addEventListener('paste', this.paste);
    window.addEventListener('keydown', this.focus);
  },

  beforeDestroy() {
    window.removeEventListener('paste', this.paste);
    window.removeEventListener('keydown', this.focus);
  },

  data() {
    return {
      inputs: [],
    }
  },

  methods: {
    initKeys() {
      function createInput(index) {
        let input = {
          index, value: ''
        };

        input.set =
           (char) => self.setChar(input, char);

        input.el = 
          () => self.$refs.inputs[index];

        input.focus = 
          () => input.el().focus();
        
        return input; 
      }

      const self = this;

      for (let i = 0; i < this.keysCount; i++)
        this.inputs.push(createInput(i));
    },

    parseChar(char) {
      // if key is integer or empty 
      if (char === '' || !!!isNaN(parseInt(char)))
        return char;

      return null;
    },

    setChar(input, char) {
      let parsed = this.parseChar(char); 

      if (parsed === null)
        return null;
        
      input.value = parsed;
      this.$emit('input', this.code);

      this.confirm(true);
      
      return parsed;
    },

    onKeyDown(input, event) {
      let key = event.key;

      // Detecting special keys
      switch (key) {
        case 'Backspace': 
          this.focusePrevios(input);
          input.set('');
          return true;

        case 'Delete': 
          input.set('');
          return true;

        case 'ArrowRight':
          this.focusNext(input);
          return true;

        case 'ArrowLeft':
          this.focusePrevios(input);
          return true;
      }

      let changed = input.set(key); 
      if (changed)
        this.focusNext(input);

      return changed;
    },

    confirm(preserveFurther) {
      if (preserveFurther && this.$options.sended)
        return;

      if (this.code.length !== this.keysCount)
        return;

      this.$options.sended = true;
      this.$emit('confirm', this.code);
    },

    focusNext(input) {
      let next = 
        this.inputs[input.index + 1];

      if (next)
        return next.focus();

      this.confirm(true);
    },

    focus(event) {
      if (event.ctrlKey || event.altKey)
        return;

      let target = null;

      for (let input of this.inputs) {
        if (input.value !== '')
          continue;

        target = input;
        break;
      }

      if (target === null)
        return;

      this.onKeyDown(target, event);
      event.preventDefault();
    },

    focusePrevios(input) {
      let previos =
        this.inputs[input.index - 1];

      if (previos)
        previos.focus();
    },

    paste(event) {
      let value = 
        event.clipboardData.getData('text').trim();

      this.code = value;
      event.preventDefault();
    },

    copy(event) {
      event.clipboardData.setData('text/plain', this.code);
      event.preventDefault();
    },
  } 
}
</script>