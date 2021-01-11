<template>
  <span class="bubbles__bubble">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: { 
    text: { type: String, default: '' }
  }
}
</script>