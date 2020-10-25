<template>
	<main class="sign-up container">
		<v-form 
			class="auth"
			ref="form">

			<h4 class="auth__title heading-fourth">Sing up</h4>

			<name-input />

			<email-input />

			<password-input />

			<confirmation-input v-confirm="'password'"/>

			<div 
				class="auth__input-group auth__input-group--email"
				:class="'auth__input-group' + getIconGroup('email')">

				<input 
					class="auth__input input-main"
					type="email"
					name="email" 
					placeholder="your email" 
					v-model="data.email"
					@blur="checkEmail"
					required>

				<small class="auth__input-error"> {{ errors.email }} </small>
			</div>
			<div 
				class="auth__input-group auth__input-group--password"
				:class="'auth__input-group' + getIconGroup('password')">
				
				<input 
					class="auth__input input-main"
					name="password" 
					placeholder="your password" 
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
				<small class="auth__input-error"> {{  errors.password }} </small>
			</div>
			<div 
				class="auth__input-group auth__input-group--password"
				:class="'auth__input-group' + getIconGroup('confirmation')">
					
					<input 
						class="auth__input input-main" 
						name="confirmation" 
						placeholder="repeat password" 
						v-model="data.confirmation"
						:type="passwordType" 
						:maxlength="rules.password.max"
						:minlength="rules.password.min" 
						@blur="checkConfirmation"
						required>
					
					<small class="auth__input-error"> {{ errors.confirmation }} </small>
			</div>

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
					:href="loginUrl">
					
					Already have an account?
				</a>
			</div>
			
		</v-form>
		<div class="form__poster">
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
import SubmitButton from '@components/SubmitButton'
import RequestForm from '@components/RequestForm'
import {isEmail, isPassword, isName, isConfirmation} from '@services/Validations';


import ConfirmationInput from '@components/validation/ConfirmationInput'
import PasswordInput from '@components/validation/PasswordInput'
import EmailInput from '@components/validation/EmailInput'
import NameInput from '@components/validation/NameInput'
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