<template>
  <main>
    <email-overlay/>
    
    <section class="profile container">

      <profile-editor/>
      <profile-comments/>
     
    </section>

    <banned-users 
      v-if="admin"/>

    <reviews-editor 
      v-if="admin"/>

    <favorites-list/>
  </main>
</template>

<script>
import ProfileComments from '@pages/profile/ProfileComments'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ReviewsEditor from '@pages/profile/ReviewsEditor'
import FavoritesList from '@pages/profile/FavoritesList'
import EmailOverlay from '@pages/profile/EmailOverlay'
import BannedUsers from '@pages/profile/BannedUsers'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

export default {
  components: {
    ProfileComments, 
    ProfileEditor,
    FavoritesList,
    ReviewsEditor, 
    EmailOverlay,
    BannedUsers,
  },

  data() {
    return {
      admin: false
    }
  },

  mounted() {
    this.redirectGuest()
  },

  methods: {
    async redirectGuest() {
      if (await Auth.check())
        return;

      bus.dispatch('alert-guest', {
        cancel: () => this.$router.push({
          path: '/home'
        })
      });
    }
  }
}
</script>