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

  data() {
    return {
      counting: true,

      /// can be 'auto'
      height: 0
    }
  },
  
  methods: {
    async onInput() {
      this.height = 'auto';

      this.height = this.$refs.input.scrollHeight + 1 + 'px';
    }
  }
}
</script>

<style lang="sass" scoped>

.textarea-group__textarea
  max-height: 200px

</style>