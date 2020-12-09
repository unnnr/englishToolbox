<template>
  <div class="addition__tab-footer comments__footer">
    <button 
      class="comments__profile-button"
      :style="{'background-image': avatarUrl}"
      @click="toProfile">
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

    Resolution.listen(this.onInput, true);
  },

	beforeDestroy() {
		Resolution.detach(this.onInput);
	},

  methods: {
    onInput() {
      let textarea =  this.$refs.textarea;
      let style = textarea.style; 

      style.height = this.minHeight + 'px';
      style.height = textarea.scrollHeight + 'px';
    },

    toProfile() {
      this.$router.push({
        path: '/profile'
      });
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