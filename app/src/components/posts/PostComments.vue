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
			:style="{'height': bodyHeight,
							 'transition': bodyTransition}">	
		
			<transition name="fade">
				<div 
					class="comments__overlay"
					v-if="loading">
				</div>

				<div 	
					class="comments__body-content"
					ref='content'
					v-else>
				
					<small class="comments__count text-sixth">{{ commentsCount }} comments</small>
					<div
						class="comment"
						v-for="({sender, message, date, id}) in comments"
						:key="id">

						<div class="comment__image"></div>
						<div class="comment__body">
								<p class="comment__text text-sixth">
									<span class="comment__name">{{ sender }}</span>
								<!-- 	<span class="comment__mention"></span> -->
									{{ message }}
								</p>
								<time class="comment__date text-sixth">{{ date }}</time>
						</div>
					</div>
				</div>
			</transition>
		</div>

		<request-form 
			class="comments__footer"
			v-if="showInput"
			:submit-callback="submit"
			@submit.prevent="submit">

			<a class="comments__account-link" href="#">
				<span class="material-icons-round">account_circle</span>
			</a>
			
			<textarea 
				class="comments__textarea"
				placeholder="your comment"
				maxlength="500"
				minlength="1"
				name="message"
				v-model="message"
				required>
			</textarea>
		
			<button class="comments__send-button" type="submit">
				<span class="material-icons-round">send</span>
			</button>
		</request-form>
	</div>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import RequestForm from '@components/RequestForm'
import Shrinkable from '@mixins/Shrinkable'
import Comments from '@models/Comments'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

const COMMENT_MARGIN_HEIGHT = 30;

export default {
	components: {
		RequestForm
	},
	
	mixins: [ 
		HandleEvents,
		Shrinkable
	],

	props: {
		model: {
			type: Object
		}
	},
	
	data: function () {
    return {
			comments: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],

			shrinkDuration: 800,

			showInput: false,

			submitting: false,

			message: ''
    }
	},

	computed: {
		firstCommentHeight() {
				const MARGIN_OFFSET = 30;

				if (this.comments.length === 0)
					return 0;

				let content =  this.$refs.content;
				let comment = content.children[1];
				return comment.offsetHeight + MARGIN_OFFSET;
			},

		shrinkTo() {
      return this.firstCommentHeight + 'px';
		},
		
		loading() {
			return this.comments === null
		},

		commentsCount() {
			return this.comments.length;
		}
	},

  beforeMount() {
		Auth.check().then(authenticated => 
				this.showInput = authenticated
		);
	},

	mounted() {
		this.listen({
			'post-selecting': async event => {
				this.$options.selectedPostId = event.post.id;

				this.comments = await this.model.comments.get(event.post.id);
			}
		})
	},	
	
	methods: {
		trimTextarea() {
			this.message = this.message.trim();
		},
		
		async submit(data) {
			this.trimTextarea();

			let postId = this.$options.selectedPostId; 
			let message = await Comments.create(postId, data);

			this.comments.push(message);

			this.message = '';
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

.comments__mobile-button {
	transform: rotate(0);
}

.comments__mobile-button--upturned {
	transform: rotate(-180deg);
}

</style>