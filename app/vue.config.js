const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import public/sass/presets/variables'
            }
        }
    },

    configureWebpack: {
        resolve: {
            alias: {
                // Vue componnets 
                '@components': path.resolve(__dirname, 'src/components'),
    
                // Vue unique components for each page
                '@pages': path.resolve(__dirname, 'src/pages'),
    
                // Vue plugins
                '@plugins': path.resolve(__dirname, 'src/plugins'),

                // Vue reusable logic for components
                '@mixins': path.resolve(__dirname, 'src/mixins'),
    
                // Program business logic
                '@services': path.resolve(__dirname, 'src/services'),

                // Bridges between frondend and backend
                '@models': path.resolve(__dirname, 'src/models'),

                //  |--------------------------------------------------------------------------
                //  | TEMPORARY TEMPORARY TEMPORARY TEMPORARY TEMPORARY TEMPORARY TEMPORARY
                //  |--------------------------------------------------------------------------
                //  |


                '@states': path.resolve(__dirname, 'src/states'),
            }
        }
    }
}