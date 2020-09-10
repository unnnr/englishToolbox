const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        alias: {
            '@root' : path.resolve(__dirname, 'resources/js/'),
            '@models': path.resolve(__dirname, 'resources/js/models/'),
            '@services': path.resolve(__dirname, 'resources/js/services/'),
            
            
            '@pages': path.resolve(__dirname, 'resources/js/vue/pages/'),
            '@mixins': path.resolve(__dirname, 'resources/js/vue/mixins/'),
            '@states': path.resolve(__dirname, 'resources/js/vue/states/'),
            '@plugins' : path.resolve(__dirname, 'resources/js/vue/plugins/'),
            '@components': path.resolve(__dirname, 'resources/js/vue/components/')
        }
    }
})
.disableSuccessNotifications()
//.js('resources/js/audio.js', 'public/js')
//.js('resources/js/videos.js', 'public/js')
.js('resources/js/login.js', 'public/js')
//.js('resources/js/register.js', 'public/js')
//.js('resources/js/profile.js', 'public/js')
//.js('resources/js/home.js', 'public/js')


//.browserSync({
//proxy: 'englishToolbox:80',
//files: ['public/**/*.css', 'resources/**/*']
//});  