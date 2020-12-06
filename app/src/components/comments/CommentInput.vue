<template>
  <div class="addition__tab-footer comments__footer">
    <button 
      class="comments__profile-button"
      :style="{'background-image': avatarUrl}">
    </button>

    <textarea 
      v-model="entry"
      
      class="comments__textarea"
      ref="textarea"

      placeholder="Your comment"
      minlength="1"
      maxlength="256"
      :disabled="disabled"

      @keydown.enter.prevent="send"
      @input="onInput">
    </textarea>

    <button 
      class="comments__send-button"
      :disabled="disabled || empty"
      @click="send()">
    </button>
  </div>  
</template>

<script>
import Resolution from '@services/Resolution'
import Avatar from '@models/Avatar'

export default {
  props: {
    disabled: { type: Boolean, default: false }
  },

  data() {
    return {
      entry: '',
      avatar: '',
      minHeight: 40
    }
  },

  computed: {
    empty() {
      return this.entry.length === 0;
    },

    avatarUrl() {
      return 'url(' + this.avatar + ')';
    }
  },

  mounted() {
    this.loadAvatar();
    this.onInput()

    //this.$options.eventHandler = throttle(100, this.onInput);

    Resolution.listen(this.onInput, true);
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
      if (this.empty)
        return;

      this.$emit('sending', this.entry);
      this.entry = '';
    },

    async loadAvatar() {
      this.avatar = await Avatar.get();
    }
  }
}
</script>

<style lang="sass" scoped>

.comments__textarea
  max-height: 150px

</style>