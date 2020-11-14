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
          :disabled="submitting"
          :description="description"
          @accept="onAccept(id)"
          @decline="onDecline(id)"/>

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
      submitting: false,
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
    async send(request, onFail) {
      if (this.submitting)
        return;

      this.submitting = true;

      try{
        await request();
      }
      catch {
        let message = null;

        if (typeof onFail === 'function')
          message = onFail();

        bus.dispatch('alert-error', {
          message
        });
      }
      finally {
        this.submitting = false;
      }
    },

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
      this.reviews = await Reviews.pending();
    }
  }
}
</script>