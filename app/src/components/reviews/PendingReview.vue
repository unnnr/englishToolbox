<template>
  <div class="reviews-management__card">
    <review
      :description="description"
      :author="author"
      :avatar="avatar"
      :title="title"
      :grade="grade"/>
    
    <button 
      class="reviews-management__button--accept button-secondary button--greenish"
      @click="accept">
      
      accept
    </button>

    <button 
      class="reviews-management__button--decline button-secondary button--reddish"
      @click="decline">
      
      decline
    </button>
 
  </div>
</template>

<script>
import Review from '@components/reviews/Review'

export default {
  components: {
    Review
  },

   props: {
    description: { type: String },

    author: { type: String },
    
    avatar: { type: String },

    title: { type: String },

    grade: { type: Number },
  },

  methods: {
    decline() {
      this.$emit('decline');
    },

    accept() {
      this.$emit('accept');
    }
  }
}
</script>