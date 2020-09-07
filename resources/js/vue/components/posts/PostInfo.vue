<template>
    <div class="description">
        <div class="description__header">
            <h5 class="description__title heading-fifth">{{ data.title }}</h5>
            <button
                class="description__mobile-button"
                :class="{'description__mobile-button--upturned': shrinked}"
                :style="{'transition': buttonTransition}"
                @click="toggle">

                <span class="material-icons-round">
                    
                    arrow_drop_down
                </span>
            </button>
        </div>

        <div
            class="description__body"
            ref="wrapper"
            :style="{
                'max-height': bodyHeight,
                'transition': bodyTransition}">
    
            <div 
                class="description__body-content"
                ref='content'>
                
                <p class="description__text text-fourth">{{ data.description }}</p>

                <tag-list 
                    :tags="data.tags"
                    :main-tag="data.mainTag"/>
            </div>
                
        </div>
       

        <div class="description__footer">
            
            <time class="description__date">{{ data.createdAt }}</time>
            <div class="description__views">
                <span class="description__views-icon material-icons-round">visibility</span>
                <span class="description__views-count">{{ data.views }}</span>
            </div>
        </div>
    </div>

    
</template>

<script>

import Shrinkable from '@mixins/ShrinkableDetailsTag';
import TagList from '@components/tags/TagList';
import bus from '@services/eventbus';

export default {
    name: 'post-info',

    components: {
        TagList
    },

    mixins: [Shrinkable],

    data: function () {
        return {

            data: {
                title: 'Lorem ipsum dolor',
                views: 1289,
                createdAt: 'April 17 2020',
                description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                           dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas
                           congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.`,

                tags: [],
                mainTag: null
            },
        }
    },

    mounted() {

        bus.listen('post-selecting', event => {

            let post = event.post;
            
            Object.assign(this.data, {
                ...post
            });

			bus.dispatch('post-selected', event);
		});	
    }
}
</script>


<style scoped>

.description__body {
    overflow: hidden;
}

.description__text {
    word-break: break-all;
}

.description__mobile-button {
   transform-origin: 15px 15px;
}

.description__mobile-button--upturned {
    transform: rotate(180deg);
}

</style>