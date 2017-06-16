const cool = require('cool-ascii-faces');

module.exports = function (app) {

    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/cool', (request, response) => {
        response.send(cool());
    });

}
