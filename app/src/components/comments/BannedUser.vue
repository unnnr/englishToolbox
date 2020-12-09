<template>
  <div class="banned__comment">
    <comment
      :created-at="createdAt"
      :message="reason"
      :user="user"/>

    <button 
      class="button-secondary banned__button button--greenish"
      @click="unban">
      
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

    reason: { type: String },
    
    user: { type: Object },
  },

  methods: {
    unban() {
      this.$emit('unban');
    }
  }
}
</script>