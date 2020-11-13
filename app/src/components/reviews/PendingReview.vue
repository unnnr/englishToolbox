<template>
  <div class="reviews-management__card">
    <review
      :description="description"
      :user="user"
      :title="title"
      :grade="grade"/>
    
    <button 
      class="reviews-management__button--accept button-secondary button--greenish"
      :disabled="disabled"
      @click="accept">
      
      accept
    </button>

    <button 
      class="reviews-management__button--decline button-secondary button--reddish"
      :disabled="disabled"
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

    title: { type: String },

    grade: { type: Number },

    user: { type: Object },
    
    disabled: { type: Boolean, default: false },
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