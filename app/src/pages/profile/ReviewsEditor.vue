<template>
  <section class="reviews-management container">
    <h3 class="heading-third">Reviews manage</h3>
    <div class="reviews-management__body">
      
      <div
        v-for="(review, key) in reviews"
        class="reviews__card"
        :key="key">
        <div class="reviews__card-person">
          <div class="reviews__card-photo"></div>
          <h5 class="reviews__card-name heading-fifth">Person Name</h5>
        </div>
        <div class="reviews__card-content">
          <h5 class="reviews__card-title heading-fifth">{{ review.title }}</h5>
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
          <button class="reviews__card-button reviews__card-button--delete button-second">delete</button>
          <button class="reviews__card-button reviews__card-button--apply button-second">apply</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import Reviews from '@models/Reviews'

export default {
  data: function () {
    return {
      reviews: []
    }
  },
  
  beforeMount() {
    this.load();
  },

  methods: {
    async load() {
      this.reviews = await Reviews.pending();

      console.log(await Reviews.pending());
    }
  }
};
</script>