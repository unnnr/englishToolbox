<template>
  <section class="reviews container">
    <h2 class="reviews__title heading-second">Student reviews</h2>
    <swiper 
      class="reviews__swiper"
      :options="swiperOptions">

      <swiper-slide 
        v-for="{id, title, user, grade, text} in reviews" 
        :key="id">
        
        <review 
          :title="title"
          :user="user"
          :text="text"
          :grade="grade"
          :disabled="loading"/>

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
import HandleRequests from '@mixins/HandleRequests' 
import Reviews from '@models/Reviews'
import Review from '@components/reviews/Review'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

SwiperClass.use([Pagination]);

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    SwiperSlide,
    Review,
    Swiper,
  },

  mixins: [ HandleRequests ],

  data() {
    return {
      swiperOptions:{
        slidesPerView: 'auto',
        spaceBetween: 30
      },

      reviews: [{}, {}, {}, {}, {}],

      buttonShown: true
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