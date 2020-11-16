<template>
  <main>
    <section class="profile container">

      <profile-editor/>
      <profile-comments/>
     
    </section>

    <banned-users/>
    <reviews-editor/>
    <favorites-list/>


    <!-- 
      <div class="profile-popup">
        <div class="profile-popup__image"></div>
        <h4 class="profile-popup__name heading-fourth">Jayde Sanchez</h4>
        <time class="profile-popup__date text-fourth">Сreated at 03.10.2020</time>
      </div> -->

  </main>
</template>

<script>

// import RequireEmailOverlay from '@pages/profile/RequireEmailOverlay';
import ProfileComments from '@pages/profile/ProfileComments'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ReviewsEditor from '@pages/profile/ReviewsEditor'
import FavoritesList from '@pages/profile/FavoritesList'
import BannedUsers from '@pages/profile/BannedUsers'
import 'swiper/swiper-bundle.css'

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