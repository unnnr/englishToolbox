<template>
  <section class="reviews-management container">
    <h3 class="banned__title heading-third">Reviews manage</h3>
    <div class="reviews-management__body">

      <pending-review/>

    </div>
  </section>
</template>

<script>
import PendingReview from '@components/reviews/PendingReview'

export default {
  components: {
    PendingReview
  }
}
</script>