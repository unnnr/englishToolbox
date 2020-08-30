 
import Vue from 'vue';

import RegisterSection from '@components/auth/RegisterSection'
import ContextMenu from '@components/ContextMenu'
import Alert from  '@components/Alert'


import axios from 'axios';

Vue.config.devtools = true;

axios.defaults.withCredentials = true;
axios.get('/api/csrf-cookie')
.then((responce)=>{console.log(responce)});

const app = new Vue({
    el: document.querySelector('main'),

    components: {
        RegisterSection,
        ContextMenu,
        Alert,
    }
});
