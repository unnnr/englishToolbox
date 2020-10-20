<template>
  <main> 
    <v-form>
      <email-input v-validate/>
      <div style="height: 20px"></div> 


      <password-input v-validate/>
      <div style="height: 20px"></div> 


      <password-input v-name="'password'" v-validate/>

      <div style="height: 20px"></div> 


      <confirmation-input v-confirm="'password'"/>

    </v-form>

  </main>
</template>

<script>

import HandleFomrs from '@mixins/HandleForms'
import PasswordInput from '@components/validation/PasswordInput'
import ConfirmationInput from '@components/validation/ConfirmationInput'
import EmailInput from '@components/validation/EmailInput'
import VInput from '@components/validation/VInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    PasswordInput,
    ConfirmationInput,
    EmailInput,
    VForm,
    //VInput,
  },

  mixins: [ HandleFomrs ],

  directives: {
    /* validate: {
      bind(el, binding, vnode) {
        let data = vnode.context;

        data.inputs.push(vnode);
      },
      
      unbind(el, binding, vnode) {
        let data = vnode.context;

        for (let key in data.inputs)
        {
          if (data.inputs[key] === vnode)
            delete data.inputs[key];
        }
      }
    }, */

  /*   name: {
      bind(el, binding, vnode) {
        let data = vnode.context;
        let key = binding.value;

        data.anchors[key] = vnode;
      },

      unbind(el, binding, vnode) {
        let data = vnode.context;

        for (let anchor in data.anchors)
        {
          if (data.anchors[anchor] === vnode)
            delete data.anchors[anchor];
        }
      }
    }, */

    /* confirm: {
      bind(el, binding, vnode) {

        return;
        let data = vnode.context;
        let key = binding.value;

        console.log(vnode);

        Object.assign(vnode.componentInstance, {
          target: data.anchors[key] ? data.anchors[key].componentInstance : null
        });
      },

      unbind(el, binding, vnode) {
        
      }
    } */
  },

  mounted() {
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>