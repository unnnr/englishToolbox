<template>
  <div class="card">
    <div class="card__image">
      <div class="card__header">
        <button class="card__favorite-button card__favorite-button--active"></button>
        <span class="card__views">{{ views }}</span>
      </div>
      <div class="card__title">
        <h6 class="heading-sixth">{{ title }}</h6>
      </div>
    </div>
    <div class="card__text">
      <p class="text-third">{{ description }}</p>
    </div>
    <div class="card__footer">
        <div class="card__tags">
          <div class="card__tag tag tag--circle"></div>
          <div class="card__tag tag tag--circle"></div>
          <div class="card__tag tag tag--circle"></div>
          <div class="card__tag tag tag--circle"></div>
          <button class="card__tag-main tag tag--main">mainTag</button>
        </div>
        <time class="card__date">{{ createdAt }}</time>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },

    createdAt: { type: String, default: '' },

    description: { type: String, default: '' },

    views: { type: Number, default: 0 },

    tags: { type: Array, default: () => [] }
  }
}
</script>
