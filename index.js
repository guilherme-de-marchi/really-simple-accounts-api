const http = require('http');
const routes = require('./routes/index');

var server = http.createServer((req, res) => {
    var route = routes[req.url] || routes.NOT_FOUND;
    route(req, res);
});

server.listen(8080);