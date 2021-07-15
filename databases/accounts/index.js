const database = require('../db_class');

var db = new database('./databases/accounts/database.db');
db.create(
    ['users'], 
    [
        'id integer not null primary key', 
        'username text not null', 
        'password text not null'
    ]
);

module.exports = db;