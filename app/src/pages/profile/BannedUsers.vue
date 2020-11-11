<template>
  <section class="banned container">
    <h3 class="banned__title heading-third">Banned users</h3>
    <swiper
      class="banned__body"
			:options="swiperOptions">
  
      <swiper-slide 
        v-for="{id, user, message} in users"
        :key="id">
        
        <banned-comment
          :message="message"
          :user="user"/>

      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import PendingReview from '@components/reviews/PendingReview'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass } from 'swiper/core'

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

import BannedComment from '@components/comments/BannedComment'

export default {
  components: {
    BannedComment,
    SwiperSlide,
    Swiper,
  },
  
  data() {
    return {
      swiperOptions:{
				slidesPerView: 'auto',
				grabCursor: true,
      },
      
      users: [{}, {}, {}, {}, {}, {},]
    }
  }
}
</script>