<template> 
  <div 
    class="input-group-secondary input-group--upload  input-group--audio"
    @click="onClick">  
    
    <div class="input-group__inner">
      <span class="input-group__title">Your password<small class="input-group__counter">0/15</small></span>
      <input type="file" ref="file" class="input-group__input" placeholder="example: Qw1@#$%-_" >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    max: { type: Number, deafult: 10240 },

    name: { type: String, default: null},

    label: { type: String, default: null },

    optional: { type: Boolean, default: false }
  },

  data() {
    return {
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
      return this.name || 'Some file';
    }
  },
  
  methods: {
    onClick() {
      this.$refs.file.click();
    },
    
    validate() {
      
    },

    submit(data) {
      if (!!!this.name)
        return;

      data.append(); 
    }
  }
}
</script>