 
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import ContextMenu from '@plugins/ContextMenu'
import ErrorHandling from '@plugins/ErrorHandler';

export default new function()
{
    function init()
    {
        target =  document.querySelector('main');
        
        components = { };
    }

    this.components  = (elements) =>
    {
        Object.assign(components, elements);

        return this;
    }

    this.withDevtools = () =>
    {
        Vue.config.devtools = true;

        return this;
    }

    this.boot = () =>
    {
        Vue.use(ErrorHandling);
        Vue.use(vClickOutside);
        Vue.use(ContextMenu);

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