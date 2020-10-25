<template>
	<main class="auth auth--login container">

		<img class="auth__poster" :src="imageUrl">

		<v-form 
			class="auth__form"
			ref="form"
			@input:incorrect="hadleErrors">

			<h4 class="auth__title heading-fourth">login in</h4>
			
			<email-input /> 

			<password-input />
		
			<submit-button
				class="button-primary" 
				ref="submitButton"
				:loading="isLoading()"/>

			<p class="auth__subtitle text-fourth">Or login with</p>

			<div class="auth__buttons">
				<button class="auth__button auth__button--google" type="button"></button>
				<button class="auth__button auth__button--facebook" type="button"></button>
				<button class="auth__button auth__button--twitter" type="button"></button>
			</div>

			<div class="auth__links">
				<a 
					class="auth__link text-fifth"
					:href="registerUrl">
					Don't have an account?
				</a>
				<a 
					class="auth__link text-fifth"
					href="#">
					Forgot your password?
				</a>
			</div>

		</v-form>


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