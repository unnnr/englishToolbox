<template>
   <div 
      class="input-group"
      ref="wraper"
      :class="{'input-group--succes': false,
               'input-group--active': active,
               'input-group--password': isPassword,
               'input-group--email': isEmail}"
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
        
        :type=" this.entryHidden ? 'password' : ''"
        :placeholder="placeholder"
        :minlength="min"
        :maxlength="max"

        @keydown="onKeyDown"
        @focus="onFocuse"
        @blur="onBlur"
        novalidate>

    </div>

    <button
      v-if="isPassword" 
      :class="{'input-group__visibility': this.entryHidden, 
               'input-group__visibility_off': !!!this.entryHidden}"
      @click.stop="toggleVisibility">
    </button>

  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String,  default: null},
    
    label: { type: String, default: null },

    type: { type: String, default: null},

    max: { type: Number, default: null },

    min: { type: Number, default: null },

    counting: { type: Boolean, default: false }
  },

  data: function () {
    return {
      entry: '',

      focused: false,
      
      errors: [],

      entryHidden: false
    }
  },

  computed: {
    counter() {
      return Number.isInteger(this.max) ? 
        this.entry.length + ':' + this.max : this.entry.length;
    },

    counterShown() {
      return this.counting || this.max !== null || this.mix !== null ;
    },

    active() {
      console.log(this.focused || this.entry.length !== 0);
      return this.focused || this.entry.length !== 0;
    },

    message() {
      return this.errors.length ? this.errors[1] : this.label;
    },

    isPassword() {
      return this.type === 'password'
    },

    isEmail() {
      return this.type === 'email'
    }
  },

  beforeMount() {
    if (this.isPassword)
      this.entryHidden = true;
  },

  methods: {
    toggleVisibility() {
      this.entryHidden = !!!this.entryHidden;
    },
    
    onClick() {
      this.$refs.input.focus();
    },

    onFocuse() {
      this.focused = true;
    },

    onBlur() {
      this.focused = false;
    },

    onKeyDown(event) {

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