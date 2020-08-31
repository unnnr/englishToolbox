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
        }
    },

    computed: {
        imageUrl() {
            return window.origin + '/img/svg/register-overlay.svg';
        }, 

        shown() {
            return !!!Auth.isVerified();
        }
    }

}
</script>

<style scoped>

.register-overlay
{
    min-width: 100vw;
    position: absolute;
    z-index: 123;
    top: 0;

    background-color: white;
}

</style>