<template>
  <main class="home">

    <banner-container/>

    <update-container/>

    <about-me/>

    <reviews/>

    <reviews-editor/>

  </main>
</template>

<script>

import BannerContainer from '@pages/home/BannerContainer'
import UpdateContainer from '@pages/home/UpdateContainer'
import ReviewsEditor from '@pages/home/ReviewsEditor'
import Reviews from '@pages/home/Reviews'
import AboutMe from '@pages/home/AboutMe'

export default {
  components: {
    BannerContainer,
    UpdateContainer,
    ReviewsEditor,
    Reviews,
    AboutMe
  }
}
</script>

<style lang="sass">
  .footer
    background: darken($color-almost-white, 4)

  .copyright
    background: darken($color-almost-white, 6)
</style>