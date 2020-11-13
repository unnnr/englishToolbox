<template>
  <section class="banned container">
    <h3 class="banned__title heading-third">Banned users</h3>
    <swiper
      class="banned__body"
			:options="swiperOptions">
  
      <swiper-slide 
        v-for="{id, comment} in comments"
        :key="id">
        
        <banned-comment
          :message="comment.message"
          :user="comment"
          @unban="unban(id)"/>

      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper as SwiperClass } from 'swiper/core'
import PendingReview from '@components/reviews/PendingReview'
import BannedComment from '@components/comments/BannedComment'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import bus from '@services/eventbus';
import Bans from '@models/Bans';

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

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
      
      comments: [],
      sending: false
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

    async unban(id) {
      if (this.sending)
        return;
      this.sending = true;

      try {
        await Bans.delete(id);
        this.remove(id);
      }
      catch {
        bus.dispatch('alert-error');
      }
      finally {
        this.sending = false;
      }
    },

    async load() {
      this.comments = await Bans.all();
    }
  }
}
</script>