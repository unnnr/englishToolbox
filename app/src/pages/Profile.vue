<template>
  <main>
    <section class="profile container">

      <profile-editor/>
      <profile-comments/>
     
    </section>

    <banned-users/>
    <reviews-editor/>
    <favorites-list/>

  </main>
</template>

<script>

// import RequireEmailOverlay from '@pages/profile/RequireEmailOverlay';
import ProfileComments from '@pages/profile/ProfileComments'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ReviewsEditor from '@pages/profile/ReviewsEditor'
import FavoritesList from '@pages/profile/FavoritesList'
import BannedUsers from '@pages/profile/BannedUsers'

export default {
  components: {
    // RequireEmailOverlay,
    ProfileComments, 
    ProfileEditor,
    ReviewsEditor, 
    BannedUsers,
    FavoritesList,
  }
}
</script>