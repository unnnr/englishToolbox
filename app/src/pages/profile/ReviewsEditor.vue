<template>
  <div class="reviews-management container">
    <h3 class="banned__title heading-third">Reviews manage</h3>
    <swiper
      class="reviews-management__body"
			:cleanup-styles-on-destroy="false"
			:options="swiperOptions">
  
      <swiper-slide 
        v-for="{id, user, grade, text, title} in reviews"
        :key="id"
        class="reviews__swiper-slide">
        
        <pending-review 
          :text="text"
          :user="user"
          :title="title"
          :grade="grade"
          :disabled="loading"
          @accept="onAccept(id)"
          @decline="onDecline(id)"/>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// services
import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Reviews from '@models/Reviews'

// mixins
import HandleRequests from '@mixins/HandleRequests'

// components
import PendingReview from '@components/reviews/PendingReview'

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)


export default {
  components: {
    PendingReview,
    SwiperSlide,
    Swiper,
  },

  mixins: [ HandleRequests ],
  
  data() {
    return {
      swiperOptions:{
				slidesPerView: 'auto',
				grabCursor: true,
      },

      reviews: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    remove(id) {
      for (let index in this.reviews) {
        if (id !== this.reviews[index].id)
          continue;

        this.reviews.splice(index, 1)
        return;
      }
    },

    onAccept() {
      this.send(
        this.accept.bind(this, ...arguments));
    },

    onDecline() {
      this.send(
        this.decline.bind(this, ...arguments));
    },


    async accept(id) {
      await Reviews.verify(id);

      this.remove(id);
    },

    async decline(id) {
      await Reviews.delete(id);

      this.remove(id);
    },

    async load() {
      // this.reviews = await Reviews.pending();
    },
  }
}
</script>
