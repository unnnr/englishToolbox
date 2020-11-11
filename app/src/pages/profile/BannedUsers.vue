<template>
  <section class="banned container">
    <h3 class="banned__title heading-third">Banned users</h3>
    <div class="banned__body">

     <banned-comment/>

    </div>
  </section>
</template>

<script>
import BannedComment from '@components/comments/BannedComment'

export default {
  components: {
    BannedComment
  }
}
</script>