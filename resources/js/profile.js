 import App from '@root/App';

import Reviews from '@pages/profile/Reviews'
import ProfileEditor from '@pages/profile/ProfileEditor'
import ProfileComments from '@pages/profile/ProfileComments'
import RequireEmailOverlay from '@pages/profile/RequireEmailOverlay';

App.withDevtools();

App.components({
    RequireEmailOverlay,
    ProfileEditor,
    ProfileComments,
    Reviews
});

App.boot();