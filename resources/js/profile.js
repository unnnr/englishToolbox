 
import Vue from 'vue';

import ProfileEditor from '@sections/ProfileEditor'
import ProfileComments from '@sections/ProfileComments'
import Reviews from '@sections/Reviews'
import ContextMenu from '@components/ContextMenu'
import Alert from  '@components/Alert'

Vue.config.devtools = true;

const app = new Vue({
    el: document.querySelector('main'),

    components: {
        ProfileEditor,
        ProfileComments,
        Reviews,
        ContextMenu,
        Alert,
    }
});
