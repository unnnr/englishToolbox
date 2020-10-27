<template>
  <div class="addition__tab comments">
    <div class="addition__tab-header">
      <h5>Comments</h5>
    </div>
    <div class="addition__tab-body">
      <small class="comments__count">{{ counter }}</small>

      <div 
        class="comment"
        v-for="{id, message, createdAt, user} in comments"
        :key="id">

        {{ user }} {{createdAt}} {{ message }}
      
      </div>
    </div>
    <div class="addition__tab-footer">
      <div class="area"></div>
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

    comments() {
      return this.target ? this.target.comments : [
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
      ];
    },

    counter() {
      return this.comments.length + ' comments';
    }
  }
}
</script>