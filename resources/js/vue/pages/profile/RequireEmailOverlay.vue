<template>
    <section 
        class="register-overlay"
        v-if="shown">

        <object
            class="register-overlay__image"
            type="image/svg+xml"
            :data="imageUrl">
        </object>
    </section> 
</template>

<script>

import Auth from  '@services/Auth';

export default {
    name: 'require-email-overlay',

    data: function() {
        return {
            shown: true
        }
    },

    computed: {
        imageUrl() {
            return window.origin + '/img/svg/register-overlay.svg';
        }
    },

    beforeMount() {
        Auth.onload(() => {
            this.shown = !!!Auth.isVerified();
        });
    }
}
</script>
