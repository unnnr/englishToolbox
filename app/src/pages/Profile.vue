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

    <section class="banned container">
      <h3 class="heading-third">Banned users</h3>
      <div class="banned__body">

        <div class="banned__comment">
          <div class="comment">
            <div class="comment__image"></div>
            <div class="comment__body">
                <p class="comment__text text-sixth">
                  <span class="comment__name">Eden Pepe</span>
                  <span class="comment__mention">Za lupa</span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                </p>
                <time class="comment__date text-sixth">13.09.2020</time>
            </div>
          </div>
          <button class="banned__button button-second">Unban</button>
        </div>

        <div class="banned__comment">
          <div class="comment">
            <div class="comment__image"></div>
            <div class="comment__body">
                <p class="comment__text text-sixth">
                  <span class="comment__name">Eden Pepe</span>
                  <span class="comment__mention">Za lupa</span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                </p>
                <time class="comment__date text-sixth">13.09.2020</time>
            </div>
          </div>
          <button class="banned__button button-second">Unban</button>
        </div>

        <div class="banned__comment">
          <div class="comment">
            <div class="comment__image"></div>
            <div class="comment__body">
                <p class="comment__text text-sixth">
                  <span class="comment__name">Eden Pepe</span>
                  <span class="comment__mention">Za lupa</span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                </p>
                <time class="comment__date text-sixth">13.09.2020</time>
            </div>
          </div>
          <button class="banned__button button-second">Unban</button>
        </div>

        <div class="banned__comment">
          <div class="comment">
            <div class="comment__image"></div>
            <div class="comment__body">
                <p class="comment__text text-sixth">
                  <span class="comment__name">Eden Pepe</span>
                  <span class="comment__mention">Za lupa</span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                </p>
                <time class="comment__date text-sixth">13.09.2020</time>
            </div>
          </div>
          <button class="banned__button button-second">Unban</button>
        </div>


      </div>
    </section>

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