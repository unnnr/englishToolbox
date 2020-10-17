<template>
  <transition name="fade">
    <section
      v-if="shown" 
      class="modal container">

      <request-form 
        class="leave-review"
        ref="form"
        :submit-callback="submit">

        <div class="leave-review__header">
          <h5 class="heading-fifth">Leave your review</h5>
          <button 
            class="leave-review__close-button"
            type="button"
            @click="hide">
          </button>
        </div>

        <div class="leave-review__body">
          <label class="leave-review__label text-fourth" for="">Title of review</label>
          <input 
            class="leave-review__input input-second"
            placeholder="your title"
            name="title"
            type="text"/>

          <label class="leave-review__label text-fourth" for="">Text of your review</label>
          <textarea 
            class="leave-review__textarea textarea-second" 
            placeholder="your review"
            name="text"/>
        
          <label class="leave-review__label text-fourth" for="">Grade</label>
          
          <!-- <rate-stars name="grade"/> -->
          
        </div>
        <div class="leave-review__footer">
          <submit-button 
            class="leave-review__button button-second"
            :loading="isLoading()">
            Confirm
          </submit-button> 
        </div>
      </request-form>
    </section>
  </transition>
</template>

<script>
// import Reviews from '@models/Reviews'
// import RateStars from '@components/RateStars'
import RequestForm from '@components/RequestForm'
import SubmitButton from '@components/SubmitButton'
import HandleEvents from '@mixins/HandleEvents'
export default {
  components: {
    SubmitButton,
    RequestForm,
    // RateStars
  },
  mixins: [ HandleEvents ],
  
  data: function () {
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