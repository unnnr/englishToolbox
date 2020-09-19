<template>
	<form
		class="management__tab-body management__tab-body--uneditabl"
		ref="form"
		@submit.prevent="submit">
		
		<div class="management__account-header">
			<label class="management__account-photo" for="accountPhoto">
				<input class="management__account-photo-input" type="file" id="accountPhoto">
			</label>
			<div class="management__account-wrapper">
				<h3 h3 class="management__account-name heading-third">
						{{ data.currentName }}
				</h3>
				<button button class="management__account-edit-button text-fourth"><span class="material-icons">edit</span>edit account</button>
			</div>
		</div>
		<label class="management__account-label heading-fifth" for="">Profile name</label>
		<div class="management__account-input-group management__account-input-group--account">
			<small class="management__account-input-error"></small>
			<input
				class="management__account-input input-second"
				placeholder="Your name"
				type="text"
				name="name"
				v-model="data.newName"
				:disabled="loading"
				:minlength="rules.name.min"
				:maxlength="rules.name.max"
				required>
		</div>
		<label class="management__account-label heading-fifth" for="">Email</label>
		<div class="management__account-input-group management__account-input-group--email">
			<small class="management__account-input-error"></small>
			<input
				class="management__account-input input-second" 
				placeholder="your-email@gmail.com"
				type="text" 
				name="email"
				:disabled="loading"
				v-model="data.email"
				required>
		</div>
		<div class="management__account-editor-group">
			<label class="management__account-label heading-fifth" for="">Password</label>
			<div class="management__account-input-group management__account-input-group--new-password">
					<small class="management__account-input-error"></small>
					<input 
						class="management__account-input input-second"
						placeholder="new password"
						name="newPassword"
						v-model="data.newPassword"
						:disabled="loading"
						:minlength="rules.password.min"
						:maxlength="rules.password.max"
						:type="passwordType">
					<button 
						class="management__account-visibility-button"
						@click="togglePasswordView">
							
						<span class="management__account-input-icon--visibility material-icons-round">
							{{ passwordIcon }}
						</span>
					</button>
			</div>
			<div class="management__account-input-group management__account-input-group--password">
				<small class="management__account-input-error"></small>
				<input 
					class="management__account-input input-second" 
					placeholder="confirm new password"
					name="confirmation"
					v-model="data.confirmation"
					:disabled="loading"
					:minlength="rules.password.min"
					:maxlength="rules.password.max"
					:type="passwordType">
			</div>
			<label class="management__account-label heading-fifth" for="">Confirmation</label>
			<div class="management__account-input-group management__account-input-group--confirm-password">
				<small class="management__account-input-error"></small>
				<input
					class="management__account-input input-second"
					placeholder="current password"
					type="text"
					name="password"
					v-model="data.currentPassoword"
					:minlength="rules.password.min"
					:maxlength="rules.password.max"
					:disabled="loading"
					required>
			</div>
			<button class="management__account-button button-second">confirm changes</button>
		</div>
		<button class="management__account-delete-button text-fourth">
			<span class="material-icons-round">delete_forever</span>
			
			delete account
		</button>
	</form>
</template>

<script>
import Auth from '@services/Auth';

export default {
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

			rules: {
				password: {
					max: null,
					min: null,
				},

				name: {
					max: null, 
					min: null
				}
			},

			passowrdShown: false,

			loading: false
		}
	},

	computed: {
			passwordType() {
				if (this.passowrdShown)
					return 'text';

				return 'password';
			},
			
			passwordIcon() {
				if (this.isPasswordShown)
					return 'visibility_off';

				return 'visibility';
			}
	},

	beforeMount() {
		Auth.onload(() => {
			let user = Auth.user();

			this.data.email = user.email;
			this.data.currentName = user.name;

			this.data.newName = this.data.currentName;
		});

		this.rules = Auth.rules();
	}, 

	methods: {
		togglePasswordView() {
			this.passowrdShown = !!!this.passowrdShown;
		},

		async submit() {
			if (this.loading)
				return;

			if ( this.data.confirmation !== this.data.newPassword)
				return;

			this.loading = true;
			
			let form = this.$refs.form;
			await Auth.edit(new FormData(form)).catch((error) => {console.log(error)});

			this.currentName = this.newName;

			this.loading = false;
		}
	}
}
</script>