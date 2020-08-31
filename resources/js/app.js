 
import Vue from 'vue';

import ContextMenu from '@components/ContextMenu'
import Alert from  '@components/Alert'


export default new function()
{
    function init()
    {
        target =  document.querySelector('main');
        components = {
            ContextMenu,
            Alert
        };
    }


    this.components  = (elements) =>
    {
        Object.assign(components, elements);

        console.log(components);
        
        return this;
    }

    this.withDevtools = () =>
    {
        Vue.config.devtools = true;

        return this;
    }

    this.boot = () =>
    {
        new Vue({
            el: target,
        
            components: {
                ...components
            }
        });
    }

    let components = [];
    let target;

    init();
}();