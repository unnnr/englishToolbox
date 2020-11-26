<template>
  <section class="banned container">
    <h3 class="banned__title heading-third">Banned users</h3>
    <swiper
      class="banned__body"
			:cleanup-styles-on-destroy="false"
			:options="swiperOptions">
  
      <swiper-slide 
        v-for="{id, user, message, postedAt} in comments"
        :key="id">
        
        <banned-comment
          :created-at="postedAt"
          :message="message"
          :user="user"
          @unban="onUnbanning(id)"/>

      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper as SwiperClass } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import BannedComment from '@components/comments/BannedComment'
import PendingReview from '@components/reviews/PendingReview'
import HandleRequests from '@mixins/HandleRequests'
import Bans from '@models/Bans';
import bus from '@services/eventbus';

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    BannedComment,
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
      
      comments: [],
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    remove(id) {
      for (let index in this.comments)
      {
        if (this.comments[index].id !==  id)
          continue;

        this.comments.splice(index, 1);
        return;
      }
    },

    onUnbanning() {
      this.send(
        this.unban.bind(this, ...arguments));
    },

    async unban(id) {
      await Bans.delete(id);
      this.remove(id);
    },

    async load() {
      this.comments = await Bans.all();
    }
  }
}
</script>