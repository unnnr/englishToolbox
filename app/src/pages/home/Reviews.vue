<template>
  <section class="reviews container">
    <h2 class="reviews__title heading-second">Student reviews</h2>

    <div class="reviews__swiper">

      <div class="reviews__card">
        <div class="reviews__card-person">
          <div class="reviews__card-photo"></div>
          <h5 class="reviews__card-name heading-fifth">Person Name</h5>
        </div>
        <h5 class="reviews__card-title heading-fifth">Title of review</h5>
        <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <div class="reviews__card-grade">
          <div class="reviews__card-star reviews__card-star--selected"></div>
          <div class="reviews__card-star reviews__card-star--selected"></div>
          <div class="reviews__card-star reviews__card-star--selected"></div>
          <div class="reviews__card-star reviews__card-star--selected"></div>
          <div class="reviews__card-star reviews__card-star--selected"></div>
          <span class="reviews__card-rating">5</span>
        </div>
      </div>

    </div>

    <button 
      class="reviews__leave-review-button text-third"
      @click="showEditor">
      
      leave a review
    </button>
  </section>
</template>


<script>
import bus from '@services/eventbus';

export default {
  methods: {
    showEditor() {
      bus.dispatch('reviews-editor-showing');
    }
  }
}
</script>