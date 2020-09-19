<template>
    <transition name="fade">
        <div 
            class="selected__overlay container"
            v-if="shown">

            <object 
                v-if="empty"
                class="selected__overlay-image" 
                type="image/svg+xml"
                :data="src">
            </object>
        </div>
    </transition>

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
            shown: true,
            empty: false
        }
    },

    mounted() {
        bus.listen('overlay-showing', () => {
            this.shown = true;
        })

        bus.listen('overlay-showing--empty', () => {
            this.shown = true;
            this.empty = true;
        })

        bus.listen('overlay-hidding', () => {
            this.shown = false;
        })

        bus.listen('post-selected', () => {
            this.shown = false;
        })

        bus.listen('post-creating', () => {
            this.shown = false;
        });
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

.selected__overlay {
    background-color: white;
}

</style>