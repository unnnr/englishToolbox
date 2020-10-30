import bus from '@services/eventbus'

const HandleEvents = {

    data: function () {
        return {
            listeners: []
        };
    },

    beforeDestroy() {
        this.detach();
    },

    methods: {
        listen(options) {
            let input = Object.entries(options);

            for (const [name, hadnler] of input)
            {
                bus.listen(name, hadnler);

                this.listeners.push({
                    name, hadnler
                });
            }
        },

        detach() {
            for (let {name, hadnler} of this.listeners)
                bus.detach(name, hadnler);
            
            this.listeners = [];
        }
    }
}

export default HandleEvents;