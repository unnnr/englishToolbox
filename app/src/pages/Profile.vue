<template>
  <main>
    <email-overlay/>
    
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
import ProfileComments from '@pages/profile/ProfileComments'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ReviewsEditor from '@pages/profile/ReviewsEditor'
import FavoritesList from '@pages/profile/FavoritesList'
import EmailOverlay from '@pages/profile/EmailOverlay';
import BannedUsers from '@pages/profile/BannedUsers'

export default {
  components: {
    ProfileComments, 
    ProfileEditor,
    FavoritesList,
    ReviewsEditor, 
    EmailOverlay,
    BannedUsers,
  }
}
</script>