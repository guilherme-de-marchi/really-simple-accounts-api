const fs = require('fs');
const queryString = require('querystring')
const register = require('./register');

const httpMethods = {
    'GET': get,
    'POST': post
};

const acceptedPostFormats = fs.readFile(
    './routes/account/register/accepted_post_formats.json', 
    'utf8', 
    (error, data) => {
        if (error) {
            console.log(error);
        } else {
            return JSON.parse(data);
        }
    }
);

function get(req, res) {
    fs.readFile(
        './public/account/register/pages/index.html', 
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

function post(req, res) {
    fs.readFile(
        './routes/account/register/accepted_post_formats.json', 
        'utf8', 
        (error, data) => {
            data = JSON.parse(data);
            if (data.indexOf(req.headers['content-type']) == -1) {
                res.statusCode = 415;
                res.end();
            }
        
            req.on('data', (chunk) => {
                var arguments = queryString.parse(decodeURIComponent(chunk))
                register(
                    arguments.username, 
                    arguments.password
                ).then((value) => {
                    if (value) {
                        res.statusCode = 201;
                    } else {
                        res.statusCode = 406;
                    }
                    res.end()
                });
            });
        }
    );
}

function handle(req, res) {
    httpMethods[req.method](req, res);
}

module.exports = handle;