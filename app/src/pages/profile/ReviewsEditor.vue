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
          :author="user"
          :grade="grade"
          :description="description"/>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import PendingReview from '@components/reviews/PendingReview'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass } from 'swiper/core'

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    PendingReview,
    SwiperSlide,
    Swiper,
  },
  
  data() {
    return {
      swiperOptions:{
				slidesPerView: 'auto',
				grabCursor: true,
			},
      reviews: [{}, {}, {}, {}, {}, {},]
      
    }
  }
}
</script>