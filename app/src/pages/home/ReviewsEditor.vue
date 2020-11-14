<template>
  <transition name="fade">
    <section
      v-if="shown" 
      class="modal container">

      <v-form 
        class="modal__content leave-review"
        ref="form"
        :submit-callback="submit"
        secondary>

        <div class="modal__header">
          <h5 class="heading-fifth">Leave your review</h5>
          <button 
            class="modal__close-button"
            type="button"
            @click="hide">
          </button>
        </div>

        <div class="modal__body leave-review__body">
          <title-input
            label="Title of review"/>

          <description-input
            label="Text of review"/>
        
          <h6 class="heading-sixth">Grade of review</h6>
          <review-grade/>
          
        </div>
        <div class="modal__footer">
          <submit-button 
            class="leave-review__button button-secondary"
            :loading="isLoading()">
            Confirm
          </submit-button> 
        </div>
      </v-form>
    </section>
  </transition>
</template>

<script>
import DescriptionInput from '@components/inputs/DescriptionInput'
import HandleEvents from '@mixins/HandleEvents'
import SubmitButton from '@components/SubmitButton'
import ReviewGrade from '@components/reviews/ReviewGrade'
import RequestForm from '@components/RequestForm'
import TitleInput from '@components/inputs/TitleInput'
import Reviews from '@models/Reviews'
import VForm from '@components/validation/VForm'

export default {
  components: {
    DescriptionInput,
    SubmitButton,
    ReviewGrade,
    TitleInput,
    VForm,
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