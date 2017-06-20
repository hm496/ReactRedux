let cssnano = require('cssnano');

module.exports = {
    plugins: [
        cssnano({
            sourcemap: true,
            autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 version', 'Chrome 31', 'Safari 8'],
            }, discardComments: {
                removeAll: true,
            },
        }),
    ],
};