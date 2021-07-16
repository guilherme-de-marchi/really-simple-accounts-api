const fs = require('fs');
const queryString = require('querystring')
const register = require('./register');

const httpMethods = new Map();
httpMethods.set('POST', post);

const acceptedPostFormats = fs.readFileSync('./routes/register/accepted_post_formats.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    return JSON.parse(data);
});

function post(req, res) {
    if (acceptedPostFormats.indexOf(req.headers['content-type']) == -1) {
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

function handle(req, res) {
    httpMethods.get(req.method)(req, res)
}

module.exports = handle;