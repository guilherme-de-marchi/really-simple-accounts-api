const fs = require('fs');
const accountsDb = require('../../../databases/accounts/index');

const httpMethods = {
    'GET': get,
    'POST': post
};

function get(req, res) {
    fs.readFile(
        './public/account/login/pages/index.html', 
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

async function post(req, res) {
    var data = await accountsDb.select(['*'], 'users');
    console.log(data)
    res.write(JSON.stringify(data));
    res.end();
}

function handle(req, res) {
    httpMethods[req.method](req, res);
}

module.exports = handle;