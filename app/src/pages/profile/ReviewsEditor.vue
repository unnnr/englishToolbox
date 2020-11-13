<template>
  <div class="reviews-management container">
    <h3 class="banned__title heading-third">Reviews manage</h3>
    <swiper
      class="reviews-management__body"
			:options="swiperOptions">
  
      <swiper-slide 
        v-for="{id, title, user, grade, description} in reviews"
        :key="id">
        
        <pending-review 
          :title="title"
          :user="user"
          :grade="grade"
          :disabled="sending"
          :description="description"
          @accept="accept(id)"
          @decline="decline(id)"/>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import PendingReview from '@components/reviews/PendingReview'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass } from 'swiper/core'
import Reviews from '@models/Reviews'

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    PendingReview,
    SwiperSlide,
    Swiper,
  },
  
  data() {
    return {
      reviews: [],
      sending: false,
      swiperOptions:{
				slidesPerView: 'auto',
				grabCursor: true,
      }
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    async send(callback) {
      if (this.sending)
        return;

      this.sending = true;
      try{
        await callback();
      }
      catch {
        bus.dispatch('alert-error');
      }
      finally {
        this.sending = false;
      }
    },

    accept(id) {
    
    },

    decline(id) {

    },

    async load() {
      this.reviews = await Reviews.pending();
    }
  }
}
</script>