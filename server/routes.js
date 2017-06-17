const path = require('path');

module.exports = function (app) {

    app.use('/api/login', require('./api/login'));
    app.use('/api/register', require('./api/register'));
    app.use('/api/count', require('./api/count'));

    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
}
