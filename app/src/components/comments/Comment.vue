<template>
  <div class="comment">

    <div 
      class="comment__image"
      :style="{'background': src}">
    </div>

      <p class="comment__text text-sixth">
        <span class="comment__name">
          {{ author }}
        </span>

        {{ message }}
      </p>
		  
      <time class="comment__date text-sixth">
        {{ createdAt}}
      </time>
	</div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: '#' },

    author: { type: String, default: '' },

    message: { type: String, default: '' },
    
    createdAt: { type: String, default: ''}
  },

  computed: {
    src() {
      return this.image && 'url(' + this.image + ')';
    }
  }
}
</script>