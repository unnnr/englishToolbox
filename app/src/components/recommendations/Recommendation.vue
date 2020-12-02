<template>
  <div class="i-recommend__card">
    <div 
      class="i-recommend__card-image"
      :style="{'background-image': imageUrl}">
    </div>

    <h5 class="heading-fifth i-recommend__card-title">
      {{ title }}
    </h5>
    
    <p class="text-fourth i-recommend__card-text">
      {{ description }}
    </p>
    
    <a class="heading-sixth i-recommend__card-link" href="#">
      {{ link }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    description: { type: String, defualt: '#' }, 
    
    image: { type: String, defualt: '#' },

    title: { type: String, defualt: '#' }, 

    link: { type: String, defualt: '#' }, 
  },

  computed: {
    imageUrl() {
      return 'url(' + this.image + ')';
    }
  }
}
</script>