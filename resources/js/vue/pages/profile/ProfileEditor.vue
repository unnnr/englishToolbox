<template>
    <form
        class="management__tab-body"
        ref="form"
        @submit.prevent="submit">
        
        <div class="management__account-header">
            <div class="management__account-photo"></div>
                <div class="management__account-wrapper">
                <h3 h3 class="management__account-name heading-third">
                    {{ data.currentName }}
                </h3>
                <button button class="management__account-edit-button text-fourth"><span class="material-icons">edit</span>edit account</button>
            </div>
        </div>
        <label class="management__account-label heading-fifth" for="">Profile name</label>
        <div class="management__account-input-group">
            <input
                class="management__account-input input-second"
                placeholder="Your name"
                type="text"
                name="name"
                :disabled="loading"
                v-model="data.newName"
                required>
            <span class="management__account-input-icon material-icons-round">account_circle</span>
        </div>
        <label class="management__account-label heading-fifth" for="">Email</label>
        <div class="management__account-input-group">
            <input 
                class="management__account-input input-second" 
                placeholder="your-email@gmail.com"
                type="text" 
                name="email"
                :disabled="loading"
                v-model="data.email"
                required>
            <span class="management__account-input-icon material-icons-round">email</span>
        </div>
        <label class="management__account-label heading-fifth" for="">Password</label>
        <div class="management__account-input-group management__account-input-group--margined">
            <input 
                class="management__account-input input-second"
                placeholder="new password"
                name="newPassword"
                v-model="data.newPassword"
                :disabled="loading"
                :type="passwordType">
            <span class="management__account-input-icon material-icons-round">enhanced_encryption</span>
            <button 
                class="management__account-visibility-button"
                @click="togglePasswordView">
                
            <span class="management__account-input-icon management__account-input-icon--visibility material-icons-round">
                {{ passwordIcon }}
            </span>
            </button>
        </div>
        <div class="management__account-input-group">
            <input 
                class="management__account-input input-second" 
                placeholder="confirm new password"
                name="confirmation"
                v-model="data.confirmation"
                :disabled="loading"
                :type="passwordType">

            <span class="management__account-input-icon material-icons-round">lock</span>
        </div>
        <label class="management__account-label heading-fifth" for="">Confirmation</label>
        <div class="management__account-input-group management__account-input-group--margined">
            <input
                class="management__account-input input-second"
                placeholder="current password"
                type="text"
                name="password"
                v-model="data.currentPassoword"
                :disabled="loading"
                required>
            <span class="management__account-input-icon material-icons-round">check</span>
        </div>
        <button class="management__account-button button-second">confirm changes</button>
        <button class="management__account-delete-button text-fourth"><span class="material-icons-round">delete_forever</span>delete account</button>
    </form>
</template>

<script>
import Auth from '@services/Auth';

export default {
    name: 'profile-editor',

    data: function () {
        return {
            data: {
                email: 'email@gmail.com',

                currentName: 'Your name',
                newName: '',
                
                currentPassword: '',
                newPassword: '',
                confirmation: '',
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
        this.data.newName = this.data.currentName;
    }, 

    methods: {
        togglePasswordView() {
            this.passowrdShown = !!!this.passowrdShown;
        },

        async submit() {
            if (this.loading === true)
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