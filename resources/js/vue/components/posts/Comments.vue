<template>
    <div class="comments">
        <div class="comments__header">
          	<h5 class="comments__title heading-fifth">Comments</h5>
          	<button class="comments__mobile-button"><span class="material-icons-round">arrow_drop_down</span></button>
        </div>
        <div class="comments__body">
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
        	<form class="comments__footer">
          		<a class="comments__account-link" href="#"><span class="material-icons-round">account_circle</span></a>
          		<textarea class="comments__textarea" placeholder="your comment"></textarea>
          		<button class="comments__send-button"><span class="material-icons-round">send</span></button>
        	</form>
    	</div>
</template>

<script>
export default {
    name: 'comments',

	data: function () {
        return {
			comments: [
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				{ sender: 'IamSENDER', time: '19 may 2020', message: 'Sit amet justo donec enim diam vulputate ut. Egestas pretium aenean pharetra magna ac. Id eu nisl nunc mi ipsum faucibus vitae.'},
				
			]
        }
	},

	computed: {
		commentsCount() {
			return this.comments.length;
		}
	},
	
	methods: {
		shrink() {

		},

		open() {

		}
	},	

    mounted() {


    },
    
}
</script>