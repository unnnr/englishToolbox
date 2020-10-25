<template>
	<main class="login-in container">
		<v-form 
			class="auth"
			ref="form"
			@input:incorrect="hadleErrors">

			<h4 class="auth__title heading-fourth">login in</h4>
			
			<email-input /> 

			<password-input />
		
			<submit-button
				class="auth__input-button button-main" 
				ref="submitButton"
				:loading="isLoading()"/>

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
					
					Don`t have an account?
				</a>
			</div>
		</v-form>

		<div class="form__poster form__poster--login-in">
			<object 
				class="form__img"
				type="image/svg+xml"
				:data="imageUrl">
			</object>
		</div>
	</main>
</template>

<script>

import bus from '@services/eventbus'
import Auth from '@services/Auth'
import SubmitButton from '@components/SubmitButton';
import RequestForm from '@components/RequestForm';
// import {isEmail, isPassword, isName, isConfirmation} from '@services/Validations';

import PasswordInput from '@components/validation/PasswordInput'
import EmailInput from '@components/validation/EmailInput'
import VForm from '@components/validation/VForm'

export default {
	components: {
		PasswordInput,
		SubmitButton,
		EmailInput,
		VForm
	},
    
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
		isLoading() {
			if (this.$refs.form)
				return this.$refs.form.loading;
		},

		togglePreview() {
			this.isPasswordShown = !!!this.isPasswordShown;
		},

		redirect() {
			this.$router.push({name: 'Home'});
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

		async submit() {
			if (!!!this.validate())
					return;

			let form =  this.$refs.form;

			await Auth.login(form.data);
			
			this.redirect();
		},

		hadleErrors(errors) { 
			for (let [label, messages] of Object.entries(errors))
			{
				this.errors[label] = messages;
				this.confirmed[label] = false;  
			}
		}
	}
}
</script>