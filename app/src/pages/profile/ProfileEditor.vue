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
      :request="submit"
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
          class="input-group--password-new"
          autocomplete="new-password"
          label="New passoword"
          name="newPassword"
          optional/>

        <confirmation-input 
          v-confirm="'newPassword'"
          autocomplete="new-password"
          with-prefix/>
        
        <confirm-button/>
        
        <button 
          class="profile__tab-button profile__tab-button--delete-profile text-sixth"
          type="button">
          
          delete profile
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import PasswordInput from '@components/inputs/PasswordInput'
import AvatarInput from '@components/inputs/AvatarInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import VForm from '@components/validation/VForm'
import Auth from '@services/Auth'
import bus from '@services/eventbus'


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
      return this.user ?  this.user.name : '蒼空';
    },
    
    userEmail() {
      return this.user ?  this.user.email : 'some@email.com';
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
    logout() {
      let form = this.$refs.form;

      form.sendWith(async () => {
        await Auth.logout();

			  this.$router.push({name: 'Home'});
      });
    },
    
    showAlert(callback) {
      bus.dispatch('alert-warning', {
        message: 'All changes will be lost',
        okay: callback,
      })
    },

    toggleEditing() {
      if (this.disabled) {
        this.disabled = false;
        return;
      }

      let form = this.$refs.form;
      if (!!!form)
        return;

      if (!!!form.hasChanges()) {
        this.disabled = true;
        form.reset();
        return;
      }

      this.showAlert(() => {
        this.disabled = true;
        form.reset();
      });
    },

    async submit(data) {
      await Auth.user.edit(data);
    }
  }
}
</script>