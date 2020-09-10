import PostPresentor from "@components/posts/PostPresentor.vue"
import bus from '@services/eventbus'

const PostDetails = {

    components: {
        PostPresentor
    },

    data: function () {
		return {
			editing: false,
			target: null
		}
	},

    mounted() {
		bus.listen('post-editing', event => {
			this.editing = true;	

			this.target = event.post;

			if (!!!event.preventScrolling)
				this.scrolleToDetails();
		});

		bus.listen('post-edited', event => {
			this.target = null;
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

            let relatedTop = details.getBoundingClientRect().top;
            let distance = relatedTop - SHIFT;

			if (relatedTop < 0)
            	window.scrollBy({
            	    top: distance ,
            	    behavior: 'smooth' 
            	})
		}
    }
};

export default PostDetails;