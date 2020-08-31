 
import Vue from 'vue';

// import ContextMenu from '@components/ContextMenu'
import vClickOutside from 'v-click-outside'
import ContextMenu from '@plugins/ContextMenu'
import Alert from  '@components/Alert'


export default new function()
{
    function init()
    {
        target =  document.querySelector('main');
        components = {
            Alert
        };
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