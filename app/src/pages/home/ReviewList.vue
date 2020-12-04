<template>
  <section class="reviews container">
    <h2 class="reviews__title heading-second">Student reviews</h2>
    <swiper 
      class="reviews__swiper"
			:key="resolution"
			:cleanup-styles-on-destroy="false"
      :options="swiperOptions">

      <swiper-slide 
        v-for="{id, title, user, grade, text} in reviews" 
        :key="id">
        
        <review 
          :title="title"
          :user="user"
          :text="text"
          :grade="grade"
          :disabled="loading"
          
          v-context:items="createContext(id)"/>

      </swiper-slide>
    </swiper>
  <button 
    class="reviews__leave-review-button text-third"
    v-if="canUpload"
    @click="showEditor">

    leave a review
  </button>
</section>
</template>

<script>
// services
import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Reviews from '@models/Reviews'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

// mixins
import HandleDynamicSlides from '@mixins/HandleDynamicSlides'
import HandleRequests from '@mixins/HandleRequests'

// components
import Review from '@components/reviews/Review'

SwiperClass.use([Pagination]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)


export default {
  components: {
    SwiperSlide,
    Review,
    Swiper,
  },

  mixins: [ 
    HandleDynamicSlides,
    HandleRequests
  ],

  data() {
    return {
      reviews: [],

      canUpload: false,
      canDelete: true,
    }
  },

  beforeMount() {
    Auth.check().then( authenticated => 
			this.canUpload = authenticated
    );
    
    this.load();
  },

  methods: {
    createContext(id) {
      if (!!!this.canDelete)
        return null;

      function okay() {
        _this.send(() => 
          _this.deleteReview(id));
      }

      function showAlert() {
        bus.dispatch('alert-warning', {
          okay, message: 'A deleted review cannot be restored',
        })
      }

      let _this = this;

      return () => {
        return { 'Delete': showAlert }
      };
    },

    showEditor() {
      bus.dispatch('reviews-editor-showing');
    },

    async load() {
      this.reviews = await Reviews.verified();
    },

    async deleteReview(id) {
      await Reviews.delete(id);
      
      for (let review of this.reviews) {
        if (review.id !== id) 
          continue;

        let index = this.reviews.indexOf(review);
        this.reviews.splice(index, 1);
        break;
      }
    }
  }
}
</script>
