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
            label="Text of review"/>
        
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
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import HandleEvents from '@mixins/HandleEvents'
import RequestForm from '@components/RequestForm'
import TitleInput from '@components/inputs/TitleInput'
import Reviews from '@models/Reviews'
import VForm from '@components/validation/VForm'

import GradeInput from '@components/inputs/GradeInput'

export default {
  components: {
    DescriptionInput,
    ConfirmButton,
    TitleInput,
    GradeInput,
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
      return;
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