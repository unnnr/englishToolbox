 
import App from '@root/App';

import ProfileEditor from '@sections/ProfileEditor'
import ProfileComments from '@sections/ProfileComments'
import Reviews from '@sections/Reviews'


App.withDevtools();

App.components({
    ProfileEditor,
    ProfileComments,
    Reviews
});

App.boot();