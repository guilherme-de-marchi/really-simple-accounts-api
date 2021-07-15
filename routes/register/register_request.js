const databases = require('../../databases/index');

const accounts = databases.accounts;

class RegisterRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    register() {
        if (this.verify_letters([this.username, this.password], [' ', "'"])) return false;
        if (!this.verify_disponibility(this.username, 'username')) return false;

        accounts.select_all(['*'], ['users']);
        console.log(accounts.lastReturnedData);
    }

    verify_letters(targets, letters) {
        for (let i = 0; i < targets.length; i++) {
            for (let j = 0; j < letters.length; j++) {
                if (targets[i].indexOf(letters[j]) != -1) return true;
            }
        }
        return false;
    }

    verify_disponibility(columns, table, additional) {
        accounts.select_all(
            columns,
            table,
            additional
        );

        console.log(accounts.lastReturnedData);
    }
}

function handle(username, password) {
    return new RegisterRequest(username, password);
}

module.exports = handle;