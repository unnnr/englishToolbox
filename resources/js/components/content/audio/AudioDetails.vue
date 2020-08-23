<template>
    <div 
		class="addition"
		ref="details">

        <div class="addition__body">
            <div class="addition__wrapper">
                <transition name="fade">
 					<audio-editor 
						v-show="editing" 
						:type="editorType"/>
				</transition>
                <post-presentor ref="presentor"/>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@services/eventbus';
import AudioEditor from "@components/content/audio/AudioEditor.vue";
import PostPresentor from "@components/content/PostPresentor.vue";

export default {
	name: "audio-details",

	components: {
    	PostPresentor,
    	AudioEditor,
    },
    
	data: function () {
		return {
			editing: true,
			editorType: 'creating',
		}
	},

	mounted() {
		bus.listen('post-editing', event => {
			this.editing = true;	

			if (!!!event.preventScrolling)
				this.scrolleToDetails();
		});

		bus.listen('post-creating', event => {
			
			this.editing = true;

			if (!!!event.preventScrolling)
				this.scrolleToDetails();
		});

		bus.listen('post-selecting', event => {
			this.editing = false;
		});	
	},

	methods: {

		scrolleToDetails() {
            const SHIFT = 10;

            let details = this.$refs.details;

            let realatedTop = details.getBoundingClientRect().top;
            let distance  = realatedTop - SHIFT;

            window.scrollBy({
                top: distance ,
                behavior: 'smooth' 
            })
        }
	}
};
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 1s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>