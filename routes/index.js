const accountRoute = require('./account/index');
const registerRoute = require('./account/register/index');
const loginRoute = require('./account/login/index');
const errorsRoute = require('./errors/index');

var paths = {
    '/account': accountRoute,
    '/account/register': registerRoute,
    '/account/login': loginRoute,
    NOT_FOUND: errorsRoute.NOT_FOUND
};

module.exports = paths;