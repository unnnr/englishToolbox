<template>
  <section class="reviews-management container">
    <h3 class="heading-third">Reviews manage</h3>
    <request-form
      ref="form"
      :submit-callback="submit">
      
      <swiper
        class="reviews-management__body"
				ref="swiper"
				:options="swiperOptions">
				
        <swiper-slide 
          class="reviews__card"
          v-for="review in reviews"
          :key="review.id">
          
          <div class="reviews__card-person">
            <div class="reviews__card-photo"></div>
            <h5 class="reviews__card-name heading-fifth">Person Name</h5>
          </div>

          <div class="reviews__card-content">
            <h5 class="reviews__card-title heading-fifth">
              {{ review.title }}
            </h5>
            <p class="reviews__card-text text-third">
              {{ review.text }}
            </p>
          </div>
          <div class="reviews__card-grade">
            <div class="reviews__card-stars">
              <div 
                v-for="id in 5"
                class="reviews__card-star"
                :key="id"
                :class="{
                  'reviews__card-star--full': id <= review.grade 
                }">
              </div>
            </div>
            <span class="reviews__card-rating">5.0</span>
          </div>
          <div class="reviews__card-button-group">
            <submit-button
              class="reviews__card-button reviews__card-button--delete button-second"
              type="button"
              :loading="review.declining"
              :disabled="loading"
              @click.native="onDeclineClick(review)">
              
              delete
            </submit-button>

            <submit-button
              class="reviews__card-button reviews__card-button--apply button-second"
              type="button"
              :loading="review.verifying"
              :disabled="loading"
              @click.native="onVerifyClick(review)">
              
              apply
            </submit-button>
          </div>
        </swiper-slide>
      </swiper>
    </request-form>
  </section>
</template>

<script>

import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination, Autoplay, Scrollbar } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import SubmitButton from '@components/SubmitButton'
import RequestForm from '@components/RequestForm'
import Reviews from '@models/Reviews'

SwiperClass.use([Pagination, Autoplay, Scrollbar]);

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: { 
    SubmitButton,
    RequestForm,
		SwiperSlide,
    Swiper
  },

  data: function () {
    return {
      swiperOptions:{
				slidesPerView: 'auto',
      },

      reviews: [],
    }
  },

  computed: {
    loading: {
      cache: false,
      get() {
				return this.$refs.form && this.$refs.form.loading;
      }
    }
  },
  
  beforeMount() {
    this.load();
  },

  methods: {
    onDeclineClick(review) {
      // defining callback for submit function 
      this.$options.submitCallback = () =>
        this.decline(review);

      // mannualy sending request 
      let form = this.$refs.form;

      form.send();
    },

    onVerifyClick(review) {
      // defining callback for submit function 
      this.$options.submitCallback = () =>
        this.verify(review);

      // mannualy sending request 
      let form = this.$refs.form;

      form.send();
    },

    removeFromList(review) {
      for (let i in this.reviews)
      {
        let item = this.reviews[i];

        if (item.id !== review.id)
          continue;
        
        this.reviews.splice(i, 1);  
      }
    },

    async decline(review) {
      review.declining = true;

      await Reviews.delete(review.id).finally(() => 
        review.declining = false
      );

      this.removeFromList(review);
    },

    async verify(review) {
      review.verifying = true;
      
      await Reviews.verify(review.id).finally(() => 
        review.verifying = false
      );

      console.log(review);

      this.removeFromList(review);
    },

    async submit() {
      if (!!!this.$options.submitCallback)
        return;

      await this.$options.submitCallback();
    },

    async load() {
      for (let review of await Reviews.pending())
      {
        Object.assign(review,  {
          verifying: false,
          declining: false
        });

        this.reviews.push(review);
      }
    }
  }
};
</script>

<style scoped>

.reviews-management__body {
  position: relative;
}

.list-enter {
  opacity: 0;
}

.list-enter-active {
  opacity: 1;
}

.list-move {
  transition: transform 1s ease-in-out,
	  					opacity 1s ease-in-out;
}

.list-leave {
  opacity: 1;
  transition: opacity 1s;
}

.list-leave-active {
  opacity: 0;
}
</style>