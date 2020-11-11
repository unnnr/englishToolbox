<template>
  <div class="comment">

    <div 
      class="comment__image"
      :style="{'background-image': src}">
    </div>

      <p class="comment__text text-sixth">
        <span class="comment__name">
          {{ author }}
        </span>

        {{ message }}

        <time class="comment__date">
          {{ createdAt}}
        </time>
      </p>

	</div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: '#' },

    author: { type: String, default: '陽菜' },

    message: { type: String, default: '恨み はなじ ぶき じぞう 封筒 推奨 あう 部首 やさい けいじばん' },
    
    createdAt: { type: String, default: 'Feb 24 2020'}
  },

  computed: {
    src() {
      return this.image && 'url(' + this.image + ')';
    }
  }
}
</script>