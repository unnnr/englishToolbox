 
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import Navbar from '@sections/Navbar'
import ContextMenu from '@plugins/ContextMenu'
import ErrorHandling from '@plugins/ErrorHandler';

export default new function()
{
    function init()
    {
        target =  document.querySelector('main');
    }

    this.components  = (elements) =>
    {
        Object.assign(components, elements);

        return this;
    }

    this.plugins = (elements) =>
    {
        Object.assign(plugins, elements);

        return this;
    }

    this.withDevtools = () =>
    {
        Vue.config.devtools = true;

        return this;
    }

    this.boot = () =>
    {
        for (const [name, plugin] of   Object.entries(plugins))
            Vue.use(plugin);

        new Vue({
            el: target,
        
            components: {
                ...components
            }
        });
    }

    let components = {
        Navbar
    };

    let plugins = {
        ErrorHandling,
        vClickOutside,
        ContextMenu
    };

    let target;

    init();
}();