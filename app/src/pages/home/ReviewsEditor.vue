<template>
  <section class="modal container">
  <form class="leave-review">
    <div class="leave-review__header">
      <h5 class="heading-fifth">Leave your review</h5>
      <button class="leave-review__close-button" type="button"></button>
    </div>
    <div class="leave-review__body">
      <label class="leave-review__label text-fourth" for="">Title of review</label>
      <input class="leave-review__input input-second" type="text" placeholder="your title">
      <label class="leave-review__label text-fourth" for="">Text of your review</label>
      <textarea class="leave-review__textarea textarea-second" placeholder="your review"></textarea>
      <label class="leave-review__label text-fourth" for="">Grade</label>
      <div class="leave-review__grade">
        <div class="leave-review__stars">
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--full">
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star--half">
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
          </button>
          <button class="leave-review__star leave-review__star">
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
            <object class="leave-review__half-star" data="img/svg/halfstar.svg" type=""></object>
          </button>
        </div>
        <span class="leave-review__rating">4.5</span>
      </div>
    </div>
    <div class="leave-review__footer">
      <button class="leave-review__button button-second">Confirm</button>
    </div>
  </form>
</section>
</template>

<script>
export default {
    
}
</script>