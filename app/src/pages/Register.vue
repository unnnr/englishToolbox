<template>
	<main class="auth auth--register container">
		<v-form 
			class="auth__form"
			ref="form">

			<h4 class="auth__title heading-fourth">Sing up</h4>

			<name-input />

			<email-input />

			<password-input />

			<confirmation-input v-confirm="'password'"/>

		
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
					Already have an account?
				</a>
			</div>
			
		</v-form>

		<img class="auth__poster" :src="imageUrl">

	</main>
</template>

<script>

import bus from '@services/eventbus'
import Auth from '@services/Auth'
import SubmitButton from '@components/SubmitButton'
import RequestForm from '@components/RequestForm'
import {isEmail, isPassword, isName, isConfirmation} from '@services/Validations';


import ConfirmationInput from '@components/inputs/ConfirmationInput'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import VForm from '@components/validation/VForm'


export default {
    components: {
			ConfirmationInput,
			PasswordInput,
			SubmitButton,
			EmailInput,
			NameInput,
			VForm
    },
    
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
					},

					confirmed: {
							name: false,
							email: false, 
							password: false,
							confirmation: false,
					},

					rules: Auth.rules()
			}   
	},

	computed: {
			previewIcon() {
					if (this.isPasswordShown)
							return 'visibility_off';

					return 'visibility';
			},

			passwordType() {
					if (this.isPasswordShown)
							return 'text';

					return 'password';
			},

			imageUrl() {
					return window.origin + '/img/svg/register.svg';
			},

			loginUrl() {
					return window.origin + '/login';
			}
	},    

	methods: {
		isLoading() {
			if (this.$refs.form)
				return this.$refs.form.loading;
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

		checkName() {
			return this.check('name', isName, {
					target: this.data.name,
					min: this.rules.name.min,
					max: this.rules.name.max
			});
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

		checkConfirmation() {
			return this.check('confirmation', isConfirmation, {
					target: this.data.password,
					confirmation: this.data.confirmation
			});
		},
		
		getIconGroup(label) {
			if (this.confirmed[label])
				return '--success';

			else if (this.errors[label])
				return '--error';
		},

		togglePreview() {
			this.isPasswordShown = !!!this.isPasswordShown;
		},

		redirect() {
			this.$router.push({name: 'Home'});
		},

		async submit() {
			if (!!!this.validate())
				return;

			let form =  this.$refs.form;

			await Auth.register(form.data);

			this.redirect();
		},

		validate() {
			let validators = [
				this.checkName,
				this.checkEmail,
				this.checkPassword,
				this.checkConfirmation
			];

			for (const validator of validators)
			{
				if (!!!validator())
					return false;
			}

			return true;
		},

		hadleErrors(errors) { 
			console.log(errors);
			for (let [label, messages] of Object.entries(errors))
			{
				this.errors[label] = messages;
				this.confirmed[label] = false;  
			}
		}
	}
}
</script>