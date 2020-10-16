const Shrinkable = {
    props: {
        shrinkable: {
            type: Boolean,
            default: true
        }
    },

    data: function () {
        return {
            shrinked: false,
            
            bodyHeight: 'auto',

            shrinkDuration: 700,
        }
    },

    computed: {
        shrinkTo() {
            return 0 + 'px';
        },

        contentHeight() {
            let content = this.$refs.content;

            return content.offsetHeight + 'px';
        },

        buttonTransition() {
            let duration = this.shrinkDuration;
            
            return `transform ${duration}ms ease-in-out`;
        },

        bodyTransition() {
            let duration = this.shrinkDuration;

            return `height ${duration}ms ease-in-out`;
        }
    },


    watch: {
        shrinkable(value) {
            if (value || !!!this.shrinked)
                return;
        
            this.forceOpen();
        }
    },

    methods: {
        forceOpen() {
            this.bodyHeight = 'auto';
            this.shrinked = false;
        },

        forceShrink() {
            this.bodyHeight = 0;
            this.shrinked = true;
        },

        shrink() {
            const RENDER_DURATION = 100;

            this.bodyHeight = this.contentHeight;
            
            // Gives time for rendering
            setTimeout(() => {
                this.bodyHeight = this.shrinkTo;

                this.$options.animationTimer = setTimeout(() => {
                    if (typeof this.afterShrink == 'function')
                        this.afterShrink();
    
                },  this.shrinkDuration); 
            }, RENDER_DURATION);
        },

        open() {
            this.bodyHeight = this.contentHeight;

            // Removing explicitly setted height
            this.$options.animationTimer = setTimeout(() => {
                this.bodyHeight = 'auto';
                this.$options.animationTimer = null;

                if (typeof this.afterOpen == 'function')
                    this.afterOpen();

            },  this.shrinkDuration); 
        },

        toggle() {
            if (!!!this.shrinkable)
                return;

            if (this.$options.animationTimer)
                clearTimeout(this.$options.animationTimer);

            this.shrinked = !!!this.shrinked;

            if (this.shrinked)
                this.shrink();
            else 
                this.open();
        }
    }
};

export default Shrinkable;