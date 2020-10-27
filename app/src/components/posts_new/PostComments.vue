<template>
  <div class="addition__tab comments">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">6 comments</h6>
      <button class="addition__tab-shrink-button"></button>
    </div>
    <div class="addition__tab-body comments__body">

      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>
      <div class="comment">
        <div class="comment__image"></div>
        <p class="comment__text text-sixth">
          <span class="comment__name">davi2020gj</span>
          <span class="comment__mention">MorryEz874</span>
          Ultrices dui sapien eget mi. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Velit scelerisque in dictum non consectetur a erat.
        </p>
				<time class="comment__date text-sixth">0.24.2563</time>
			</div>

    </div>
    <div class="addition__tab-footer comments__footer">
      <button class="comments__profile-button"></button>
      <textarea class="comments__textarea" placeholder="Your comment" maxlength="256"></textarea>
      <button class="comments__send-button"></button>
    </div>
  </div>
</template>

<script>
export default {
  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    comments() {
      return this.target ? this.target.comments : [
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
        { message: 'some' },
      ];
    },

    counter() {
      return this.comments.length + ' comments';
    }
  }
}
</script>