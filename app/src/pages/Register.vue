<template>
	<main class="auth auth--register container">
		<v-form 
			class="auth__form"
			:request="submit">

			<h4 class="auth__title heading-fourth">Sing up</h4>

			<name-input focus-on-mount/>

			<email-input/>
			
			<password-input
				without-autocomplete/>
				
			<confirmation-input 
				without-autocomplete
				v-confirm="'password'"/>

			<confirm-button
				class="button-primary"/>

			<div class="auth__links">
				<router-link
					class="auth__link text-fifth"
					to="Login">

					Already have an account?
				</router-link>
			</div>

			
		</v-form>

		<img 
			class="auth__poster" 
			:src="imageUrl">

		<button 
			style="width: 100px; height: 300px; background: red"
			@click="som"/>


		<captcha ref="captcha"/>

	</main>
</template>

<script>
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import Captcha from '@components/Captcha'
import VForm from '@components/validation/VForm'
import Auth from '@services/Auth'

export default {
	components: {
		ConfirmationInput,
		ConfirmButton,
		PasswordInput,
		EmailInput,
		NameInput,
		Captcha,
		VForm
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/register.svg';
		}
	},    

	methods: {
		redirect() {
			this.$router.push({name: 'home'});
		},

		som() {
			this.submit();
		},

		async submit(data) {
			let captcha = this.$refs.captcha;
			let key = await captcha.validate();

			await Auth.register(data);

			this.redirect();
		}
	}
}
</script>