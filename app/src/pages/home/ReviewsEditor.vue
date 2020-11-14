<template>
  <transition name="fade">
    <section
      v-if="shown" 
      class="modal container">

      <request-form 
        class="modal__content leave-review"
        ref="form"
        :submit-callback="submit">

        <div class="modal__header">
          <h5 class="heading-fifth">Leave your review</h5>
          <button 
            class="modal__close-button"
            type="button"
            @click="hide">
          </button>
        </div>

        <div class="modal__body leave-review__body">

          <div class="input-group-secondary">  
            <div class="input-group__inner">
              <span class="input-group__title">Title of review<small class="input-group__counter">0/64</small></span>
              <input class="input-group__input" type="text">
            </div>
          </div>

          <div class="textarea-group-secondary">  
            <span class="textarea-group__title">Text of review<small class="textarea-group__counter">0/180</small></span>
            <textarea class="textarea-group__textarea"></textarea>
          </div>
        
          <h6 class="heading-sixth">Grade of review</h6>
          <!-- 
          <div class="review__grade">
            <div class="review__stars">
              <button class="review__star review__star--selected"></button>
              <button class="review__star review__star--selected"></button>
              <button class="review__star review__star--selected"></button>
              <button class="review__star review__star--selected"></button>
              <button class="review__star review__star--selected"></button>
            </div>
            <span class="review__rating">5</span>
          </div>
 -->
        <review-grade/>
          
        </div>
        <div class="modal__footer">
          <submit-button 
            class="leave-review__button button-secondary"
            :loading="isLoading()">
            Confirm
          </submit-button> 
        </div>
      </request-form>
    </section>
  </transition>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import SubmitButton from '@components/SubmitButton'
import ReviewGrade from '@components/reviews/ReviewGrade'
import RequestForm from '@components/RequestForm'
import Reviews from '@models/Reviews'

export default {
  components: {
    SubmitButton,
    RequestForm,
    ReviewGrade,
  },

  mixins: [ HandleEvents ],
  
  data() {
    return {
      grade: 0,

      shown: false
    }
  },

  mounted() {
    this.listen({
      'reviews-editor-showing': () => {
        this.shown = true
      }
    });
  },

  methods: {
    hide() {
      this.shown = false;
    },

    isLoading() {
			if (this.$refs.form)
				return this.$refs.form.loading;
    },
    
    async submit(data) {
      await Reviews.create(data)
    }
  }
}
</script>

<style scoped>

fade-leave {
  opacity: 1;
  transition: opacity .5s;
}

fade-enter {
  opacity: 0;  
  transition: opacity .5s;
}

fade-leave-active {
  opacity: 0;
}

fade-enter-active {
  opacity: 1;
}
</style>