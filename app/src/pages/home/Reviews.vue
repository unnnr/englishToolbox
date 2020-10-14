<template>
  <section class="reviews container">
  <h2 class="reviews__title heading-second">Student reviews</h2>
  <swiper 
    class="reviews__cards" 
    :options="swiperOptions">

    <swiper-slide 
      class="reviews__card"
      v-for="review in reviews" 
      :key="review.id">
      
      <div class="reviews__card-person">
        <div class="reviews__card-photo"></div>
        <h5 class="reviews__card-name heading-fifth">
          {{ review.user.name }}
        </h5>
      </div>
      <div class="reviews__card-content">
        <h5 class="reviews__card-title heading-fifth">
          {{ review.title }}
        </h5>
        <p class="reviews__card-text text-third"> 
          {{ review.text }}
        </p>
      </div>
      <div class="reviews__card-grade">
        <div class="reviews__card-stars">
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--full"></div>
          <div class="reviews__card-star reviews__card-star--half"></div>
        </div>
        <span class="reviews__card-rating">4.5</span>
      </div>
    </swiper-slide>

  </swiper>
  <button 
    class="reviews__leave-review-button text-third"
    @click="showEditor">

    leave a review
  </button>
</section>
</template>

<script>

import { Swiper as SwiperClass, Pagination } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Reviews from '@models/Reviews'
import bus from '@services/eventbus'

SwiperClass.use([Pagination]);

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    SwiperSlide,
    Swiper
  },

  data: function() {
    return {
      swiperOptions:{
				slidesPerView: 'auto',
      },

      reviews: []
    }
  },

  beforeMount() {
    this.load();
  },

  methods: {
    showEditor() {
      bus.dispatch('reviews-editor-showing');
    },

    async load() {
      this.reviews = await Reviews.verified();
    }
  }
}
</script>

<style scoped>
  .reviews__cards {
    width: 100%;
  }
</style>