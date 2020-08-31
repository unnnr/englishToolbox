 
import App from '@root/App';

import Reviews from '@sections/Reviews'
import ProfileEditor from '@sections/ProfileEditor'
import ProfileComments from '@sections/ProfileComments'
import RequireEmailOverlay from '@sections/RequireEmailOverlay';

App.withDevtools();

App.components({
    RequireEmailOverlay,
    ProfileEditor,
    ProfileComments,
    Reviews
});

App.boot();