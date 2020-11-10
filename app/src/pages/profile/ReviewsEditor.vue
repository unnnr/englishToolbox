<template>
  <section class="reviews-management container">
    <h3 class="banned__title heading-third">Reviews manage</h3>
    <div class="reviews-management__body">

      <div class="reviews-management__card">
        <div class="reviews__card">
          <div class="reviews__card-person">
            <div class="reviews__card-photo"></div>
            <h5 class="reviews__card-name heading-fifth">Person Name</h5>
          </div>
          <h5 class="reviews__card-title heading-fifth">Title of review</h5>
          <p class="reviews__card-text text-third"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          <div class="review__grade">
            <div class="review__stars">
              <div class="review__star review__star--selected"></div>
              <div class="review__star review__star--selected"></div>
              <div class="review__star review__star--selected"></div>
              <div class="review__star review__star--selected"></div>
              <div class="review__star review__star--selected"></div>
            </div>
            <span class="review__rating">5</span>
          </div>
        </div>
        <button class="reviews-management__button--accept button-secondary button--greenish">accept</button>
        <button class="reviews-management__button--decline button-secondary button--reddish">decline</button>
      </div>

    </div>
  </section>
</template>