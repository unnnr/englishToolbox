<template>
   <div 
      class="input-group"
      ref="wraper"
      :class="{'input-group--success': success,
               'input-group--error' : incorrect,
               'input-group--active': active,

               'input-group--email': isEmail,
               'input-group--password': isPassword}"
      @click.stop="onClick">

    <div class="input-group__inner">

      <span class="input-group__title">{{ message }}
        <small 
          v-if="counterShown"
          class="input-group__counter">

          {{ counter }}
        </small>
      </span>

      <input 
        class="input-group__input"
        ref="input"
        v-model="entry"
        
        :type=" hidden ? 'password' : ''"
        :placeholder="placeholder"
        :maxlength="max"
        :minlength="min"

        @keydown="onKeyDown"
        @focus="onFocuse"
        @blur="onBlur"
        novalidate>

    </div>

    <button
      v-if="visibilityButtoned" 
      :disabled="forceHidden"
      :class="{'input-group__visibility': this.entryHidden, 
               'input-group__visibility_off': !!!this.entryHidden}"
      @click.stop="toggleVisibility">
    </button>

  </div>
</template>

<script>
export default {
  props: {
    // Properties 
    placeholder: { type: String,  default: null},
    
    label: { type: String, default: null },

    icon: { type: String, default: null},

    name: { type: String, default: 'this field'},

    max: { type: Number, default: null },

    min: { type: Number, default: null },

    // Callback
    submiting: { type: Function, default: null },

    validate: { type: Function, default: null },

    inputing: { type: Function, default: null },

    // Booleans 
    counting: { type: Boolean, default: false },

    visibilityButtoned: { type: Boolean, default: false },

    forceHidden: { type: Boolean, default: false },

    optional: { type: Boolean, default: false }
  },

  data: function () {
    return {
      entryHidden: false,
      focused: false,
      success: false,
      
      entry: '',
      errors: []
    }
  },

  computed: {
    message() {
      let message = this.incorrect ? 
        this.errors[0] : this.label;

      // capitalizing first
      let capitalized = 
        message.charAt(0).toUpperCase() + message.slice(1);

      return capitalized;
    },

    counter() {
      return Number.isInteger(this.max) ? 
        this.entry.length + '/' + this.max : this.entry.length;
    },
    
    counterShown() {
      return this.counting || this.max !== null;
    },

    incorrect() {
      return Boolean(this.errors.length);
    },

    active() {
      return this.focused || this.entry.length !== 0;
    },

    isPassword() {
      return this.icon === 'password'
    },

    isEmail() {
      return this.icon === 'email'
    },

    hidden() {
      return this.forceHidden || this.entryHidden;
    }
  },

  watch: {
    forceHidden(value) {
      if (value)
        this.$emit('input:hidden');
      else 
        this.$emit('input:shown')
    }
  },

  beforeMount() {
    if (this.isPassword)
      this.entryHidden = true;
  },

  methods: {
    toggleVisibility() {
      this.entryHidden = !!!this.entryHidden;

      if (this.entryHidden)
        this.$emit('input:hidden');
      else 
        this.$emit('input:shown')
    },
    
    onClick() {
      this.$refs.input.focus();
    },

    onKeyDown(event) {
      let options = {
        key: event.key,
        keyCode: event.keyCode,
        currentEntry: this.entry 
      };

      if (this.inputing && this.inputing(options))
        this.event.prevendDefault()
    },

    onFocuse() {
      this.focused = true;
    },

    onBlur() {
      this.focused = false;

      if (this.errors.submitting)
        this.collectSubmittingErrors();

      this.errors = this.collectErrors();
    },

    collectErrors() {
      let errors = [];
      
      // Empty field can have only 'required error'
      if (!!!this.entry.length)
      {
        if (!!!this.optional)
          errors.push(this.name + ' cant be empty');

        return errors;
      }
        
      // Default validation rules
      if (this.min !== null && this.entry.length < this.min)
        errors.push(this.name + ' must be longer than ' + this.min + ' characters')

      // Custom validation rules
      if (this.validate)
        this.validate(errors, this.entry);

      return errors;
    },

    submit() {
      return this.submiting ? this.submiting() : true;
    }
  }
}
</script>

<style lang="sass" scoped>

.input-group__visibility_off::before
  content: "visibility_off"
  font-family: "material icons round"
  font-size: 25px
  color: #a1a1b1

</style>>