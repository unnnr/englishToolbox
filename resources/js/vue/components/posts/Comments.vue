<template>
    <div class="comments">
        <div class="comments__header">
          	<h5 class="comments__title heading-fifth">Comments</h5>
          	<button 
			  	class="comments__mobile-button"
				:class="{'comments__mobile-button--upturned': shrinked}"
                :style="{'transition': buttonTransition}"
				@click="toggle">
				  
				<span class="material-icons-round">arrow_drop_down</span>
			</button>
        </div>


        <div 
			class="comments__body"
            ref="wrapper"
            :style="{
                'max-height': bodyHeight,
                'transition': bodyTransition}">
			
			<div 
				class="comments__body-content"
                ref='content'>
				
				<small class="comments__count text-sixth">{{ commentsCount }} comments</small>
          		<div
			  		class="comment"
					v-for="({sender, message, time}, id) in comments"
					:key="id">

            		<div class="comment__image"></div>
            		<div class="comment__body">
              			<p class="comment__text text-sixth">
                			<span class="comment__name"></span>
                			<span class="comment__mention">@{{ sender }}</span>
                			{{ message }}
              			</p>
              			<time class="comment__date text-sixth">{{ time }}</time>
            		</div>
          		</div>
			</div>
        </div>
        <form class="comments__footer">
        	<a class="comments__account-link" href="#"><span class="material-icons-round">account_circle</span></a>
        	<textarea class="comments__textarea" placeholder="your comment"></textarea>
        	<button class="comments__send-button"><span class="material-icons-round">send</span></button>
        </form>
    </div>
</template>

<script>

import Shrinkable from '@mixins/ShrinkableDetailsTag';


const COMMENT_MARGIN_HEIGHT = 30;

export default {
    name: 'comments',

	mixins: [Shrinkable],
	
	data: function () {
        return {
			comments: [
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
			],

			shrinkDuration: 800
        }
	},


	computed: {
		commentsCount() {
			return this.comments.length;
		},

		firstCommentHeight() {
			let content =  this.$refs.content;

			if (content.children.length < 2)
				return null;

			let comment = content.children[1];


			return comment.offsetHeight;
		}
	},

    mounted() {


	},
	
	methods: {
        shrink() {
            let content = this.$refs.content;

            this.bodyHeight = content.offsetHeight + 'px';
			
            // Gives time for rendering
            setTimeout(() => { 
				this.bodyHeight = this.firstCommentHeight + COMMENT_MARGIN_HEIGHT + 'px'; 
			}, this.renderDuration)
        }
	}
    
}
</script>

<style scoped>

.comments__body {
    overflow: hidden;
}

.comments__mobile-button {
   transform-origin: 15px 15px;
}

.comments__mobile-button--upturned {
    transform: rotate(180deg);
}

</style>