<template>
    <section class="login-in container">
        <form 
            method="POST"
            class="auth"
            action="#"
            ref="form"
            @submit.prevent="submit">

            <h4 class="auth__title heading-fourth">login in</h4>
            <div
                class="auth__input-group auth__input-group--account"
                :class="'auth__input-group' + getIconGroup('email')">

                <input 
                    class="auth__input input-main"
                    placeholder="your email"
                    type="text" 
                    name="email"
                    v-model="data.email"
                    @blur="checkEmail" 
                    required>

                <small class="auth__input-error">{{ errors.email }}</small>
            </div>
            <div 
                class="auth__input-group auth__input-group--password"
                :class="'auth__input-group' + getIconGroup('password')">
                
                <input
                    class="auth__input input-main"
                    placeholder="your password"
                    name="password" 
                    v-model="data.password"
                    :type="passwordType" 
                    :maxlength="rules.password.max"
                    :minlength="rules.password.min" 
                    @blur="checkPassword"
                    required>

                <button
                    class="auth__input-visibility-button material-icons-round"
                    type="button"
                    @click="togglePreview">
                
                    {{ previewIcon }}
                </button>
                <small class="auth__input-error">{{ errors.password }}</small>
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

import bus from '@services/eventbus'
import Auth from '@services/Auth'
import {isEmail, isPassword, isName, isConfirmation} from '@services/Validations';

export default {
    name: 'login-section',
    
    data: function() {
        return {
           isPasswordShown: false,
           
            data: { 
               email: '',
               password: ''
            },

            errors: {
               email: '',
               password: ''
            },

            confirmed: {
                email: false,
                password: false
            },
            
            rules: Auth.rules()
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
        },

        redirect() {
            window.location.replace(window.origin + '/home');
        },

        getIconGroup(label) {
            if (this.confirmed[label])
                return '--success';

            else if (this.errors[label])
                return '--error';
        },

        check(label, validator, options) {

            let validation = validator(options);

            if (validation.passed)
            {
                this.errors[label] = '';
                this.confirmed[label] = true;

                return true;
            }
            
            this.errors[label] = validation.message;
            this.confirmed[label] = false;
            
            return false;
        },

        checkEmail() {
            return this.check('email', isEmail, {
                target: this.data.email,
            });
        },

        checkPassword() {
            return this.check('password', isPassword, {
                target: this.data.password,
                min: this.rules.password.min,
                max: this.rules.password.max
            });
        },

        validate() {   
            let validators = [
                this.checkEmail,
                this.checkPassword,
            ];

            for (const validator of validators)
            {
                if (!!!validator())
                    return false;
            }
            return true;
        },

        submit() {
            let form =  this.$refs.form;
            
            let data = new FormData(form);

            if (this.validate())
                Auth.login(data)
                .then(this.redirect)
                .catch(this.parseErrors);
        },

        parseErrors(error) { 
            if (error.status == 422)
            {
                let data = error.body.errors;
    
                for (let [label, messages] of Object.entries(data))
                {
                    this.errors[label] = messages.join('. ');
                    this.confirmed[label] = false;  
                }

                return;
            }

            throw error;
        }
    }
}
</script>