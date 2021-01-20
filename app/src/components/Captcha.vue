<template>
  <div :id="id">
  </div>
</template>

<script>
export default {
	data() {
    return {
      captchaHref: 'https://www.google.com/recaptcha/api.js',
      key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
     
      widgetId: null,
      resolve: null
    }
  },

  computed: {
    loaded() {
      return this.widgetId !== null;
    },

    id() {
      return this._uid + '_captcha';
    },
  },

  mounted() {
    this.load()
  },
  
  methods: {
  	load() {
			let script = document.createElement('script');

			script.setAttribute('async', true);
			script.setAttribute('defer', true);
      script.setAttribute('src', this.captchaHref);
      script.addEventListener('load', () => {
        grecaptcha.ready(this.render)
      });

			document.body.append(script);
    },

    render() {
      this.widgetId = grecaptcha.render(this.id, {
        'sitekey': this.key,
        'size': "invisible",
        'callback': this.submit,
        'error-callback': this.error 
      });
    },

    submit() {
      if (typeof this.resolve === 'function')
        this.resolve(...arguments)
    },

    error() {
      if (typeof this.resolve === 'function')
        this.resolve(...arguments) 
    },

    execute() {
      return grecaptcha.execute(this.widgetId, {action: 'login'});
    },

    validate(passed) {
      if (!!!this.loaded)
        return null;

      let promise = new Promise( resolve => {
        this.resolve = resolve
      });

      this.execute()
      return promise;
    }
  }
}
</script>