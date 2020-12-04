<template> 
  <div 
    class="input-group--upload"
    :class="{
      'input-group-secondary': secondary,
      'input-group-primary': primary, 

      'input-group--disabled': disabled,
      'input-group--disabled': loading,

      'input-group--success': validated,
      'input-group--error' : incorrect,

      'input-group--audio': isAudio,
      'input-group--image': isImage }"
    @click="onClick">  
    
    <div class="input-group__inner">
      <span class="input-group__title">
        {{ label }}
      </span>

      <input 
        class="input-group__input"
        ref="input"
        type="file"
        :accept="accept"
        @change="onChange">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null},

    name: { type: String, default: null},

    accept: { type: String, default: null },

    label: { type: String, default: 'Your file' },

    max: { type: Number, deafult: 10240 },

    optional: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false},
  },

  inject: [ 'secondary' ],

  data() {
    return {
      loading: false,
      validated: false,
      errors: [],
    }
  },
  
  computed: {
    file: {
      get() {
        let input = this.$refs.input;
        let file = input.files[0];

        return file;
      },
      cache: false
    },

    message() {
      let message = this.incorrect ? 
        this.errors[0] : this.label;

      // capitalizing first
      let capitalized = 
        message.charAt(0).toUpperCase() + message.slice(1);

      return capitalized;
    },

    formatedName() {
      return this.name || 'this field';
    },
    
		incorrect() {
      return Boolean(this.errors.length);
		},
		
		primary() {
      return !!!this.secondary;
    },

    isAudio() {
      return this.icon === 'audio';
    },

    isImage() {
      return this.icon === 'image';
    },
  },
  
  methods: {
    onClick() {
      this.$refs.input.click();
    },

    onChange() {
      if (!!!this.validate())
        return;

      this.$emit('change', this.file);
    },

    collectErrors() {
      let errors = [];

      if (!!!this.file) 
      {
        if (!!!this.optional)
          errors.push(this.formatedName + ' cant be empty');

        return errors;
      }

      if (this.max !== null && this.file.size > this.max)
        errors.push('File is too large');

      return errors;
    },
    
    hasChanges() {
      return this.validated;
    },
    
    validate() {
      this.errors = this.collectErrors();
    
      if (this.optional && (!!!this.errors.length && !!!this.file))
        this.validated = false;
      else
        this.validated = !!!this.incorrect;

      return !!!this.incorrect;
    },

    submit(data) {
      if (!!!this.name || !!!this.validated)
        return;

      data.append(this.name, this.file); 
      this.validated = false;
    },

    handleError(errors) {
      if (!!!this.name || !!!errors || !!!errors[this.name]) {
        if (!!!this.optional || this.file)
          this.validated = true;
        return;
      }

      this.validated = false;
      this.errors.push(errors[this.name]);
    }
  }
}
</script>