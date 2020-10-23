<template>
  <div 
    :class="{
      'textarea-group-secondary': secondary,
      'textarea-group-primary': primary,

      'textarea-group--disabled': disabled,
      'textarea-group--disabled': loading,
      'textarea-group--focus': focused,
      'textarea-group--active': active,

      'input-group--success': validated,
      'text-group--error': incorrect
    }"
    @click="onClick">  

    <span class="textarea-group__title">
      {{ message }}
      
      <transition name="fade">
        <small
          class="textarea-group__counter"
          v-if="counterShown">

          {{ counter }}
        </small>
      </transition>
    </span>

    <textarea 
      class="textarea-group__textarea"
      ref="textarea" 
      v-model="entry"

      :placeholder="placeholder"
      :maxlength="max"

      @focus="onFocus"
      @blur="onBlur">
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    // Properties 
    placeholder: { type: String,  default: null},

    label: { type: String, default: 'Your text'},

    name: { type: String, default: null },

    max: { type: Number, default: null },
   
    // Callback
    submitting: { type: Function, default: null },

    validating: { type: Function, default: null },

    inputing: { type: Function, default: null },

    // Booleans 
    secondary: { type: Boolean, default: false },

    optional: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false}
  },

  data() {
    return {
      focused: false,
      validated: false,
      loading: false,

      entry: '',

      errors: {}
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

    entryNearMax() {
      if (this.max === null && this.max)
        return false;

      const BOUNDARY = 70;
      let fillingPercent = this.entry.length * 100 / this.max;

      return fillingPercent >= BOUNDARY;
    },

    counterShown() {
      return this.max === null || this.entryNearMax;
    },

    active() {
      return this.focused || this.entry.length !== 0;
    },

    primary() {
      return !!!this.secondary;
    },

    formatedName() {
      return this.name || 'this field';
    },
    
    incorrect() {
      return Boolean(this.errors.length);
    }
  },

  methods: {
    onClick() {
      this.$refs.textarea.focus();
    },

    onFocus() {
      if (this.$options.focusing)
        clearTimeout(this.$options.focusing);

      this.focused = true;
    },

    onBlur() {
      const DELAY = 170;
      
      if (this.$options.focusing)
        clearTimeout(this.$options.focusing);

      // Preventing redundant events
      this.$options.focusing =
        setTimeout(() => {
          this.focused = false;
          this.$options.focusing = null;

          this.validate();
        }, DELAY);
    },

    validate() {
      this.errors = this.collectErrors();

      this.validated = !!!this.incorrect;

      return this.validated;
    },

    // Validates input
    collectErrors() {
      let errors = [];
      
      // Empty field can have only 'required error'
      if (!!!this.entry.length)
      {
        if (!!!this.optional)
          errors.push(this.formatedName + ' cant be empty');

        return errors;
      }

      // Custom validation rules
      if (this.validating)
        this.validating(errors, this.entry);

      return errors;
    },

    // Collects data
    submit(data) {
      if (this.submitting)
        return this.submitting(data);

      if (!!!this.name)
        return;

      data.append(this.name, this.entry);
    }
  }
}
</script>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s;

.fade-enter, .fade-leave-to
  opacity: 0;

</style>