<template>
	<request-form
		class="management__tab-body"
		autocomplete="false"
		ref="form"
		:class="{'management__tab-body--uneditable': shrinked}"
		:submit-callback="submit"
		@input:incorrect="handleError">
		
		<div class="management__account-header">
			<label class="management__account-photo" for="accountPhoto">
				<input
					class="management__account-photo-input"
					id="accountPhoto" 
					accept="image/*"
					type="file"
					ref="avatar"
					@change="changeAvatar">
			</label>
			<div class="management__account-wrapper">
				<h3 h3 class="management__account-name heading-third">
						{{ data.currentName }}
				</h3>
				<button 
					class="management__account-edit-button text-fourth"
					type="button"
					@click="toggle">
					
					<span class="material-icons">edit</span>edit account
				</button>
			</div>
		</div>
		<label class="management__account-label heading-fifth" for="">Profile name</label>
		<div class="management__account-input-group management__account-input-group--account">
			<small class="management__account-input-error">{{ errors.name }}</small>
			<input
				class="management__account-input input-second"
				placeholder="Your name"
				autocomplete="off"
				type="text"
				name="name"
				v-model="data.newName"
				:minlength="rules.name.min"
				:maxlength="rules.name.max"
				:readonly="disabled"
				required>
		</div>
		<label class="management__account-label heading-fifth" for="">Email</label>
		<div class="management__account-input-group management__account-input-group--email">
			<small class="management__account-input-error">{{ errors.email }}</small>
			<input
				class="management__account-input input-second" 
				placeholder="your-email@gmail.com"
				autocomplete="off"
				type="text" 
				name="email"
				v-model="data.email"
				:readonly="disabled"
				required>
		</div>
		<div 
			class="management__account-editor-group"
			:style="{
				'height': bodyHeight,
				'transition': bodyTransition }">

			<div 
				class="management__account-editor-content"
				ref="content">

				<label class="management__account-label heading-fifth" for="">Password</label>
				<div class="management__account-input-group management__account-input-group--new-password">
						<small class="management__account-input-error">{{ errors.newPassword }}</small>
						<input 
							class="management__account-input input-second"
							placeholder="new password"
							autocomplete="new-password"
							name="newPassword"
							v-model="data.newPassword"
							:minlength="rules.password.min"
							:maxlength="rules.password.max"
							:type="passwordType"
							:readonly="disabled">
						<button 
							class="management__account-visibility-button"
							@click="togglePasswordView">
								
							<span class="management__account-input-icon--visibility material-icons-round">
								{{ passwordIcon }}
							</span>
						</button>
				</div>
				<div class="management__account-input-group management__account-input-group--password">
					<small class="management__account-input-error">{{ errors.confirmation }}</small>
					<input 
						class="management__account-input input-second" 
						placeholder="confirm new password"
						autocomplete="new-password"
						name="confirmation"
						v-model="data.confirmation"
						:minlength="rules.password.min"
						:maxlength="rules.password.max"
						:type="passwordType"
						:readonly="disabled">
				</div>
				<label class="management__account-label heading-fifth" for="">Confirmation</label>
				<div class="management__account-input-group management__account-input-group--confirm-password">
					<small class="management__account-input-error"> {{ errors.currentPassword }}</small>
					<input
						class="management__account-input input-second"
						placeholder="current password"
						autocomplete="current-password"
						type="text"
						name="password"
						v-model="data.currentPassoword"
						:minlength="rules.password.min"
						:maxlength="rules.password.max"
						:readonly="disabled"
						required>
				</div>


			<submit-button  class="management__account-button button-second"/>
			</div>
		</div>
		<button class="management__account-delete-button text-fourth">
			<span class="material-icons-round">delete_forever</span>
			
			delete account
		</button>
	</request-form>
</template>

<script>

import RequestForm from '@components/RequestForm'
import SubmitButton from '@components/SubmitButton'
import Shrinkable from '@mixins/Shrinkable'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

export default {
	components: { 
		RequestForm,
		SubmitButton
	},

	mixins: [ Shrinkable ],
	
	data: function () {
		return {
			data: {
				email: '',

				currentName: '',
				newName: '',
				
				currentPassword: '',
				newPassword: '',
				confirmation: '',
			},

			errors: {
				email: '',
				name: '',

				currentPassowrd: '',
				newPassword: '',
				confirmation: ''
			},

			rules: {
				password: { max: null, min: null },

				name: { max: null,  min: null }
			},

			passowrdShown: false,

			loadingUser: true,
		}
	},

	computed: {
			passwordType() {
				return this.passowrdShown ? 'text' : 'password';
			},
			
			passwordIcon() {
				return this.isPasswordShown ? 'visibility_off' : 'visibility';
			},

			disabled() {
				return this.loadingUser || this.shrinked || (this.$refs.form && this.$refs.form.loading);
			}
	},

	beforeMount() {
		this.forceShrink();

		Auth.check().then(async authenticated => {

			if (!!!authenticated)
				return;

			let user = await Auth.user.get();

			/* if (!!!user.verified)
				return bus.dispatch('email-overlay--show'); */
				
			Object.assign(this.data, {
				email: user.email, 
				currentName: user.name,
				newName: user.name
			})
		})
		.finally(() => this.loadingUser = false);

		this.rules = Auth.rules();
	}, 

	methods: {
		changeAvatar() {
			let file = this.$refs.avatar.files[0];

			if (!!!file)
				return;

			let data = new FormData();
			data.append('avatar', file);

			Auth.user.avatar.edit(data);
		},

		handleError(errors) {
			Object.assign(this.errors, errors);

			if (errors.password)
			{
				errors.currentPassword = errors.password;
				delete errors.password;
			}
			
			Object.assign(this.errors, errors);
		},

		clearErrors() {
			let empty = {};

			for (let key in this.errors)
				empty[key] = '';

			Object.assign(this.errors, empty);
		},

		togglePasswordView() {
			this.passowrdShown = !!!this.passowrdShown;
		},

		async submit(data) {
			if ( this.data.confirmation !== this.data.newPassword)
				return;

			this.clearErrors();

			await Auth.user.edit(data);

			this.currentName = this.newName;
		}	
	}
}
</script>

<style scoped>

.management__account-editor-group {
	overflow: hidden;
	max-height: none !important; 
}

.management__account-editor-content {
	display: flex;
	flex-direction: column;
}

</style>