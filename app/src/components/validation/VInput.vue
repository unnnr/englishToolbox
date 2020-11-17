<template>
   <div 
      class="input-group"
      :class="{
        'input-group-secondary': secondary,
        'input-group-primary': primary, 

        'input-group--disabled': disabled,
        'input-group--disabled': loading,
        'input-group--active': active,
        'input-group--focus': focused,

        'input-group--success': validated && !!!colorless,
        'input-group--error' : incorrect && !!!colorless,

        'input-group--password': isPassword,
        'input-group--email': isEmail,
        'input-group--name': isName,
      }"
      @click="onClick">

    <div class="input-group__inner">

      <span class="input-group__title">{{ message }}
        <transition name="fade">
          <small 
            v-if="counterShown"
            class="input-group__counter">

            {{ counter }}
          </small>
        </transition>
      </span>

      <input 
        class="input-group__input"
        ref="input"
        v-model="entry"
        
        :autocomplete="autocomplete"
        :type=" hidden ? 'password' : null"
        :placeholder="placeholder"
        :maxlength="max"
        :disabled="disabled || loading"

        @input="onInput"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClick"
        novalidate>

    </div>

    <button
      v-if="visibilityButtoned" 
      type="button"
      :disabled="forceHidden"
      :class="{'input-group__visibility': this.entryHidden, 
               'input-group__visibility-off': !!!this.entryHidden}"
      @click.self="toggleVisibility">
    </button>

  </div>
</template>

<script>

import HandleTextValidation from '@mixins/HandleTextValidation'

export default {
  mixins: [ HandleTextValidation ],

  props: {
    autocomplete: { type: String, default: 'on' },

    icon: { type: String, default: null},

    counting: { type: Boolean, default: false },

    colorless: { type: Boolean, default: false},

    forceHidden: { type: Boolean, default: false },

    focusOnMount: { type: Boolean, default: false},

    visibilityButtoned: { type: Boolean, default: false },
  },

  data() {
    return {
      entryHidden: false,
    }
  },

  computed: {
    isPassword() {
      return this.icon === 'password'
    },

    isEmail() {
      return this.icon === 'email'
    },

    isName() {
      return this.icon === 'name'
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

  mounted() {
    if (this.focusOnMount) {
      let input = this.$refs.input;

      input.focus();
    }
  },

  methods: {
    // Changes input visibility 
    toggleVisibility() {
      this.entryHidden = !!!this.entryHidden;

      if (this.entryHidden) 
        this.$emit('input:hidden');
      else  
        this.$emit('input:shown')
    }
  }
}
</script>