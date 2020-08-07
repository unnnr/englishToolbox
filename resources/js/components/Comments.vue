<template>
    <div class="comments">
        <div class="comments__header">
          <h5 class="comments__title heading-fifth">Comments</h5>
          <button class="comments__mobile-button"><span class="material-icons-round">arrow_drop_down</span></button>
        </div>
        <div class="comments__body">
          <small class="comments__count text-sixth">2 comments</small>
          <div class="comment">
            <div class="comment__image"></div>
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
          <div class="space"></div>
        </div>
        <form class="comments__footer">
          <a class="comments__account-link" href="#"><span class="material-icons-round">account_circle</span></a>
          <textarea class="comments__textarea" placeholder="your comment"></textarea>
          <button class="comments__send-button"><span class="material-icons-round">send</span></button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'comments'
    }
</script>