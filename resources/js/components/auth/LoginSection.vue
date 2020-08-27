<template>
    <section class="login-in container">
        <form class="auth" method="POST" action="#">
            <h4 class="auth__title heading-fourth">login in</h4>
            <div class="auth__input-group auth__input-group--account">
                <input 
                    class="auth__input input-main"
                    placeholder="your email"
                    type="text" 
                    name="email"
                    v-model="email"
                    required>

                <small class="auth__input-error"></small>
            </div>
            <div class="auth__input-group auth__input-group--password">
                <input
                    class="auth__input input-main"
                    placeholder="your password"
                    name="password" 
                    v-model="password"
                    :type="passwordType" 
                    required>

                <button
                    class="auth__input-visibility-button material-icons-round"
                    type="button"
                    @click="togglePreview">
                
                    {{ previewIcon }}
                </button>
                <small class="auth__input-error"></small>
            </div>
            <button class="auth__input-button button-main" type="submit">confirm</button>
            <div class="login-with">
                <p class="login-with__text text-fourth">Or login with</p>
                <div class="login-with__buttons">
                    <button class="login-with__button" type="button"><i class="login-with__icon login-with__icon--google fab fa-google"></i></button>
                    <button class="login-with__button " type="button"><i class="login-with__icon login-with__icon--facebook fab fa-facebook"></i></button>
                    <button class="login-with__button" type="button"><i class="login-with__icon login-with__icon--twetter fab fa-twitter"></i></button>
                </div>
                <a 
                    class="login-with__link text-fourth"
                    :href="registerUrl">
                    
                    Already have an account?
                </a>
            </div>
        </form>
        <div class="form__poster form__poster--login-in">
            <object 
                class="form__img"
                type="image/svg+xml"
                :data="imageUrl">
            </object>
        </div>
    </section>
</template>

<script>

import bus from '@services/eventbus';

export default {
    name: 'login-section',
    
    data: function() {
        return {
           email: '',
           password: '',
           isPasswordShown: false
        }   
    },

    computed: {
        imageUrl() {
            return window.origin + '/img/svg/login.svg';
        },

        registerUrl() {
            return window.origin + '/register';
        },

        previewIcon() {
            if (this.isPasswordShown)
                return 'visibility_off';

            return 'visibility';
        },

        passwordType() {
            if (this.isPasswordShown)
                return 'text';

            return 'password';
        }
    },      

    methods: {
        togglePreview() {
            this.isPasswordShown = !!!this.isPasswordShown;
        }
    }
}
</script>