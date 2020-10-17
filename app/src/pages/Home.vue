<template>
  <main class="home">

    <banner-container/>

    <!-- <update-container/> -->

    <about-me/>

    <reviews/>

    <reviews-editor/>

  </main>
</template>

<script>
import BannerContainer from '@pages/home/BannerContainer'
// import UpdateContainer from '@pages/home/UpdateContainer'
import ReviewsEditor from '@pages/home/ReviewsEditor'
import AboutMe from '@pages/home/AboutMe'
import Reviews from '@pages/home/Reviews'


export default {
  components: {
    BannerContainer,
    // UpdateContainer,
    ReviewsEditor,
    AboutMe,
    Reviews
  }
}
</script>

<style lang="sass">
  .footer
    background: darken($color-almost-white, 4)

  .copyright
    background: darken($color-almost-white, 6)
</style>