<template>
    <div class="selected__overlay container">
        <transition name="fade">
            <object 
                class="selected__overlay-image" 
                type="image/svg+xml"
                v-if="shown"
                :data="src">
            </object>
        </transition>
    </div>
</template>

<script>

import bus from '@services/eventbus'

export default {
    name: 'overlay',

    props: {
        src: {
            type: String,
            default: ''
        }
    },

    data: function() {
        return {
            shown: true
        }
    },

    mounted() {
        bus.listen('overlay-showing', () => {
            this.shown = true;
        })

        bus.listen('overlay-hidding', () => {
            this.shown = false;
        })

        bus.listen('posts-loaded', () => {
            this.shown = false;
        })

    }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>