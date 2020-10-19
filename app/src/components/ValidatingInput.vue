<template>
   <div 
      class="input-group"
      ref="wraper"
      :class="{'input-group--succes': false,
               'input-group--active': active,
               'input-group--password': isPassword,
               'input-group--email': isEmail}"
      @click="onClick">

    <div class="input-group__inner">
      <span class="input-group__title">{{ label }}<small class="input-group__counter">0/15</small></span>
      <input 
        class="input-group__input"
        ref="input"
        v-model="entry"
        :placeholder="placeholder"
        @focus="onFocuse"
        @blur="onBlur">

    </div>
    <button class="input-group__visibility"></button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Your password'
    },
    
    placeholder: {
      type: String, 
      default: 'some'
    },

    min: {
      type: Number,
      default: null
    },

    max: {
      type: Number,
      default: null
    },

    type: {
      type: String,
    }
  },

  data: function () {
    return {
      entry: '',

      focused: false
    }
  },

  computed: {
    active: function () {
      return this.focused || this.entry.length !== 0;
    },

    isPassword() {
      return this.type === 'password'
    },

    isEmail() {
      return this.type === 'email'
    }
  },

  methods: {
    onClick() {
      this.$refs.input.focus();
    },

    onFocuse() {
      this.focused = true;
    },

    onBlur() {
      this.focused = false;
    }
  }
}
</script>