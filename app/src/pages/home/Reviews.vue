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
            <div 
              v-for="id in 5"
              class="reviews__card-star"
              :key="id"
              :class="{
                'reviews__card-star--full': id <= review.grade 
              }">
            </div>
          </div>
          <span class="reviews__card-rating">
            {{ review.grade }}
          </span>
        </div>
      </swiper-slide>
    </swiper>
  <button 
    class="reviews__leave-review-button text-third"
    v-if="buttonShown"
    @click="showEditor">

    leave a review
  </button>
</section>
</template>

<script>

import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Reviews from '@models/Reviews'
import Auth from '@services/Auth'
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

      reviews: [],

      buttonShown: false
    }
  },

  beforeMount() {
    Auth.check().then( authenticated => 
			this.buttonShown = authenticated
    );
    
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