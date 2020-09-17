import App from '@root/App'
import BannerContainer from '@pages/home/BannerContainer';
import UpdatesContainer from '@pages/home/UpdatesContainer';

App.withDevtools();

App.components({
    BannerContainer,
    UpdatesContainer
});

App.boot();
