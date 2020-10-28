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
export default {
  data() {
    return {
      entry: '',
      height: 'auto'
    }
  },

  mounted() {
    this.onInput()
  },

  methods: {
    async onInput(event) {
      this.height = '0';
      
      await this.$nextTick();

      this.height = this.$refs.textarea.scrollHeight + 1 + 'px';
    },

    send() {

    }
  }
}
</script>

<style lang="sass" scoped>

.comments__textarea 
  max-height: 300px

</style>