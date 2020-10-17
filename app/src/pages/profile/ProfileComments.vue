<template>
    <div class="management__tab-body">
  <!-- <div class="management__account-overlay">
    <object class="management__account-overlay-image" data="/img/svg/comments-overlay.svg" type="image/svg+xml"></object>
  </div> -->
  <button class="management__comments-delete-button text-fourth"><span class="material-icons-round">delete_forever</span>delete all</button>
  <div class="management__tab-content">
    <div class="management__tab-scrollable">
      <div class="management__comment">
        <div class="management__comment-image"></div>
        <div class="managment__comment-wrapper">
          <div class="managment__comment-header">
            <h6 class="heading-sixth">Lorem ipsum dolor sit amet</h6>
            <button class="management__comment-delete-button"><span class="material-icons-round">delete_forever</span></button>
          </div>
          <div class="comment">
            <div class="comment__body">
              <p class="comment__text text-sixth">
                <span class="comment__name">saraoconor</span>
                <span class="comment__mention">@davi2020gj</span>
                Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc
                mi ipsum faucibus vitae.
              </p>
              <time class="comment__date text-sixth">19 may 2020</time>
            </div>
          </div>
        </div>
      </div>
      <div class="management__comment">
        <div class="management__comment-image"></div>
        <div class="managment__comment-wrapper">
          <div class="managment__comment-header">
            <h6 class="heading-sixth">Lorem ipsum dolor sit amet</h6>
            <button class="management__comment-delete-button"><span class="material-icons-round">delete_forever</span></button>
          </div>
          <div class="comment">
            <div class="comment__body">
              <p class="comment__text text-sixth">
                <span class="comment__name">saraoconor</span>
                <span class="comment__mention">@davi2020gj</span>
                Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc
                mi ipsum faucibus vitae.
              </p>
              <time class="comment__date text-sixth">19 may 2020</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'profile-comments'
}
</script>