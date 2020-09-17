<template>
    <form
        ref="form"
        action="#"
        @submit.prevent="submitWrapper">

        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'request-form',

    data: function() {
        return {
            loading: false
        }
    },

    props: {
        submitCallback: {
            type: Function, 
            default: () => {}
        }
    },

    methods: {
        handleError(error) {

            if (error.status == 422)
            {
                let errors = error.body.errors;

                this.$emit('input:incorrect', errors);

                return;
            }

            throw error;
        },

        getData() {
            return new FormData(this.$refs.form);
        },

        clear() {
            this.$refs.form.reset();
        },

        submitWrapper: async ()  => {
            if (this.loading)
                return;
            
            this.loading = true;

            try {
                if (this.submitCallback)
                    await this.submitCallback();

                this.loading = false;
            }
            catch (error) {
                this.loading = false;

                this.handleError(error);
            }
        }
    }
}
</script>