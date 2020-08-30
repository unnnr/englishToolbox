 
import Vue from 'vue';

import RegisterSection from '@components/auth/RegisterSection'
import ContextMenu from '@components/ContextMenu'
import Alert from  '@components/Alert'

Vue.config.devtools = true;

const app = new Vue({
    el: document.querySelector('main'),

    components: {
        RegisterSection,
        ContextMenu,
        Alert,
    }
});
