<template>
    <div class="card card--rectangle card--margined"
        :class="{'card--selected': selected}">

        <div class="card__image" 
            v-context:items="contextItems"
            :style="{ backgroundImage: 'url(\'' + imageUrl + '\')' }"
            @click="select">
            
            <div class="card__header">
                <button 
                    class="card__favorite-button"
                    @click.stop="">

                    <span class="card__favorite-icon material-icons-round">favorite</span>
                </button>
                <div class="card__views">
                    <span class="card__views-icon material-icons-round">visibility</span>
                    <span class="card__views-count">1337</span>
                </div>
            </div>
            <h5 class="card__title heading-fifth">{{ title }}</h5>
        </div>
        <p class="card__text text-third">{{ description }}</p>
        <div class="card__footer">
            <div class="card__tags">
                <div 
                    class="card__tag-secondary card__tag tag tag--circle"
                    v-for="({label, color}, index) in tags"
                    :key="index"
                    :style="{'background-color': color}">
                    
                    <div class="card__tag-tooltip tooltip">
                        <div class="tooltip__arrow"></div>
                        <span class="tag__name" for="cb2">{{ label }}</span>
                    </div>
                </div>
                <button 
                    class="card__tag-main tag tag--main"
                    type="button"
                    v-if="mainTag"
                    :style="{'background-color': mainTag.color}">

                    <span class="tag__name" for="cb2">{{ mainTag.label }}</span>
                </button>
            </div>
            <time class="card__date">July 19 2020</time>
        </div>
    </div>
</template>

<script>

import bus from '@services/eventbus';
import ContextMenu from '@components/ContextMenu';

export default {
    name: 'card',

    components: {
        ContextMenu
    },
    
    props: {
        title: String,
        description: String,
        imageUrl: String,

        tags: Array,

        mainTag: Object,
        
        selected: Boolean
    },

    data: function() {
        return {
            contextItems: [
                {   
                    label: 'Open',
                    action: () => {
                        bus.dispatch('card-selecting', { card: this });
                    }
                },
                {   
                    label: 'Edit',
                    action: () => {
                        bus.dispatch('card-editing', { card: this });
                    } 
                },
                { 
                    label: 'Delete',
                    action: () => {
                        alert('Not implemented');
                    } 
                },
                

            ]
        }   
    },

    methods: {

        select() {

            bus.dispatch('card-selecting', { card: this });
        }
    },


    mounted() {

    }
}
</script>