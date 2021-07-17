const httpMethods = {
    'GET': get
};

function get(req, res) {
    res.write('<h1>ACCOUNTS</h1>');
    res.end();
}

function handle(req, res) {
    httpMethods[req.method](req, res);
}

module.exports = handle;