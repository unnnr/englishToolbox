import App from '@root/App'
import Validator from '@plugins/Validator'
import RegisterSection from '@components/auth/RegisterSection'

App.withDevtools();


App.plugins({
    Validator 
});

App.components({
    RegisterSection
});

App.boot();
