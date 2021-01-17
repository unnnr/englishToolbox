<template>
  <transition name="fade">
    <section
      v-if="shown" 
      class="modal container">

      <v-form 
        class="modal__content leave-review"
        :request="submit"
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
            label="Text of review"
            name="text"
            required/>
        
          <h6 class="heading-sixth">Grade of review</h6>
          <grade-input/>
          
        </div>

        <div class="modal__footer">
          <confirm-button class="leave-review__button"/>
        </div>

      </v-form>
    </section>
  </transition>
</template>

<script>
// services
import Reviews from '@models/Reviews'

// mixins
import HandleScrollLock from '@mixins/HandleScrollLock'
import HandleEvents from '@mixins/HandleEvents'

// components
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import TitleInput from '@components/inputs/TitleInput'
import GradeInput from '@components/inputs/GradeInput'
import VForm from '@components/validation/VForm'
import bus from '@services/eventbus'


export default {
  components: {
    DescriptionInput,
    ConfirmButton,
    TitleInput,
    GradeInput,
    VForm,
  },

  mixins: [ 
    HandleScrollLock,
    HandleEvents
  ],
  
  data() {
    return {
      shown: false
    }
  },

  watch: {
    shown(value) {
      if (value)
        this.lockScroll();
      else
        this.unlockScroll();
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

    async submit(data) {
      await Reviews.create(data)
     
      this.shown = false;
      bus.dispatch('review-uploaded');
    }
  }
}
</script>