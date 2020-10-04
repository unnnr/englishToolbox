const Shrinkable = {
    props: {
        shrinkable: {
            type: Boolean
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
        
            // force open
            this.bodyHeight = 'auto';
            this.shrinked = false;
        }
    },

    methods: {
        shrink() {
            let content = this.$refs.content;

            this.bodyHeight = content.offsetHeight + 'px';
            
            // Gives time for rendering
            this.$nextTick(() => {
                this.bodyHeight = 0;
            });
        },

        open() {
            let content = this.$refs.content;

            console.log(content.offsetHeight);
            this.bodyHeight = content.offsetHeight + 'px';

            // Removing explicitly setted height
            this.$options.openingTimer = setTimeout(() => {
                this.bodyHeight = 'auto';
                this.$options.openingTimer = null;
            },  this.shrinkDuration); 
        },

        toggle() {
            if (!!!this.shrinkable)
                return;

            if (this.$options.openingTimer)
                clearTimeout(this.$options.openingTimer);

            this.shrinked = !!!this.shrinked;

            if (this.shrinked)
                this.shrink();
            else 
                this.open();
        }
    }
};

export default Shrinkable;