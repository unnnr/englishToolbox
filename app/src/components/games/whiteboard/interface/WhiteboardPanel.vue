<template>
  <div
    class="whiteboard__element"
    @mouseup.stop=""
    @mousedown.stop=""
    @mousemove.stop=""
    @mouseleave.stop="">

    <slot/>
  </div>
</template>