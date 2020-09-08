const ShrinkableDetailsTag = {
    props: {
        shrinkable: {
            type: Boolean
        }
    },

    data: function () {
        return {

            shrinked: false,
            
            bodyHeight: 'fit-content',

            shrinkDuration: 700,

            renderDuration: 100
        }
    },

    computed: {
        buttonTransition() {
            let duration = this.shrinkDuration;
            
            return `transform ${duration}ms ease-in-out`;
        },

        bodyTransition() {
            let duration = this.shrinkDuration;

            return `max-height ${duration}ms ease-in-out`;
        }
    },


    watch: {
        shrinkable(value) {
            if (value)
                return;

            this.open();

            this.shrinked = false;
        }
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
            setTimeout(() => { this.bodyHeight = 0 ;}, this.renderDuration);
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
            
            this.animationTimer = setTimeout(this.transitionEnded,  this.shrinkDuration); 
        }
    }
};

export default ShrinkableDetailsTag;