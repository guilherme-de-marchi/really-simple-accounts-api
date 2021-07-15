const http = require('http');
const routes = require('./routes/index');

var server = http.createServer((req, res) => {
    var route = routes.get(req.url) || routes.get('NOT-FOUND');
    route(req, res);
});

server.listen(8088);