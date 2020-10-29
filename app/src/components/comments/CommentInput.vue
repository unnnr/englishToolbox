<template>
  <div class="addition__tab-footer comments__footer">
    <button class="comments__profile-button"></button>

    <textarea 
      class="comments__textarea"
      placeholder="Your comment"
      maxlength="256"
      ref="textarea"

      v-model="entry"
      :style="{ 
        'height': this.height
      }"

      @input="onInput">
    </textarea>

    <button 
      class="comments__send-button"
      @click="send()">
    </button>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';

export default {
  data() {
    return {
      entry: '',
      height: 'auto'
    }
  },

  mounted() {
    this.onInput()

    this.$options.eventHandler = throttle(100, this.onInput);

    window.addEventListener('resize', 
			this.$options.eventHandler, true);
  },

	beforeDestroy() {
		window.removeEventListener('resize',
			this.$options.eventHandler);
	},

  methods: {
    async onInput(event) {
      this.height = 'auto';
      
      this.height = this.$refs.textarea.scrollHeight + 'px';
    },
    

    send() {

    }
  }
}
</script>