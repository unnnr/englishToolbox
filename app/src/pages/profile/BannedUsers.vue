<template>
  <section class="banned container">
    <h3 class="banned__title heading-third">Banned users</h3>
    <div class="banned__body">
      <swiper
        :key="resolution.type"
        :cleanup-styles-on-destroy="false"
        :options="swiperOptions">
      
        <swiper-slide 
          v-for="{id, user, reason, createdAt} in comments"
          :key="id">
          
          <banned-user
            :created-at="createdAt"
            :reason="reason"
            :user="user"
            @unban="onUnbanning(id)"/>

        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
// services
import { Swiper as SwiperClass } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Bans from '@models/Bans';
import bus from '@services/eventbus';

// mixins
import HandleDynamicSlides from '@mixins/HandleDynamicSlides'
import HandleRequests from '@mixins/HandleRequests'

// components
import BannedUser from '@components/comments/BannedUser'

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
    SwiperSlide,
    BannedUser,
    Swiper,
  },

  mixins: [ 
    HandleDynamicSlides,
    HandleRequests
  ],
  
  data() {
    return {
      swiperOptions:{
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

<style lang="sass" scoped>

.banned__body
    overflow: hidden

</style>