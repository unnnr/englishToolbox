<template>
	<main class="auth auth--login container">

		<img 
			class="auth__poster" 
			:src="imageUrl">

		<v-form 
			class="auth__form"
			:request="submit">

			<h4 class="auth__title heading-fourth">login in</h4>
			
			<email-input focus-on-mount/> 

			<password-input />
		
			<confirm-button
				class="button-primary" 
				ref="submitButton"/>

			<div class="auth__links">
				<router-link
					class="auth__link text-fifth"
					to="Register">

					Don't have an account?
				</router-link>
				
				<a 
					class="auth__link text-fifth"
					href="#"
					@click="changePassword">
					
					Forgot your password?
				</a>
			</div>

		</v-form>


	</main>
</template>

<script>
import ConfirmButton from '@components/buttons/ConfirmButton'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import VForm from '@components/validation/VForm'
import Auth from '@services/Auth'

export default {
	components: {
		ConfirmButton,
		PasswordInput,
		EmailInput,
		VForm
	},
    
	computed: {
		imageUrl() {
			return window.origin + '/img/svg/login.svg';
		},
	},
	
	methods: {
	 	showRecovery(email) {
			function onError(error) {
				let message = null;

				if (error.status === 404)
					message = 'We can\'t find a user with this email. Please try again';
				else
					message = 'Some problem occurred during the recovery creation. Please try again'
				
				bus.dispatch('alert-error', {	message });
			}
			let data = new FormData();
			data.append('email', email);

			Auth.createRecovery(data)
				.catch(onError);

			bus.dispatch('alert-recovery', {
				email
			})
		},

		showPrompt() {
			bus.dispatch('alert-prompt', {
				type: 'email', confirm: this.showRecovery
			});
		},
		
		changePassword() {
			this.showPrompt();
		},

		redirect() {
			this.$router.push({name: 'home'});
		},

		async submit(data) {
			await Auth.login(data);
			
			this.redirect();
		}
	}
}
</script>