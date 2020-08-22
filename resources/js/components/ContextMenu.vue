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

import Vue from 'vue';
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
        VueInstance = this;

        window.addEventListener('scroll', throttle(100, this.hide), true);
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

const Context = new function()
{
    function onRightClick(event, items, vnode, el) {

        VueInstance.marginTop = event.pageY;
        VueInstance.marginLeft = event.pageX;

        VueInstance.target = el;
        VueInstance.items = items;
        VueInstance.show();
    }

    function wrappMethod(target, items, vnode, el) {

        return function(event) {

            if (!!!VueInstance)
                throw Error('Anu context components has been created');

            event.preventDefault();
            event.stopPropagation();

            target(event, items, vnode, el);            
        };
    }   

    function init() {
        
        Vue.directive('context', {

            bind(el, binding, vnode) {

                if (binding.arg == 'items')
                {
                    let listener = {
                        target: el,
                        items: binding.value
                    };

                    el.addEventListener('contextmenu', wrappMethod(onRightClick, listener.items, vnode, el));

                    listenrs.push(listener);
                }
            }
        });

    }

    let listenrs = [];

    init();
}();

let VueInstance;

</script>

<style>
    html, main, body
    {
        min-height: 100vh;
        height: auto;
    }

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