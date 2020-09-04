<template>
    <div class="description">
        <div class="description__header">
            <h5 class="description__title heading-fifth">{{ title }}</h5>
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
                
                <p class="description__text text-fourth">{{ description }}</p>

                <tag-list 
                    :tags="tags"
                    :main-tag="mainTag"/>
            </div>
                
        </div>
       

        <div class="description__footer">
            <time class="description__date">{{ date }}</time>
            
            <div class="description__views">
                <span class="description__views-icon material-icons-round">visibility</span>
                <span class="description__views-count">{{ views }}</span>
            </div>
        </div>
    </div>

    
</template>

<script>

import TagList from '@components/tags/TagList';
import bus from '@services/eventbus';

const SHRINK_DURATION = 700;
const RENDER_DURATION = 100;

export default {
    name: 'post-info',

    components: {
        TagList
    },

    props: {
        shrinkable: {
            type: Boolean
        }
    },

    data: function () {
        return {
            title: 'Lorem ipsum dolor',
            date: 'April 17 2020',
            views: 1289,
            description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                           dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas
                           congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.`,
           
            tags: [],
            mainTag: null,

            shrinked: false,
            
            bodyHeight: 'fit-content'
        }
    },

    computed: {
        buttonTransition() {
            return `transform ${SHRINK_DURATION}ms`;
        },

        bodyTransition() {
            return `max-height ${SHRINK_DURATION}ms`;
        }
    },

    watch: {
        shrinkable(value) {
            console.log(!!!value)
            if (!!!value)
                this.open();
        }
    },

    mounted() {

        bus.listen('post-selecting', event => {

			let post = event.post;

			this.tags =  post.tags;
			this.title =  post.title;
			this.mainTag =  post.mainTag;
			this.description =  post.description;

			bus.dispatch('post-selected', event);
		});	
    },


    methods: {
        transitionEnded() {
            if (!!!this.shrinked)
                this.bodyHeight = 'fit-content';

            this.animationTimer = null;
        },

        shrink() {
            let content = this.$refs.content;

            this.bodyHeight = content.offsetHeight + 'px';
            
            // Gives time for rendering
            setTimeout(() => { this.bodyHeight = 0 ;}, RENDER_DURATION)
        },

		open() {
            let content = this.$refs.content;

            this.bodyHeight = content.offsetHeight + 'px';
        },
        
        toggle() {
            if (!!!this.shrinkable)
                return;

            if (this.animationTimer) 
                clearTimeout(this.animationTimer)

            this.shrinked = !!!this.shrinked;

            if (this.shrinked)
                this.shrink();
            else 
                this.open();

            this.animationTimer = setTimeout(this.transitionEnded,  SHRINK_DURATION); 
        }
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