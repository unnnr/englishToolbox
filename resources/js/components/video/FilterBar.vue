<template>
    <section class="filter container">
        <div class="filter__body">

            <div class="filter__panel">
                <div class="filter__search">
                    <button class="filter__search-button">
                        <span class="material-icons-round">search</span>
                    </button>
                    <input class="filter__search-input" type="text" placeholder="search">
                </div>
                <button 
                    class="filter__button"
                    @click="toggleFilters">

                    tags
                    <span class="material-icons-round">filter_list</span>
                </button>
            </div>

            <div 
                class="filter__tags-wrapper"
                ref="tagsWrapper"
                :style="{'height': wrapperHeight}"
                :class="{'filter__tags-wrapper--active': tagsShown}">

                <div 
                    class="filter__tags"
                    ref="tagsBody">
                    <!-- :class="{'filter__tags--active': true}" -->

                    <button 
                        class="tag"
                        type="button"
                        v-for="({label}, index) of tags"
                        :key="index">

                        <span class="tag__name" for="cb2">{{ label }}</span>
                    </button>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Tags from '@services/Tags';

const SHOWING_TIME = 500;

export default {

    name: 'filter-bar', 

    data: function() {
        return {
            tags: [],
            tagsShown: false,
            wrapperHeight: 0
        }
    },

    mounted() {
        this.load();
    },

    methods: {

        async load() {
            this.tags = await Tags.all();
        },

        toggleFilters() {
            
            let tagsBody = this.$refs.tagsBody;
            
            this.tagsShown =  !!!this.tagsShown;
            this.wrapperHeight = tagsBody.offsetHeight + 'px';
            
            if (this.tagsShown)
            {
                clearTimeout( this.$options.hideTimer );

                this.$options.showTimer = setTimeout(() => {
                    this.wrapperHeight = 'auto';
                }, SHOWING_TIME)
            }
            else    
            {
                clearTimeout( this.$options.showTimer );
                
                this.$options.hideTimer = setTimeout(() => {
                    this.wrapperHeight = 0;
                }, 50)
            }
        }
    }
}
</script>

<style scoped>
    .filter__tags-wrapper {
        transition: height .5s, margin-top .5s;
        overflow: hidden;
    }

    .filter__tags-wrapper--active {
        margin-top: 12.5px;
    }

    .filter__tags {
        margin-top: 0;
    }
</style>