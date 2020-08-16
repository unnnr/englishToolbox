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
            '@models': path.resolve(__dirname, 'resources/js/models/'),
            '@services': path.resolve(__dirname, 'resources/js/services/'),
            '@components': path.resolve(__dirname, 'resources/js/components/')
        }
    }
})
.disableSuccessNotifications()
.js('resources/js/videos.js', 'public/js');
// .browserSync({
// proxy: 'englishToolbox:80',
// files: ['public/**/*.css', 'resources/**/*']
// }); 