<template>
  <section class="reviews-management container">
    <h3 class="banned__title heading-third">Reviews manage</h3>
    <div class="reviews-management__body">

      <pending-review 
        v-for="{id, title, user, grade, description} in reviews"
        :key="id"
        :title="title"
        :author="user"
        :grade="grade"
        :description="description"/>

    </div>
  </section>
</template>

<script>
import PendingReview from '@components/reviews/PendingReview'

export default {
  components: {
    PendingReview
  },
  
  data() {
    return {
      reviews: [{}, {}, {}, {}, {}, {},]
    }
  }
}
</script>