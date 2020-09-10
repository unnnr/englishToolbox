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
					v-for="({sender, message, date, id}) in comments"
					:key="id">

            		<div class="comment__image"></div>
            		<div class="comment__body">
              			<p class="comment__text text-sixth">
                			<span class="comment__name">{{ sender }}</span>
                			<span class="comment__mention"></span>
                			{{ message }}
              			</p>
              			<time class="comment__date text-sixth">{{ date }}</time>
            		</div>
          		</div>
			</div>
        </div>
        <form 
			class="comments__footer"
			ref="form"
			v-if="showInput"
			@submit.prevent="submit">

        	<a class="comments__account-link" href="#">
				<span class="material-icons-round">account_circle</span>
			</a>
        	<textarea 
				class="comments__textarea"
				placeholder="your comment"
				minlength="1"
				maxlength="500"
				name="message"
				v-model="newComment"
				required>
			</textarea>
			
        	<button class="comments__send-button" type="submit"><span class="material-icons-round">send</span></button>
        </form>
    </div>
</template>

<script>

import Shrinkable from '@mixins/ShrinkableDetailsTab'
import Comments from '@models/Comments'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

const COMMENT_MARGIN_HEIGHT = 30;

export default {
	name: 'comments',
	
	mixins: [
		Shrinkable 
	],
	
	data: function () {
        return {
			comments: [
				{ id: 1, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ id: 2, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ id: 3, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ id: 4, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ id: 5, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ id: 6, sender: 'IamSENDER', date: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
			],

			shrinkDuration: 800,

			showInput: false,

			submitting: false,
		
			newComment: ''
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

    beforeMount() {
		Auth.onload(() => {
			this.showInput = Auth.check();
		});
	},

	mounted() {
		bus.listen('post-selecting', this.onSelect);	
	},	

	beforeDestroy() {
		bus.detach('post-selecting', this.onSelect);	
	},
	
	methods: {
		async onSelect(event) {
			this.$options.selectedPostId = event.post.id;

			this.comments = await Comments.getAttached(event.post.id);	
		},
		
        shrink() {
            let content = this.$refs.content;

            this.bodyHeight = content.offsetHeight + 'px';
			
            // Gives time for rendering
            setTimeout(() => { 
				this.bodyHeight = this.firstCommentHeight + COMMENT_MARGIN_HEIGHT + 'px'; 
			}, this.renderDuration)
		},

		trimTextarea() {
			this.newComment = this.newComment.trim();
		},

		onServerError(error)  {
			console.log(error);
			this.submitting = false;
		},
		
		async submit() {

			if (this.submitting)
				return; 

			this.submitting = true;
			this.trimTextarea();

			let postId = this.$options.selectedPostId; 
			let data = new FormData(this.$refs.form);
			
			let newComment = await Comments.create(postId, data).catch(this.onServerError);

			this.comments.push(newComment);

			this.submitting = false;
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