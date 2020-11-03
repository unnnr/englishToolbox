<template>
  <post-details-mobile 
    v-if="mobile" 
    :onlyEditor="onlyEditor"/>

  <post-details-desktop 
    :onlyEditor="onlyEditor"
    v-else/>
</template>

<script>
import PostDetailsDesktop from '@components/posts_new/PostDetailsDesktop'
import PostDetailsMobile from '@components/posts_new/PostDetailsMobile'

export default {
  components: {
    PostDetailsDesktop: () => import('@components/posts_new/PostDetailsDesktop'),
    PostDetailsMobile: () => import('@components/posts_new/PostDetailsMobile')
  },

  props: {
    onlyEditor: { type: Boolean, default: false },
  },

  data() {
    return {
      mobile: false
    }
  },

  methods: {
    select() {

    }
  }
}
</script>
