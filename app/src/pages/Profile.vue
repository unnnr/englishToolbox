<template>
  <main>
    <section class="management container">
      <div class="management__tab management__tab--account">
        <h3 class="management__tab-header heading-third">My account</h3>
        <profile-editor/>
      </div>

      <div class="management__tab management__tab--comments">
        <h3 class="management__tab-header heading-third">My comments</h3>
        <profile-comments/>
      </div>
    </section>

    <reviews/>

    <require-email-overlay/>

    <favorites/>
  </main>
</template>

<script>

import Reviews from '@pages/profile/ReviewsEditor'
import Favorites from '@pages/profile/Favorites'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ProfileComments from '@pages/profile/ProfileComments'
import RequireEmailOverlay from '@pages/profile/RequireEmailOverlay';

export default {
  components: {
    RequireEmailOverlay,
    ProfileComments, 
    ProfileEditor,
    Favorites,
    Reviews, 
  }
}
</script>