<template>
  <div :id="id">
  </div>
</template>

<script>
export default {
	data() {
    return {
      captchaHref: 'https://www.google.com/recaptcha/api.js',
      key: '6LclcEIaAAAAAPpDOJaEpMvC0o66fdck1mxLH_Nc',
     
      widgetId: null,
      resolve: null
    }
  },

  computed: {
    rendered() {
      return this.widgetId !== null;
    },

    id() {
      return this._uid + '_captcha';
    },
  },

  mounted() {
    this.load()
  },

  beforeDestroy() {
    if (this.rendered)
      window.grecaptcha.reset(this.widgetId);
  },
  
  methods: {
  	load() {
      if (window.grecaptcha) {
        this.loaded();
        return
      }

			let script = document.createElement('script');
			script.setAttribute('async', true);
			script.setAttribute('defer', true);
      script.setAttribute('src', this.captchaHref);
      script.addEventListener('load', this.loaded);

			document.body.append(script);
    },

    loaded() {
      window.grecaptcha.ready(this.render)
    },

    render() {
      this.widgetId = window.grecaptcha.render(this.id, {
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
      return window.grecaptcha.execute(this.widgetId, {action: 'login'});
    },

    validate() {
      if (!!!this.rendered)
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