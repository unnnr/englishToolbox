<template>
  <main class="home">

    <banner-container/>

    <update-container/>

    <about-me/>

    <reviews/>

  </main>
</template>

<script>
import BannerContainer from '@pages/home/BannerContainer'
import UpdateContainer from '@pages/home/UpdateContainer'
import AboutMe from '@pages/home/AboutMe'
import Reviews from '@pages/home/Reviews'


export default {
  components: {
    BannerContainer,
    UpdateContainer,
    AboutMe,
    Reviews
  }
}
</script>
