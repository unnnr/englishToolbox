<template>
  <div class="banned__comment">
    <comment
      :created-at="createdAt"
      :message="message"
      :user="user"/>

    <button 
      class="button-secondary banned__button button--greenish"
      @click="unbun">
      
      unban
    </button>
  </div>
</template>

<script>
import Comment from '@components/comments/Comment'

export default {
  components: {
    Comment
  },

  props: {
    createdAt: { type: String },

    message: { type: String },
    
    user: { type: Object },
  },

  methods: {
    unbun() {
      this.$emit('unbun');
    }
  }
}
</script>