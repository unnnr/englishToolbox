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
      class="textarea-group__textarea"
      ref="input" 

      v-model="entry"

      :maxlength="max"
      :style="{ 
        'height': this.height
      }"

      @focus="onFocus"
      @input="onInput"
      @blur="onBlur">
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

      /// can be 'auto'
      height: 0
    }
  },

  watch: {
    autoGrow(value) {
      if (value)
        this.onInput();
      else
        this.height = '';
    },
  },

  mounted() {
    if (this.autoGrow)
      this.onInput();
  },

  methods: {
    async onInput() {
      if (!!!this.autoGrow)
        return;

      let textarea = this.$refs.input;

      textarea.style.height = 'auto';

      textarea.style.height = this.$refs.input.scrollHeight + 'px';
    }
  }
}
</script>
