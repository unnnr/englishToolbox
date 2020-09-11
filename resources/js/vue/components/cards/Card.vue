<template>
    <div 
        class="card"
        :class="{
            'card--selected': selected,
            'card--margined': margined,
            'card--square': isSquare,
            'card--rectangle': isRecatangle}">

        <div 
            class="card__image" 
            v-context:items="contextItems"
            :style="{ 'background-image': 'url(\'' + imageUrl + '\')' }"
            @click="select">
            
            <div class="card__header">
                <button 
                    class="card__favorite-button"
                    @click.stop="">

                    <span class="card__favorite-icon material-icons-round">favorite</span>
                </button>
                <div class="card__views">
                    <span class="card__views-icon material-icons-round">visibility</span>
                    <span class="card__views-count">{{ generatedView }}</span>
                </div>
            </div>
            <!-- <h5 class="card__title heading-fifth">{{ title }}</h5> -->
            <div class="card__title">
                <h1 class="heading-sixth">{{ title }}</h1>
            </div>
        </div>
        <div class="card__text">
            <p class="text-third">{{ description }}</p>
        </div>
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
            <time class="card__date">{{ createdAt }}</time>
        </div>
    </div>
</template>

<script>

import bus from '@services/eventbus';
import ContextMenu from '@components/ContextMenu';

const SQUARE_CLASS = 'card--square';
const RECTANGLE_CLASS = 'card--rectangle';

export default {
    name: 'card',

    components: {
        ContextMenu
    },
    
    props: {
        title: { type: String, default: '' },

        description: { type: String,  default: '' },

        imageUrl: { type: String, default: '#' },

        tags: { type: Array, default: function() {
            return []
        } },

        mainTag: { type: Object, default: null },

        selected:  { type: Boolean, default: false },

        editable:  { type: Boolean, default: false },
        
        createdAt: { type: String, default: 'Jul 20 2020' },

        margined: { type: Boolean, default: false},

        squareForm: { type: Boolean, default: false },

        rectangleForm: { type: Boolean, default: false }
    },

    data: function() {
        return {
            contextItems: [
                {   
                    label: 'Open',
                    action: () => {
                        bus.dispatch('card-selecting', { card: this });
                    }
                }
            ]
        }   
    },

    computed: {
        generatedView() {
            return Math.floor(Math.random() * 10);
        },

        isSquare() {
            if (this.squareForm || (!!!this.squareForm &&  !!!this.rectangleForm))
                return true;
        },

        isRecatangle() {
            if (!!!this.squareForm && this.rectangleForm)
                return true;
        }
    },

    methods: {
        select() {
            bus.dispatch('card-selecting', { card: this });
        }
    },

    beforeMount() {
        if (!!!this.editable)
            return;

        this.contextItems.push( {   
                label: 'Edit',
                action: () => {
                    bus.dispatch('card-editing', { card: this });
                } 
            },
            { 
                label: 'Delete',
                action: () => {
                    bus.dispatch('card-deleting', { card: this});
                } 
            },
        )
    }
}
</script>