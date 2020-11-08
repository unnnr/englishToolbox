<template>
  <button
    class="tag"
    type="button"

    :disabled="disabled"
    :style="{ 
      'background-color': colorful  ? color : '' 
    }"
    :class="{ 
      'tag--selected': created,
      'tag--created': created,
      'tag--circle': circled,
      'tag--main': main
    }">

    <span class="tag__name" for="cb2">
      {{ !!!circled ?  label : '' }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    color: { type: String, default: '' },
    
    label: { type: String, default: 'tag' },
    
    alwaysColored: { type: Boolean, default: true },
    
    disabled: { type: Boolean, default: false },

    selected: { type: Boolean, default: false },

    created: { type: Boolean, default: false },
    
    circled: { type: Boolean, default: false },

    main: { type: Boolean, default: false },
  },

  computed: {
    colorful() {
      return this.alwaysColored || this.selected || this.main;
    }
  }
}
</script>