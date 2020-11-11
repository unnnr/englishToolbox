<template>
  <div class="banned__comment">
    <comment
      :image="image"
      :author="author"
      :message="message"
      :created-at="createdAt"/>

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
    image: { type: String },

    author: { type: String },

    message: { type: String },
    
    createdAt: { type: String }
  },

  methods: {
    unbun() {
      this.$emit('unbun');
    }
  }
}
</script>