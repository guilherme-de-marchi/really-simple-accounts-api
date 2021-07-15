const sqlite3 = require('sqlite3');
const db = require("./accounts");

class Database {
    constructor(path) {
        this._db = new sqlite3.Database(path, error => this.default_callback(error));
        this.lastReturnedData;
    }

    create(table, columns) {
        this._db.run(
            `create table if not exists ? (name text)`,
            table,
            error => this.default_callback(error)
        );
    }

    insert(table, columns, values) {
        this._db.run(
            `insert into ? ${this.get_placeholders(columns)} values ${this.get_placeholders(values)}`,
            table.concat(columns, values),
            error => this.default_callback(error)
        );
    }

    select_all(targets, table, additional='') {
        this._db.all(
            `select ${this.get_placeholders(targets)} from ? ${additional}`,
            targets.concat(table),
            (error, data) => this.default_callback(error, data)
        );
    }

    default_callback(error, data) {
        if (error) {
            console.log(error);
        } else {
            this.lastReturnedData = data;
        }
    }

    get_placeholders(arr) {
        return arr.map(element => '(?)').join(', ');
    }
}

module.exports = Database