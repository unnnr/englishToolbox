<template>
  <div class="addition__tab description">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">Description title</h6>
      <button class="addition__tab-shrink-button"></button>
    </div>
    <div class="addition__tab-body description__body">
      <p class="description__text text-fourth">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Vel turpis nunc eget lorem dolor sed viverra ipsum
      </p>
      <h6 class="heading-sixth">Tag list</h6>
      <div class="description__tags">
        <button type="button" class="tag">consectetur</button>
        <button type="button" class="tag">adipiscing</button>
        <button type="button" class="tag">petronat</button>
        <button type="button" class="tag">derber</button>
        <button type="button" class="tag">doits</button>
        <button type="button" class="tag">tetrat</button>
        <button type="button" class="tag">fonter</button>
        <button type="button" class="tag">petrelet</button>
        <button type="button" class="tag">huynia</button>
      </div>
    </div>
    <div class="addition__tab-footer">
      <time class="description__date text-fifth">Oct 7 2020</time>
      <span class="description__views text-fifth">123</span>
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