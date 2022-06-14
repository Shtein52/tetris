const path = require('path');
exports.port = 9001;
exports.staticPath = path.resolve(__dirname, '..', 'static');

exports.settings = {
    root: path.resolve(__dirname, '..', 'static'),
    watch: [        
        path.resolve(__dirname, '..', 'static')
    ]
};