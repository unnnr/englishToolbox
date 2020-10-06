<template>
  <label for="accountPhoto">
  <input
    class="management__account-photo-input"
    id="accountPhoto" 
    accept="image/*"
    type="file"
    ref="avatar"
    :disabled="loading"
    @change="changeAvatar">
	</label>
</template>

<script>
import Auth from '@services/Auth'

export default {
  data: function() {
    return {
      loading: false
    }
  },

  methods: {
    changeAvatar(event) {
      if (event.target.value.length === 0)
        return;

			let file = this.$refs.avatar.files[0];

			if (!!!file)
				return;

      this.submit(file);
    },
    
    submit(file) {
      if (this.loading)
        return;

      this.loading = true;

	    let data = new FormData();
			data.append('avatar', file);

      Auth.user.avatar.edit(data).finally(() => this.loading = false);
    }
  }
}
</script>