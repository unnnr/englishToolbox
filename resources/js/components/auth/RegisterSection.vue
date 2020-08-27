<template>
    <section class="sign-up container">
        <form 
            method="POST"
            class="auth"
            action="#"
            ref="form"
            @submit.prevent="submit">

            <h4 class="auth__title heading-fourth">Sing up</h4>
            <div class="auth__input-group auth__input-group--account">
                <input 
                    class="auth__input input-main" 
                    name="name" 
                    type="text" 
                    placeholder="your name" 
                    v-model="data.name"
                    :class="{'auth__input-group--error':  errors.name}"
                    required>

                <small class="auth__input-error"> {{ errors.name }}</small>
            </div>
            <div class="auth__input-group auth__input-group--email">
                <input 
                    class="auth__input input-main"
                    type="email"
                    name="email" 
                    placeholder="your email" 
                    v-model="data.email"
                    :class="{'auth__input-group--error':  errors.email}"
                    required>

                <small class="auth__input-error"> {{ errors.email }} </small>
            </div>
            <div class="auth__input-group auth__input-group--password">
                <input 
                    class="auth__input input-main"
                    name="password" 
                    placeholder="your password" 
                    v-model="data.passoword"
                    :type="passwordType" 
                    :class="{'auth__input-group--error':  errors.passoword}"
                    required>

                <button 
                    class="auth__input-visibility-button material-icons-round"
                    type="button"
                    @click="togglePreview">

                    {{ previewIcon }}
                </button>
                <small class="auth__input-error"> {{ errors.confirmation }} </small>
            </div>
            <div class="auth__input-group auth__input-group--password">
                <input 
                    class="auth__input input-main" 
                    name="password_confirmation" 
                    placeholder="repeat password" 
                    v-model="data.confirmation"
                    :type="passwordType" 
                    :class="{'auth__input-group--error':  errors.name}"
                    required>
                
                <small class="auth__input-error"> {{ errors.confirmation }} </small>
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
                    :href="loginUrl">
                    
                    Already have an account?
                </a>
            </div>
        </form>
        <div class="form__poster">
            <object 
                class="form__img"
                type="image/svg+xml"
                :data="imageUrl">
            </object>
        </div>
    </section>
</template>

<script>

import bus from '@services/eventbus'
import Auth from '@services/Auth'

export default {
    name: 'register-section',
    
    data: function() {
        return {
           isPasswordShown: false,
           
           data: {
               name: '',
               email: '',
               password: '',
               confirmation: ''
           },

           errors: {
               name: '',
               email: '',
               password: '',
               confirmation: ''
           }
        }   
    },

    computed: {
        imageUrl() {
            return window.origin + '/img/svg/register.svg';
        },

        loginUrl() {
            return window.origin + '/login';
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
        },

        submit() {
            let form =  this.$refs.form;
            
            let data = new FormData(form);

            Auth.register(data).catch(this.parseErrors);
        },

        parseErrors(error) { 
            console.log(error);
            if (error.status == 422)
            {
                let data = error.body.errors;

                if (data.email )
                    this.errors.email = data.email.join('. ');

                if (data.password)
                    this.errors.password = data.password.join('. ');;   

                return;
            }

            bus.dispatch('alert-error');

        }
    }
}
</script>