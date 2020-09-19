<template>
    <transition name="fade">
        <div v-if="shown"
            class="context"
            :style="{'top': marginTop + 'px', 'left': marginLeft + 'px'}">

            <button 
                class="context__item"
                v-for="({label, action}, index) of items"
                v-click-outside="hide"
                :key="index"
                @click="callAction(action)">

                {{ label }}
            </button>
        </div>
    </transition>
</template>

<script>

import { throttle } from 'throttle-debounce';

export default {
    name: 'context-menu', 
    
    data: function() 
    {
        return {
            items: [],
            shown: false,
            marginTop: 0,
            marginLeft: 0
        }
    },

    mounted() {
        window.addEventListener('scroll', throttle(100, this.hide), true);
        
        this.$el.dispatchEvent(new CustomEvent('context:mouted', { detail: this }));
    },

    methods: {

        hide() {
            if (this.shown)
                this.shown = false;
        },

        show() {
            this.shown = true;
        },

        callAction(method) {

            method(this.target);
            this.shown = false;
        }
    }
};


</script>

<style>
    .context 
    {
        position: absolute;
        z-index: 122;
    }

    .fade-leave-active, .fade-enter-active
    {
        transition: opacity .3s;    
    }

    .fade-enter, .fade-leave-to  
    {
        opacity: 0;
    }

</style>