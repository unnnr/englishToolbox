<template>
  <div 
    class="register-overlay__input-group"
    @keydown.stop="">

		<number-cell 
      class="register-overlay__input"
      ref="inputs"

      v-for="(entry, index) of inputs"
      :key="index"

      :disabled="disabled"
      :value="entry"
      
      @input="(value) => onInput(index, value)"
      @previous="previous(index)"
      @next="next(index)"
      @copy="copy">

    </number-cell>
	</div>
</template>

<script>
import NumberCell from '@components/inputs/NumberCell'

 export default {
  components: {
    NumberCell
  },

  props: {
    keysCount: { type: Number, default: 4},

    value: { type: String, default: ''},

    disabled: { type: Boolean, default: false }
  },


  data() {
    return {
      length: 4,
      inputs: [],
    }
  },

  computed: {
    code: {
      get() {
        let code = '';

        for (let entry of this.inputs)
          code += entry;

        return code;
      },

      set(data) {
        if (isNaN(Number(data)))
          return;

        let string = String(data);
        let length = Math.min(string.length, this.length);

        for (let i = 0; i < length; i++) {
          let char = string[i];

          this.$set(this.inputs, i, char)
        }
      },

      cache: false
    },
  },

  watch: {
    disabled(value) {
      if (value)
        this.removeEvents();
      else
        this.initEvents();
    }
  },


  mounted() {
    this.initInputs();
    this.initEvents();
  },

  beforeDestroy() {
    this.removeEvents();
  },

  methods: {
    initInputs() {
      let inputs = [];
      for (let i = 0; i < this.length; i++)
        inputs.push('');

      this.inputs = inputs;
    },

    initEvents() {
      window.addEventListener('paste', this.paste);
      window.addEventListener('keydown', this.focus);
    },

    removeEvents() {
      window.removeEventListener('paste', this.paste);
      window.removeEventListener('keydown', this.focus);
    },

    copy(event) {
      event.clipboardData.setData('text/plain', this.code);
      event.preventDefault();
    },
    
    paste(event) {
      let value = 
        event.clipboardData.getData('text').trim();

      this.code = value;
      this.$emit('input', this.code);

      event.preventDefault();
    },

    onInput(index, value) {
      this.inputs[index] = value; 
      this.$emit('input', this.code)
    },

    next(index) {
      if (index + 1 >= this.length)  {
        if (!!!this.$options.sended)
          this.confirm();

        return;
      }

      let input = this.$refs.inputs[index + 1];
      input.focus();
    },

    previous(index) {
      if (!!!index)
        return;

      let input = this.$refs.inputs[index - 1];
      input.focus();
    },

    confirm() {
      if (this.code.length !== this.length)
        return;

      this.$options.sended = true;
      this.$emit('confirm', Number(this.code));
    },

    focus(event) {
      if (event.ctrlKey || event.altKey)
        return;

      let target = null;
      for (let i = 0; i < this.length; i++) {
        if (this.inputs[i])
          continue;

        target = this.$refs.inputs[i];
        break;
      }

      if (target === null)
        return;

      target.update(event.key);
      event.preventDefault();
    }
  } 
}
</script> 