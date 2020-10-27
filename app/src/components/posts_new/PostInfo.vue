<template>
  <div class="addition__tab description">
    <div class="addition__tab-header">
      <h5>{{ title }}</h5>
    </div>
    <div class="addition__tab-body">
      <p class="description__text">{{ description }}</p>
    </div>
    <div class="addition__tab-footer">
      <time class="description__date"> {{ createdAt }}</time>
      <span class="description__views">{{ views }}</span>
    </div>
  </div>
</template>

<script>
export default {
  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    title() {
      return this.target ? this.target.title : 'Something went wrong';
    },

    description() {
      return this.target ? this.target.description : `Obviously, you're not allowed to see it, but... `;
    },

    tags() {
      return this.target ? this.target.tags : [];
    },

    createdAt() {
      return this.target ? this.target.createdAt : '';
    },

    views() {
      return this.target ? this.target.views : '';
    },
  }
}
</script>