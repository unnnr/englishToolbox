const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // Vue componnets 
                '@components': path.resolve(__dirname, 'src/components'),
    
                // Vue unique components for each page
                '@pages': path.resolve(__dirname, 'src/pages'),
    
                // Vue plugins
                '@plugins': path.resolve(__dirname, 'src/plugins'),

                // Vue wireframe for components
                '@layouts': path.resolve(__dirname, 'src/layouts'),

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