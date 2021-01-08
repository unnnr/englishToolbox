<template>
  <div class="builder__areas">
    <button class="builder__group-button builder__group-button--listen"></button>
    
    <div class="builder__group-placeholder">
      <div class="builder__brick">asdasd</div>
    </div>

    <div class="builder__group-placeholder"></div>
    <div class="builder__group-placeholder"></div>
    <div class="builder__group-placeholder"></div>
    <div class="builder__group-placeholder"></div>
    <div ref="placeholder" class="builder__group-placeholder"></div>
    
    <button class="builder__group-button builder__group-button--done" disabled></button>
    
  </div>
</template>

<script>
export default {
  inject: [ '$dragger' ]
}
</script>