const registerRoute = require('./register/index');

var paths = new Map();
paths.set('/register', registerRoute);

module.exports = paths;