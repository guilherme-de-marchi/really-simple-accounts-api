const fs = require('fs');

const httpMethods = {
    'GET': get
};

function get(req, res) {
    fs.readFile(
        './public/errors/not-found/pages/index.html', 
        'utf8', 
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.write(data);
            }
            res.end();
        }
    );
}

function handle(req, res) {
    httpMethods[req.method](req, res);
}

module.exports = handle;