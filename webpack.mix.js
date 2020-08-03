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

// mix.sass('resources/scss/*', 'public/css');

const fstream  = require('fs');

// get all 'files' in this directory
let getFiles = function (dir) {
    // filter directories
    return fstream.readdirSync(dir).filter(file => {
        return fstream.statSync(`${dir}/${file}`).isFile();
    });
};

// getFiles('resources/scss').forEach(function (SASSpath) {
//     if(SASSpath.charAt(0) !== '_'){  // Do not mix which files start with '_' (underscore) 
//         mix.sass('resources/scss/' + SASSpath, 'public/css');
//     }
// });

mix.browserSync({
    proxy: 'englishToolbox:80',
    files: ['public/**/*.css', 'resources/**/*']
});