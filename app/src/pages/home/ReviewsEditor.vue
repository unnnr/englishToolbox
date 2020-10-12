<template>
  <section class="modal container">
  <request-form 
    class="leave-review"
    ref="form"
    :submit-callback="submit">

    <div class="leave-review__header">
      <h5 class="heading-fifth">Leave your review</h5>
      <button class="leave-review__close-button" type="button"></button>
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
      <rate-stars name="grade"/>
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
</template>

<script>

import Reviews from '@models/Reviews'
import RateStars from '@components/RateStars'
import RequestForm from '@components/RequestForm'
import SubmitButton from '@components/SubmitButton'

export default {
  components: {
    SubmitButton,
    RequestForm,
    RateStars
  },
  
  data: function ()
  {
    return {
      grade: 0
    }
  },

  methods: {
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