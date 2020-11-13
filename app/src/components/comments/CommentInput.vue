<template>
  <div class="addition__tab-footer comments__footer">
    <button class="comments__profile-button"></button>

    <textarea 
      v-model="entry"
      
      class="comments__textarea"
      ref="textarea"

      placeholder="Your comment"
      maxlength="256"
      :disabled="disabled"

      @keydown.enter.prevent="send"
      @input="onInput">
    </textarea>

    <button 
      class="comments__send-button"
      :disabled="disabled"
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
      minHeight: 40,
      disabled: false,
    }
  },

  mounted() {
    this.onInput()

    this.$options.eventHandler = throttle(100, this.onInput);

    window.addEventListener('resize', 
			this.$options.eventHandler);
  },

	beforeDestroy() {
		window.removeEventListener('resize',
     this.$options.eventHandler);
	},

  methods: {
    onInput(event) {
      let textarea =  this.$refs.textarea; 

      textarea.style.height = this.minHeight + 'px';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
    
    send() {
      this.disabled = true

      this.$emit('sending', {
        entry: this.entry,
        sended: () => { 
          this.disabled = false;
          this.entry = '';
        },
      });
    }
  }
}
</script>

<style lang="sass" scoped>

.comments__textarea
  max-height: 150px

</style>