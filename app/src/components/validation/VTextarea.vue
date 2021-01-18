<template>
  <div 
    :class="{
      'textarea-group-secondary': secondary,
      'textarea-group-primary': primary,

      'textarea-group--disabled': disabled,
      'textarea-group--disabled': loading,
      'textarea-group--focus': focused,
      'textarea-group--active': active,

      'textarea-group--success': validated,
      'textarea-group--error': incorrect
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
      v-model="entry"

      class="textarea-group__textarea"
      ref="input" 

      :maxlength="max"

      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeyDown">
    </textarea>
  </div>
</template>

<script>
import HandleTextValidation from '@mixins/HandleTextValidation'

export default {
  mixins: [ HandleTextValidation ],

  props: {
    autoGrow: { type: Boolean, default: true },
  },

  data() {
    return {
      counting: true,
    }
  },

  watch: {
    autoGrow(value) {
      if (value)
        this.onInput();
    },
  },

  mounted() { 
    setTimeout(() => this.autoGrow && this.adjust(), 100);
  },

  methods: {
    onInput(passive) {
      if (!!!this.autoGrow)
        return;
  
      this.adjust();
      this.$emit('input');
    },

    adjust() {
      let textarea = this.$refs.input;

      textarea.style.height = 'auto';
      textarea.style.height = this.$refs.input.scrollHeight + 'px';
    }
  }
}
</script>
