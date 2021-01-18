<template>
  <div class="profile__tab profile__editor">
    <h5 class="profile__tab-title heading-fifth">Your profile</h5>
   
    <button 
      class="profile__tab-button profile__tab-button--exit text-fifth"
      type="button"
      @click="logout">
      
      sign out
    </button>
 
    <v-form 
      ref="form"
      class="profile__tab-editor"
      :class="{'profile__editor--disabled': disabled}"

      :preventRedundant="false"
      :request="submit"
      :catch="handleError"

      require-password
      secondary>

      <div class="profile__editor-header">
        <avatar-input 
          class="profile__editor-image"
          :disabled="disabled"/>

        <h4 class="profile__editor-name heading-fourth">
          {{ userName }}
        </h4>
        <button 
          class="profile__tab-button profile__tab-button--edit-profile text-fifth"
          type="button"
          @click="toggleEditing">
          
          edit profile
        </button>
      </div>

      <name-input 
        :value="userName"
        :disabled="disabled"/>

      <email-input 
        :value="userEmail"
        :disabled="disabled"/>

      <div class="profile__editor-footer">

        <password-input 
          ref="password"
          class="input-group--password-new"
          autocomplete="new-password"
          label="New passoword"
          name="newPassword"
          optional/>

        <confirmation-input 
          ref="confirmation"
          v-confirm="'newPassword'"
          autocomplete="new-password"
          with-prefix/>
        
        <confirm-button/>
        
        <button 
          class="profile__tab-button profile__tab-button--delete-profile text-sixth"
          type="button"
          v-if="!!!admin"
          @click="deleteProfile">
          
          delete profile
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
// services
import Auth from '@services/Auth'
import bus from '@services/eventbus'

// components
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import PasswordInput from '@components/inputs/PasswordInput'
import AvatarInput from '@components/inputs/AvatarInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import VForm from '@components/validation/VForm'


export default {
  components: {
    ConfirmationInput,
    ConfirmButton,
    PasswordInput,
    AvatarInput,
    EmailInput,
    NameInput,
    VForm
  },

  data() {
    return {
      disabled: true,
      user: null
    }
  },

  computed: {
    userName() {
      return this.user ? this.user.name : '蒼空';
    },
    
    userEmail() {
      return this.user ? this.user.email : 'some@email.com';
    },

    admin() {
      return this.user ? this.user.admin : false;
    } 
  },

  mounted() {
		Auth.check().then(async authenticated => {
			if (!!!authenticated)
        return;
        
      this.user = await Auth.user.get();
    });
  },

  methods: {
    showAlert(callback) {
      bus.dispatch('alert-warning', {
        message: 'All changes will be lost',
        okay: callback,
      })
    },
    
    hide() {
      let form = this.$refs.form;
      if (!!!form)
        return;

      this.disabled = true;
      
      this.clear();
      form.reset();
    },

    show() {
      this.disabled = false;
    },

    toggleEditing() {
      if (this.disabled)
        this.show();
      else
        this.hide();
    },

    deleteProfile() {
      let form = this.$refs.form;

      form.appendPassword(password => {
        form.sendWith(async () => {
          let data = new FormData(data);
          data.append('password', password);

          await Auth.user.delete(data);
			    this.$router.push({name: 'home'});
        });
      });
    },

    logout() {
      function okay() {
        let form = this.$refs.form;
        
        form.sendWith(async () => {
          await Auth.logout();
			    this.$router.push({name: 'home'});
        });
      }

      bus.dispatch('alert-warning', {
        message: 'Press "Ok" to confirm this action',
        okay: okay.bind(this),
      });
    },

    handleError(error) {
      if (!!!error || !!!error.password)
        return;

      bus.dispatch('alert-error', {
        message: 'Incorrect password'
      }); 
    },
    
    clear() {
      this.$refs.password.clear();
      this.$refs.confirmation.clear();
    },

    async submit(data, hasChanges) { 
      if (hasChanges)
        this.user = await Auth.user.edit(data);

      this.hide();
    }
  }
}
</script>