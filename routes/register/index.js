const fs = require('fs');
const queryString = require('querystring')

const httpMethods = new Map();
httpMethods.set('POST', post);

const acceptedPostFormats = fs.readFileSync('./routes/register/accepted_post_formats.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    return JSON.parse(data);
});

function handle(req, res) {
    return httpMethods.get(req.method)(req, res);
}

function post(req, res) {
    if (acceptedPostFormats.indexOf(req.headers['content-type']) == -1) {
        res.statusCode = 415;
        res.end();
    }

    var arguments = req.on('data', (chunk) => queryString.parse(decodeURIComponent(chunk)));
}

module.exports = handle;