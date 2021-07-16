const sqlite3 = require('sqlite3');

class Database {
    constructor(path) {
        this._db = new sqlite3.Database(path, error => { if (error) console.log(error) });
    }

    create(table, columns) {
        this._db.run(
            `create table if not exists ${table} (${columns.join(', ')})`,
            (error) => {
                if (error) throw error;
            }
        );
    }

    insert(table, columns, values) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `insert into ${table} (${columns.join(', ')}) values (${values.map(element => `'${element}'`).join(', ')})`,
                (error) => {
                    console.log(`New insertion into ${table}: ${columns, values}`)
                    if (error) reject(error);
                    resolve();
                }
            );
        });
    }

    select(targets, table, additional='') {
        return new Promise((resolve, reject) => {
            this._db.all(
                `select ${targets.join(', ')} from ${table} ${additional}`,
                (error, data) => {
                    console.log(`New selection from ${table}: ${targets, additional}`)
                    if (error) reject(error);
                    resolve(data);
                }
            );
        });
    }

    get_placeholders(arr) {
        return arr.map(element => '(?)').join(', ');
    }
}

module.exports = Database