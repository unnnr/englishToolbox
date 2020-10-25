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
        {{ message }}
      </span>

      <input 
        class="input-group__input"
        type="file"
        ref="input"
        @change="onChange">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null},

    name: { type: String, default: null},

    label: { type: String, default: 'Your file' },

    max: { type: Number, deafult: 10240 },

    optional: { type: Boolean, default: false },

    disabled: { type: Boolean, defualt: false},
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
    file() {
      let input = this.$refs.input;
      let file = input.files[0];

      return file;
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

    active() {
      return this.focused || this.entry.length !== 0;
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
      this.validate();
    },

    collectErrors() {
      let errors = [];
      
      // Empty field can have only 'required error'
      if (!!!this.file)
      {
        if (!!!this.optional)
          errors.push(this.formatedName + ' cant be empty');

        return errors;
      }

      // max rules

      return errors;
		},
    
    validate() {
      this.errors = this.collectErrors();

      this.validated = !!!this.incorrect;

      return this.validated;
    },

    submit(data) {
      if (!!!this.name)
        return;

      data.append(this.name, this.file); 
    }
  }
}
</script>