import bus from '@services/eventbus';
import Alert from  '@components/Alert'

export default {
    install: function(Vue) {
        Vue.component('alert', Alert);

        Vue.config.errorHandler = (err, vm, info) =>
        {
            bus.dispatch('alert-error');
            throw err;
        }
    }
}