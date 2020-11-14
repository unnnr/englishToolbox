const HandleTextValidation = {
	props: {
		// Properties 
		placeholder: { type: String,  default: null},

    label: { type: String, default: 'Your text' },

		name: { type: String, default: null },

		max: { type: Number, default: null },

    min: { type: Number, default: null },

    // Default value, but for v-model supporting 
    // 'default' prefix is removed
    value: { type: String, default: '' },

		// Callback
		submitting: { type: Function, default: null },

		validating: { type: Function, default: null },

		inputing: { type: Function, default: null },

		// Booleans 
		optional: { type: Boolean, default: false },

		disabled: { type: Boolean, default: false}
  },

  inject: [ 'secondary' ],

	data() {
		return {
      focused: false,
      validated: false,
      loading: false,

      entry: '',

      errors: []
		}
	},

	inject: [ 'secondary' ],

	computed: {
		message() {
      let message = this.incorrect ? 
        this.errors[0] : this.label;

      // capitalizing first
      let capitalized = 
        message.charAt(0).toUpperCase() + message.slice(1);

      return capitalized;
		},
		
		counter() {
      return Number.isInteger(this.max) ? 
        this.entry.length + '/' + this.max : this.entry.length;
		},
		
		entryNearMax() {
      if (this.max === null && this.max)
        return false;

      const BOUNDARY = 70;
      let fillingPercent = this.entry.length * 100 / this.max;

      return fillingPercent >= BOUNDARY;
		},
		

    counterShown() {
      if (this.max !== null && !!!this.entryNearMax)
        return false;

      return this.counting || this.max !== null;
		},
		
		formatedName() {
      if (!!!this.name)
        return 'this field';

      let parsed = this.name.replace(/[A-Z]/g, entrie => {
        return ' ' + entrie.toLowerCase();
      });

      return parsed;
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
  },
  
  watch: {
    value: {
      handler(newValue) {
        if (typeof newValue !== 'string' || this.entry === newValue)
          return;

        this.entry = newValue;
        this.$options.defaultValue = newValue;
      },
  
      immediate: true
    }
  },
	
	methods: {
    async reset() {
      this.entry = this.value;
      this.validated = false;
      this.errors = [];
    },
    
    hasChanges() {
      let defaultValue =  typeof this.$options.defaultValue === 'string' ? 
        this.$options.defaultValue : '' 

      return this.entry !== defaultValue;
    },

    onInput() {
      this.$emit('input', this.entry);
    },
    
		onClick() {
      this.$refs.input.focus();
    },

    onKeyDown(event) {
      // Preventing form submittin on enter 
      if (event.key === 'Enter') { 
        this.$refs.input.blur();
        event.preventDefault();

        return;
      }
      
      // Invoking validate callback
      let options = {
        key: event.key,
        keyCode: event.keyCode,
        currentEntry: this.entry 
      };

      if (this.inputing && this.inputing(options))
        this.event.preventDefault()
    },

    onFocus() {
      if (this.$options.focusing)
        clearTimeout(this.$options.focusing);

      this.focused = true;
    },

    onBlur() {
      const DELAY = 170;
      
      if (this.$options.focusing)
        clearTimeout(this.$options.focusing);

      // Preventing redundant events
      this.$options.focusing =
        setTimeout(() => {
          this.focused = false;
          this.$options.focusing = null;

          this.validate();
        }, DELAY);
		},
	
    collectErrors() {
      let errors = [];
      
      // Empty field can have only 'required error'
      if (!!!this.entry.length) {
        if (!!!this.optional)
          errors.push(this.formatedName + ' cant be empty');

        return errors;
      }
        
      // Default validation rules
      if (this.min !== null && this.entry.length < this.min)
        errors.push(this.formatedName + ' must be longer than ' + this.min + ' characters')

      // Custom validation rules
      if (this.validating)
        this.validating(errors, this.entry);

      return errors;
		},
		
		validate() {    
      this.errors = this.collectErrors();

      if (this.optional && (!!!this.errors.length && !!!this.entry.length))
        this.validated = false;
      else
        this.validated = !!!this.incorrect;

      return !!!this.incorrect;
    },

    submit(data) {
      if (this.optional && this.entry.length === 0)
        return;

      if (this.submitting)
        return this.submitting(data);

      if (!!!this.name)
        return;
      
      // Changing default value
      this.$options.previousValue = this.$options.defaultValue;
      this.$options.defaultValue = this.entry;

      data.append(this.name, this.entry);
    },

    handleError(errors) {
      this.$options.defaultValue = 
        this.$options.previousValue;

      if (!!!this.name || !!!errors || !!!errors[this.name])
        return;

      this.validated = false;
      this.errors.push(errors[this.name]);
    }
	}
}

export default HandleTextValidation;