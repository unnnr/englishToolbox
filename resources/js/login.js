 
import Vue from 'vue';

import LoginSection from '@components/auth/LoginSection'
import ContextMenu from '@components/ContextMenu'
import Alert from  '@components/Alert'


const app = new Vue({
    el: document.querySelector('main'),

    components: {
        LoginSection,
        ContextMenu,
        Alert,
    }
});
